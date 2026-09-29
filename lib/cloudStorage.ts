import { CmsData, DEFAULT_CMS_DATA } from "./cmsStore";
import fs from "fs";
import path from "path";
import { isBlobCmsConfigured, loadCmsFromBlob, saveCmsToBlob } from "./blobCmsStorage";

// In-memory cache across serverless warm invocations
declare global {
  // eslint-disable-next-line no-var
  var __qllix_cms_cache: CmsData | undefined;
  // eslint-disable-next-line no-var
  var __qllix_last_sync: string | undefined;
}

const STORAGE_KEY = "qllix_agency_cms_v5";

export interface StorageInfo {
  provider: "vercel_blob" | "upstash_redis" | "vercel_kv" | "supabase" | "local_filesystem" | "in_memory";
  isCloudConnected: boolean;
  statusMessage: string;
  lastSyncedAt?: string;
}

/**
 * Detect which cloud or local storage provider is configured
 */
export function detectStorageProvider(): {
  provider: StorageInfo["provider"];
  isCloudConnected: boolean;
  config: Record<string, string>;
} {
  // Vercel Blob stores both the compact CMS document and its image assets.
  if (isBlobCmsConfigured()) {
    return { provider: "vercel_blob", isCloudConnected: true, config: {} };
  }
  // 1. Check Vercel KV / Upstash Redis
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (kvUrl && kvToken) {
    return {
      provider: process.env.KV_REST_API_URL ? "vercel_kv" : "upstash_redis",
      isCloudConnected: true,
      config: { url: kvUrl, token: kvToken },
    };
  }

  // 2. Check Supabase
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    return {
      provider: "supabase",
      isCloudConnected: true,
      config: { url: supabaseUrl, key: supabaseKey },
    };
  }

  // 3. Local filesystem
  return {
    provider: process.env.NODE_ENV !== "production" ? "local_filesystem" : "in_memory",
    isCloudConnected: false,
    config: {},
  };
}

/**
 * Fetch CMS Data from the active storage backend
 */
export async function getStoredCmsData(): Promise<{
  data: CmsData;
  storage: StorageInfo;
}> {
  const { provider, isCloudConnected, config } = detectStorageProvider();

  if (provider === "vercel_blob") {
    try {
      const data = await loadCmsFromBlob();
      if (data) {
        globalThis.__qllix_cms_cache = data;
        return { data, storage: { provider, isCloudConnected: true, statusMessage: "Live cloud synced via Vercel Blob", lastSyncedAt: globalThis.__qllix_last_sync } };
      }
    } catch (err) {
      console.warn("[CloudStorage] Blob read error:", err);
    }
  }
  // Try Provider 1: Vercel KV / Upstash Redis
  if (provider === "vercel_kv" || provider === "upstash_redis") {
    try {
      const baseUrl = config.url.replace(/\/+$/, "");
      const res = await fetch(`${baseUrl}/get/${STORAGE_KEY}`, {
        headers: {
          Authorization: `Bearer ${config.token}`,
        },
        cache: "no-store",
      });

      if (res.ok) {
        const json = await res.json();
        let parsedResult = json.result;

        if (typeof parsedResult === "string" && parsedResult.trim()) {
          try {
            parsedResult = JSON.parse(parsedResult);
          } catch (e) {
            // Keep as is
          }
        }

        if (parsedResult && typeof parsedResult === "object") {
          globalThis.__qllix_cms_cache = parsedResult;
          return {
            data: parsedResult,
            storage: {
              provider,
              isCloudConnected: true,
              statusMessage: "Live cloud synced via Upstash/Vercel KV",
              lastSyncedAt: globalThis.__qllix_last_sync,
            },
          };
        }
      }
    } catch (err) {
      console.warn("[CloudStorage] KV read error:", err);
    }
  }

  // Try Provider 2: Supabase REST API
  if (provider === "supabase") {
    try {
      const res = await fetch(`${config.url}/rest/v1/qllix_cms?id=eq.main&select=data,updated_at`, {
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0 && rows[0]?.data) {
          const cloudData = rows[0].data;
          globalThis.__qllix_cms_cache = cloudData;
          return {
            data: cloudData,
            storage: {
              provider: "supabase",
              isCloudConnected: true,
              statusMessage: "Live cloud synced via Supabase",
              lastSyncedAt: rows[0].updated_at || globalThis.__qllix_last_sync,
            },
          };
        }
      }
    } catch (err) {
      console.warn("[CloudStorage] Supabase read error:", err);
    }
  }

  // Try In-Memory Cache if available
  if (globalThis.__qllix_cms_cache) {
    return {
      data: globalThis.__qllix_cms_cache,
      storage: {
        provider: isCloudConnected ? provider : "in_memory",
        isCloudConnected,
        statusMessage: isCloudConnected
          ? "Using memory cache (Cloud sync active)"
          : "Using in-memory cache (Connect Vercel KV for persistent live updates)",
        lastSyncedAt: globalThis.__qllix_last_sync,
      },
    };
  }

  // Try Provider 3: Local File System (data/cms-data.json or /tmp/cms-data.json)
  const localPaths = [
    path.join(process.cwd(), "data", "cms-data.json"),
    path.join("/tmp", "cms-data.json"),
  ];

  for (const filePath of localPaths) {
    try {
      if (fs.existsSync(/* turbopackIgnore: true */ filePath)) {
        const content = fs.readFileSync(/* turbopackIgnore: true */ filePath, "utf-8");
        const parsed = JSON.parse(content);
        if (parsed && typeof parsed === "object") {
          globalThis.__qllix_cms_cache = parsed;
          return {
            data: parsed,
            storage: {
              provider: "local_filesystem",
              isCloudConnected: false,
              statusMessage: "Reading from local filesystem file",
            },
          };
        }
      }
    } catch (e) {
      // Ignore and fallback
    }
  }

  // Fallback: Default data
  return {
    data: DEFAULT_CMS_DATA,
    storage: {
      provider,
      isCloudConnected,
      statusMessage: isCloudConnected
        ? "No cloud record yet. Ready to save."
        : "Using default initial data (Connect Vercel KV or Supabase for multi-device sync)",
    },
  };
}

/**
 * Save CMS Data to active storage backend
 */
export async function saveStoredCmsData(newData: CmsData): Promise<{
  success: boolean;
  storage: StorageInfo;
  error?: string;
}> {
  const { provider, isCloudConnected, config } = detectStorageProvider();
  const timestamp = new Date().toISOString();
  globalThis.__qllix_cms_cache = newData;
  globalThis.__qllix_last_sync = timestamp;

  let savedToCloud = false;
  let saveErrorMessage = "";

  if (provider === "vercel_blob") {
    try {
      const compactData = await saveCmsToBlob(newData);
      globalThis.__qllix_cms_cache = compactData;
      savedToCloud = true;
    } catch (err: any) {
      saveErrorMessage = err?.message || "Failed to write to Vercel Blob";
      console.warn("[CloudStorage] Blob write error:", err);
    }
  }
  // 1. Upstash Redis / Vercel KV
  if (provider === "vercel_kv" || provider === "upstash_redis") {
    try {
      const baseUrl = config.url.replace(/\/+$/, "");
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["SET", STORAGE_KEY, JSON.stringify(newData)]),
      });

      if (res.ok) {
        savedToCloud = true;
      } else {
        const errText = await res.text();
        saveErrorMessage = `KV returned ${res.status}: ${errText}`;
        console.warn("[CloudStorage] KV write error:", saveErrorMessage);
      }
    } catch (err: any) {
      saveErrorMessage = err?.message || "Failed to write to KV";
      console.warn("[CloudStorage] KV exception:", err);
    }
  }

  // 2. Supabase
  if (provider === "supabase") {
    try {
      const res = await fetch(`${config.url}/rest/v1/qllix_cms`, {
        method: "POST",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          id: "main",
          data: newData,
          updated_at: timestamp,
        }),
      });

      if (res.ok) {
        savedToCloud = true;
      } else {
        const errText = await res.text();
        saveErrorMessage = `Supabase returned ${res.status}: ${errText}`;
        console.warn("[CloudStorage] Supabase write error:", saveErrorMessage);
      }
    } catch (err: any) {
      saveErrorMessage = err?.message || "Failed to write to Supabase";
      console.warn("[CloudStorage] Supabase exception:", err);
    }
  }

  // 3. Always attempt to write to local filesystem / temporary directory as backup
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true });
      } catch {}
    }
    const localFile = path.join(dataDir, "cms-data.json");
    fs.writeFileSync(localFile, JSON.stringify(newData, null, 2), "utf-8");
  } catch (fsErr) {
    // If running in read-only serverless, try /tmp
    try {
      fs.writeFileSync(path.join("/tmp", "cms-data.json"), JSON.stringify(newData), "utf-8");
    } catch {}
  }

  if (isCloudConnected && !savedToCloud) {
    return {
      success: false,
      error: saveErrorMessage || "Cloud sync failed",
      storage: {
        provider,
        isCloudConnected: false,
        statusMessage: `Sync failed: ${saveErrorMessage}`,
        lastSyncedAt: timestamp,
      },
    };
  }

  return {
    success: true,
    storage: {
      provider,
      isCloudConnected,
      statusMessage: isCloudConnected
        ? `Live saved to ${provider === "supabase" ? "Supabase" : provider === "vercel_blob" ? "Vercel Blob" : "Vercel KV"}`
        : "Saved locally & to memory",
      lastSyncedAt: timestamp,
    },
  };
}

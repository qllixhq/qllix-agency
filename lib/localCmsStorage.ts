import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { CmsData } from "./cmsStore";

export function localStorageDirectory() {
  const directory = process.env.QLLIX_STORAGE_DIR;
  if (!directory || !path.isAbsolute(directory)) throw new Error("Configure an absolute QLLIX_STORAGE_DIR for persistent CMS storage");
  return directory;
}

export function readLocalCms(): CmsData {
  const file = path.join(localStorageDirectory(), "cms-data.json");
  if (!fs.existsSync(file)) throw new Error("CMS backup has not been restored on this hosting yet");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!data?.general || !Array.isArray(data.portfolioItems)) throw new Error("Invalid CMS backup");
  return data;
}

export function writeLocalCms(data: CmsData) {
  const directory = localStorageDirectory();
  fs.mkdirSync(directory, { recursive: true });
  const file = path.join(directory, "cms-data.json");
  // Keep the previous valid document before each replacement.
  if (fs.existsSync(file)) {
    const backups = path.join(directory, "backups");
    fs.mkdirSync(backups, { recursive: true });
    fs.copyFileSync(file, path.join(backups, `cms-${Date.now()}-${randomUUID()}.json`));
    const history = fs.readdirSync(backups).filter((name) => /^cms-\d+-[\da-f-]+\.json$/.test(name)).sort().reverse();
    for (const name of history.slice(30)) fs.unlinkSync(path.join(backups, name));
  }
  const temporary = path.join(directory, `cms-${randomUUID()}.tmp`);
  fs.writeFileSync(temporary, JSON.stringify(data), { mode: 0o600 });
  fs.renameSync(temporary, file);
}

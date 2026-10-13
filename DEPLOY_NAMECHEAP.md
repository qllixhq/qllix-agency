# Namecheap deployment

The site uses Next.js 16.3.7. Build with Node.js 22 or 24:

```powershell
$env:QLLIX_SELF_HOSTED = "1"
pnpm build
```

Deploy `.next/standalone`, with `public` copied into its root and `.next/static` copied into its `.next` directory. Install runtime dependencies for the target server and verify the packaged server starts before switching DNS. Do not include `.env` files, browser exports, or local CMS snapshots in the deployment archive.

Configure the cPanel application in Production mode with `server.js` as its startup file. Set these environment variables in the hosting account:

- `QLLIX_STORAGE_DIR`: an absolute directory outside the public document root for CMS data and media.
- `ADMIN_PASSCODE`: the private admin access code.
- `ADMIN_SESSION_SECRET`: a private random secret of at least 32 characters.

Restore the verified CMS backup as `cms-data.json` inside the storage directory. Restore media into its `media` subdirectory and update the corresponding CMS URLs to `/media/<filename>`. Missing CMS data is an error; do not replace it with demo content. Saves keep up to 30 prior CMS documents in `backups`.

Source code in GitHub is not a backup of admin uploads. Keep separate backups of the complete CMS document and media files.

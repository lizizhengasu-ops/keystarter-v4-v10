# KeyStarter v7.7 Backup - 2026-08-02 03:36:21 UTC

## Version
- Repo HEAD: `6e6acfd` (v7.6: apply user-selected retail box images)
- Backup time: 2026-08-02 03:36 UTC (Beijing 11:36)
- Repo bundle: `C:\Users\31961\Documents\microsoft web\backups\keystarter-v4-v10_20260802_033621.bundle` (28.2 MB, SHA256 69AF1B2CACDFB0CBF227DEB5B42BA098B5C393B184E3631B141A1E1A24F0F8F3)

## VPS full backup
- Location: `/root/wp-backups/ks-full-20260802_033621/`
- Contents: `wordpress.sql.gz`, `wp-content.tar.gz`, `wp-root.tar.gz`, `frontend.tar.gz`
- Checksums: see `MANIFEST.md5` in that directory

## Scope
This backup captures the full site state before starting the v7.7 fix loop
(review findings: select.html CURRENT map, start-select-server.ps1 portability,
tmp cleanup, image mapping validation).

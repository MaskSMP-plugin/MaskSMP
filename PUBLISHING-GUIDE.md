# MaskSMP Website — English Edition

This folder contains your MaskSMP website, including your logo, the rotating 3D mask on the homepage, the interactive mask collection, downloads, and the admin panel.

## Files
- `index.html` — homepage with the hero section, features, gallery, and plugin call-to-action.
- `masks.html` — the interactive 16-mask system with abilities and upgrade information.
- `features.html` — detailed feature explanations and the public project timeline.
- `gallery.html` — the complete screenshot gallery with an image viewer.
- `downloads.html` — a separate page where visitors choose plugin releases and resource packs.
- `mask-rotator.js` — uses the original 3D mask data and changes to the next mask after each full rotation.
- `styles.css` — site styling, logo colors, gallery lightbox, and responsive layout.
- `script.js` — loads configuration, text, images, links, and download selections.
- `site-config.json` — published settings and website copy.
- `admin/` — the website admin panel.
- `assets/` — your supplied logos and uploads folder.

## Test locally
Open this folder in VS Code and run in the terminal:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000`. Pages: `/`, `/features.html`, `/gallery.html`, `/masks.html`, `/downloads.html`, and `/admin/`.

## Admin panel
- **01 / Branding**: edit the site name and main homepage text.
- **02 / Server & Links**: edit only the Server IP, Contact link, Discord link, and Modrinth project link. These fields do not affect plugin or resource pack downloads.
- **03 / Website Text**: edit most headings, descriptions, buttons, footer text, and Downloads page copy.
- **04 / Plugin Releases**: add `.jar` files or direct HTTPS links, release names, and Minecraft versions.
- **05 / Resource Packs**: add `.zip` files or HTTPS links.
- **06 / Gallery**: add, rename, or remove screenshots. Visitors can click them to view a fullscreen lightbox.

Click **Save** to store changes in this browser, then click **Download config for GitHub** to export `site-config.json`. Upload that JSON file to the root of your repository and commit the change. If you embedded new photos or plugin files, export and publish the updated configuration again.

## Publish with GitHub Pages
1. Extract the ZIP.
2. Open your GitHub repository and choose **Add file → Upload files**.
3. Upload the *contents* of this folder. Make sure `index.html` is in the repository root.
4. Commit the changes.
5. Open **Settings → Pages** and choose **Deploy from a branch**, branch `main`, folder `/(root)`.
6. Later, export and upload the updated `site-config.json` whenever you change text, photos, or releases.

## Important notes
GitHub Pages cannot commit changes from a normal webpage. The admin stores drafts in browser storage and exports a configuration file. Current 2.0 release files are included in `downloads/plugins/` and `downloads/resourcepacks/` and the public download buttons point to those files. If you add another file in the admin panel, publish both the file and the updated `site-config.json` to GitHub. The admin login is only a basic browser-side access gate, not real server security. Change `ADMIN_PASSWORD` in `admin/admin-auth.js` before publishing.

## Publish directly from the admin panel

The public website now uses only the published `site-config.json` committed in GitHub. Browser-local drafts are not used by public pages, which prevents one computer from seeing a private local version that visitors on other devices cannot see.

To publish changes from `/admin/`, create a fine-grained token at https://github.com/settings/personal-access-tokens/new. Restrict the token to repository `MaskSMP-plugin/MaskSMP` and grant **Contents: Read and write**. Paste it in the temporary field on the admin page and click **Publish changes to GitHub**. The token is cleared after the request and is not saved to localStorage or IndexedDB. New JAR and ZIP uploads are committed as real files under `downloads/plugins/` and `downloads/resourcepacks/`; the updated config is committed after the files.

A simple **Save** is still local-only. A successful publish creates GitHub commits, after which GitHub Pages updates the public website.

**Do not overwrite the repository's current `site-config.json` while uploading this code update.** It contains current website data that is newer than the config bundled with the original uploaded archive. This ZIP intentionally omits `site-config.json` to protect that live data.

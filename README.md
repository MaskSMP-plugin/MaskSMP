# MaskSMP Website — English Edition

This folder contains your MaskSMP website, including your logo, the rotating 3D mask on the homepage, the interactive mask collection, downloads, and the admin panel.

## Files
- `index.html` — homepage with the hero section, features, gallery, and plugin call-to-action.
- `masks.html` — the interactive 16-mask system with abilities and upgrade information.
- `downloads.html` — a separate page where visitors can choose plugin releases and resource packs.
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

Then open `http://localhost:8000`. Pages: `/`, `/masks.html`, `/downloads.html`, and `/admin/`.

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
GitHub Pages cannot commit changes from a normal webpage. The admin stores drafts in browser storage and exports a configuration file. For large `.jar` or `.zip` files, use a direct HTTPS link or publish the release on Modrinth. The admin login is only a basic browser-side access gate, not real server security. Change `ADMIN_PASSWORD` in `admin/admin-auth.js` before publishing.


## GitHub publishing and shared files

For the important difference between saving in the admin panel and publishing to every visitor, read [GITHUB-PUBLISHING-AND-DOWNLOADS.md](GITHUB-PUBLISHING-AND-DOWNLOADS.md). In short: click **Save**, export `site-config.json`, and commit the exported file to GitHub. Plugin JARs and resource-pack ZIPs must also be committed to the repository or hosted at public HTTPS download URLs.

## Website pages

- `index.html` — homepage with the feature cards and gallery preview
- `features.html` — detailed feature list and public project timeline
- `gallery.html` — full gallery and image viewer
- `masks.html` — interactive 3D mask viewer and ability descriptions
- `downloads.html` — direct plugin and resource-pack downloads

The 2.0 plugin and resource pack are included under `downloads/` so GitHub Pages serves them directly. Select a version and then press its download button; changing the selection alone does not start a download. If you add a new file from the admin panel, remember that the browser cannot commit it to GitHub by itself: publish the file and updated `site-config.json` together.

## Publishing changes so every visitor sees them

The public pages read their shared settings from the `site-config.json` file in the GitHub repository. Changes in the admin panel are drafts until they are published.

1. Open `admin/` on the published website and log in.
2. Add or edit the images, text, plugin releases, or resource packs.
3. Under **Publish changes to everyone**, enter a GitHub fine-grained personal access token restricted to the `MaskSMP-plugin/MaskSMP` repository with **Contents: Read and write** permission.
4. Click **Publish changes to GitHub**. The admin uploads newly selected JAR/ZIP files into `downloads/` and then updates `site-config.json`. This makes the published data shared across devices.
5. Allow GitHub Pages to update; then refresh the public page. The token is cleared after the publish and is not stored by the website.

The **Save** button alone only saves a draft in the current browser. **Download config backup** is available as a manual fallback.

### Important when updating the website code

This update package intentionally does not replace `site-config.json`. The live repository has a newer configuration than the copy supplied in the uploaded ZIP. Keep the existing `site-config.json` in your GitHub repository while uploading these website-code files; otherwise newer images and download entries from the live config could be lost. Do not delete the repository or its settings.

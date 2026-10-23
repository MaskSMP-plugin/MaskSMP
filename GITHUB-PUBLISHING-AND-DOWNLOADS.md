# MaskSMP website — GitHub publishing and shared downloads

## Why changes may only appear on one device

This is a static website. GitHub Pages serves files, but a normal webpage cannot write uploads back into your GitHub repository. The admin panel's **Save** button saves a draft in the current browser. Other visitors will only see changes after the published files are committed to GitHub.

## Publish website changes

1. Open the website's `/admin/` page.
2. Make your changes and click **Save**.
3. Click **Download config for GitHub**.
4. In your GitHub repository, upload the downloaded `site-config.json` to the repository root, replacing the old file.
5. Commit the change and wait for GitHub Pages to deploy.
6. Open the live website in a private/incognito window or another device to verify it.

Do not stop after clicking Save: that only saves the local draft.

## Publishing images

The current gallery can store images as embedded `data:image/...` data in `site-config.json`. This makes them available to everyone only after you export and commit the updated JSON. For better performance and easier maintenance, put images in the repository, for example:

`assets/uploads/gallery/screenshot-01.webp`

Then use that repository-relative path as the image source in `site-config.json`, for example:

```json
{
  "gallery": [
    {
      "id": "screenshot-01",
      "title": "MaskSMP in game",
      "src": "assets/uploads/gallery/screenshot-01.webp"
    }
  ]
}
```

Make sure the image itself is also committed to GitHub. A path in JSON does not upload the file by itself.

## Publishing plugin JARs and resource-pack ZIPs

A file selected in the admin panel is not automatically uploaded to GitHub. To make it downloadable by everyone, use one of these methods:

### Option A — Commit files to the repository
Place files in folders such as:

- `downloads/plugins/MaskedSMP-2.0.jar`
- `downloads/resourcepacks/MaskSMP_ResourcePack_2.0.zip`

Upload and commit the files to GitHub. Set `downloadUrl` in each release entry in `site-config.json` to the repository-relative path (for example `downloads/plugins/MaskedSMP-2.0.jar`). The current 2.0 entries already use this method and are served directly by GitHub Pages. Commit the files and `site-config.json` together.

### Option B — Use a public release host
Publish the plugin JAR and resource-pack ZIP to the official Modrinth project or GitHub Releases. Copy the public download URL and add it to the relevant release entry. This is often better for larger files and keeps the website repository smaller.

**Important:** A link must point to a publicly accessible download, not a file on your computer (such as `C:\Users\...`) or a browser-only `blob:` URL.

## GitHub Pages setup

1. Upload the *contents* of this folder to the repository root (so `index.html` is at the root).
2. In GitHub, open **Settings → Pages**.
3. Select **Deploy from a branch**, choose `main`, and select `/(root)`.
4. Commit changes and wait for the deployment to finish.

## Important limits and security

- A static website cannot automatically upload files to GitHub from its admin panel. Automatic publishing requires a backend or a separate authenticated deployment workflow.
- Never put a GitHub access token in browser JavaScript or website files.
- The admin password in `admin/admin-auth.js` is visible to visitors who inspect the source code. It is only a visual gate, not real security. Do not use it to protect secrets.
- The updated website ZIP includes the current plugin JAR and resource-pack ZIP in `downloads/`. These files will only become live after the entire ZIP contents are committed to the repository and GitHub Pages finishes publishing.

## Cross-device publishing (new)

Public pages now load only the repository-published `site-config.json`, never browser-local admin drafts. Use the admin panel's **Publish changes to GitHub** action to share new images, text edits, plugin versions and resource packs. It requires a fine-grained token with `Contents: Read and write` for `MaskSMP-plugin/MaskSMP`; the token is kept only in the password field for the operation and cleared afterwards. Uploaded `.jar` and `.zip` files are committed under `downloads/` and the published JSON points to those real files.

Do not replace or delete the existing live `site-config.json` when uploading the code in this update ZIP. The configuration bundled with the original uploaded archive is older than the live repository configuration, so this fix intentionally leaves it out.

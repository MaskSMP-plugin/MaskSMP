# MaskSMP Official Website

A multi-page GitHub Pages website for the MaskSMP Minecraft plugin.

## Pages
- `index.html` — animated 3D landing page, quick links, rotating mask preview, and trailer player.
- `features.html` — plugin features.
- `masks.html` — interactive mask builder.
- `upgrading.html` — six clickable tier levels with one rotating preview card.
- `gallery.html` — visual gallery and admin-managed screenshots.
- `downloads.html` — plugin/resource-pack downloads and shared download-start counts.
- `faq.html` — questions, answers, optional links, and optional video walkthroughs.
- `license.html` — license panel and editable ownership text.
- `admin/` — website admin, including branding controls, trailer status, text editing, downloads, FAQs, and custom Blockbench mask uploads.

## Preview locally
Run `preview-site.bat` or use any local static HTTP server.

## Publish on GitHub Pages
Upload the *contents* of this folder to your repository root so `index.html` is at the root. Keep `assets/`, `admin/`, `site-config.json`, `styles.css`, and the JavaScript files together. The empty `assets/uploads/` folder includes `.gitkeep` so Git can track it.

## Logo and favicon
The purple/pink logo is selected by default. In `/admin`, use **Switch to classic gold logo** / **Switch to purple logo** to change the website header, footer, Gallery logo tile, and browser favicon together. Click **Save**, then **Download config for GitHub** and publish the exported `site-config.json`. Both purple and classic gold assets are included.

## Homepage trailer
Paste a YouTube URL or a direct `.mp4`, `.webm`, or `.ogg` URL into **Homepage trailer video URL**. Turn on **Show “Coming soon” instead of the trailer** to show the Coming soon card. Turn it off to show the video URL again. Save, export `site-config.json`, and publish it.

## License authors
The initial ownership statement names **MrGold and Dinobeast**. To edit it, open `/admin` → **Edit website text**, select **License**, and search for **original authors**. Save and export `site-config.json` to publish the updated statement.

## Mask previews and custom masks
`assets/mask-tiers/` contains the built-in mask tier textures. The Upgrading page previews the selected mask/level. In `/admin`, **Add a mask from Blockbench** accepts cube-based Blockbench `.bbmodel` models, a matching base PNG, and optional per-level textures. The exported configuration includes the custom geometry and textures; this is a static-site workflow and does not upload files to a server.

## Download counts
The public counter uses the shared Abacus `get`/`hit` endpoints. Counts represent download starts rather than confirmed completed transfers and require the counter service to be available. The reset keys must remain private.

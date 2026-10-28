# Publishing MaskSMP on GitHub Pages

1. Extract the ZIP.
2. Upload the files *inside* the extracted folder to the root of the `MaskSMP` repository. Do not upload the containing folder as another nested directory.
3. Ensure `index.html`, `styles.css`, `script.js`, `mask-visuals.js`, and `site-config.json` are in the repository root. Keep `assets/` and `admin/` intact, including `assets/uploads/.gitkeep`.
4. Commit and push the changes. If the old styling or favicon remains visible, hard-refresh the site; browsers may cache favicons.

## Switch between the purple and classic gold logo
The purple/pink logo is selected by default. Open `/admin` and use the single **Switch to classic gold logo** / **Switch to purple logo** button. This choice applies to the navigation logo, footer logo, Gallery logo tile, and browser favicon. Then click **Save**, click **Download config for GitHub**, and publish the downloaded `site-config.json`. Both logo variants and both favicon variants are included.

## Homepage trailer
Enter a YouTube URL or a direct `.mp4`, `.webm`, or `.ogg` URL in **Homepage trailer video URL**. Enable **Show “Coming soon” instead of the trailer** to display the Coming soon message; disable it to show the configured video. The message is only removed from the public page after the exported configuration is published.

## Ownership and authors
The initial ownership text reads: “All rights, title and interest in the MaskSMP plugin and its source code remain with the original authors: MrGold and Dinobeast.” To change this in Admin, open **Edit website text**, select **License**, and search for **original authors**. Save, export the config, and publish it.

## Downloads and counters
The Downloads page has separate plugin and resource-pack counters. They count download starts, not verified completed transfers. Counter resets require the private reset keys set up in the admin panel; do not commit those private keys.

## Custom masks
In `/admin`, use **Add a mask from Blockbench**, upload a cube-based `.bbmodel` and its base PNG, optionally add separate PNG textures for levels 1–6, then Save and export `site-config.json`. The model geometry/textures are embedded in the config file, so observe the stated size limits. Arbitrary meshes and animations are not supported by the static preview importer.

## Mobile layout
Phone styling uses responsive layouts and larger tap targets. Desktop layout remains unchanged apart from the small homepage-mask size adjustment and tier-2 number contrast improvement.

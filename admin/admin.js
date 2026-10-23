(() => {
  'use strict';
  const STORAGE_KEY = 'masksmp-site-config-v1';
  const DB_NAME = 'masksmp-site-db';
  const DB_STORE = 'settings';
  const MAX_PHOTOS = 8;
  const MAX_IMAGE_DATA_LENGTH = 330000;
  const MAX_TOTAL_IMAGE_DATA_LENGTH = 1800000;
  const MAX_ASSET_FILE_BYTES = 15 * 1024 * 1024;
  const MAX_TOTAL_ASSET_BYTES = 15 * 1024 * 1024;
  const fields = ["siteName", "heroEyebrow", "heroTitle", "heroAccent", "heroDescription", "pluginDescription", "serverIp", "discordUrl", "contactUrl", "modrinthUrl", "navHomeText", "navMasksText", "navDownloadsText", "navFeaturesText", "navGalleryText", "navPluginText", "heroDownloadText", "heroMasksText", "heroMetaOne", "heroMetaTwo", "heroMetaThree", "trustOne", "trustTwo", "trustThree", "trustFour", "featuresEyebrow", "featuresTitleOne", "featuresTitleTwo", "featuresIntro", "featureOneTitle", "featureOneText", "featureOneLink", "featureTwoTitle", "featureTwoText", "featureTwoLink", "featureThreeTitle", "featureThreeText", "featureThreeLink", "maskPreviewEyebrow", "maskPreviewTitle", "maskPreviewLink", "galleryEyebrow", "galleryTitle", "galleryIntro", "galleryEmptyTitle", "galleryEmptyText", "pluginCtaEyebrow", "pluginInfoDownloadText", "footerTagline", "downloadsEyebrow", "downloadsTitle", "downloadsTitleAccent", "downloadsIntro", "pluginCardKicker", "pluginCardTitle", "pluginCardDescription", "pluginSelectLabel", "pluginDownloadButtonText", "packCardKicker", "packCardTitle", "packCardDescription", "packSelectLabel", "packDownloadButtonText", "modrinthEyebrow", "modrinthTitle", "modrinthDescription", "masksPageTitle", "masksPageIntro"];
  const fallback = {
      "siteName": "MaskSMP",
      "heroEyebrow": "MINECRAFT PLUGIN",
      "heroTitle": "Your server.",
      "heroAccent": "Your legend.",
      "heroDescription": "Bring unique masks, distinctive abilities, and an upgrade system to your Minecraft server.",
      "serverIp": "",
      "minecraftVersion": "Not set yet",
      "discordUrl": "",
      "downloadUrl": "",
      "downloadLabel": "Download the plugin",
      "pluginVersion": "Not set yet",
      "pluginDescription": "Bring the MaskSMP experience to your server.",
      "contactUrl": "",
      "modrinthUrl": "",
      "gallery": [],
      "pluginVersions": [],
      "resourcePacks": [],
      "navHomeText": "Home",
      "navMasksText": "Masks",
      "navDownloadsText": "Downloads",
      "navFeaturesText": "Features",
      "navGalleryText": "Gallery",
      "navPluginText": "Download plugin",
      "heroDownloadText": "Download plugin",
      "heroMasksText": "Explore the masks",
      "heroMetaOne": "16 mask types",
      "heroMetaTwo": "6 upgrade tiers",
      "heroMetaThree": "Unique abilities",
      "trustOne": "BUILT FOR MINECRAFT SERVERS",
      "trustTwo": "MASK COLLECTION",
      "trustThree": "PROGRESSION SYSTEM",
      "trustFour": "YOUR PLAYSTYLE",
      "featuresEyebrow": "MAKE EVERY MASK UNIQUE",
      "featuresTitleOne": "A new way",
      "featuresTitleTwo": "to play.",
      "featuresIntro": "Give players a reason to explore, upgrade, and find their own style. MaskSMP revolves around different masks and their abilities.",
      "featureOneTitle": "Unique masks",
      "featureOneText": "Explore a collection featuring Dragon, Flame, Shadow, Storm, Ocean, Galaxy, and more.",
      "featureOneLink": "Explore the collection",
      "featureTwoTitle": "Impactful abilities",
      "featureTwoText": "Give every mask a distinct playstyle, from powerful attacks to tactical abilities.",
      "featureTwoLink": "See examples",
      "featureThreeTitle": "Upgrade your mask",
      "featureThreeText": "Progress through six tiers and let players work toward their next upgrade with /mask upgrade.",
      "featureThreeLink": "Plugin details",
      "maskPreviewEyebrow": "FIND YOUR PLAYSTYLE",
      "maskPreviewTitle": "Which mask fits your playstyle?",
      "maskPreviewLink": "All 16 masks",
      "galleryEyebrow": "IN-GAME GALLERY",
      "galleryTitle": "From your server.",
      "galleryIntro": "Screenshots you add through the admin panel will appear here after you save and publish your changes.",
      "galleryEmptyTitle": "Your screenshots will appear here",
      "galleryEmptyText": "Open the admin panel to add images.",
      "pluginCtaEyebrow": "READY TO UPGRADE YOUR SERVER?",
      "footerTagline": "Made for players who want to write their own story.",
      "pluginInfoDownloadText": "Download plugin",
      "downloadsEyebrow": "DOWNLOADS / RELEASES",
      "downloadsTitle": "Everything for your",
      "downloadsTitleAccent": "Minecraft server.",
      "downloadsIntro": "Choose the plugin version that fits your server or download a resource pack. Manage versions and files in the admin panel.",
      "pluginCardKicker": "01 / PLUGIN RELEASES",
      "pluginCardTitle": "MaskSMP Plugin",
      "pluginCardDescription": "Select a release and check which Minecraft version it supports.",
      "pluginSelectLabel": "Choose a plugin version",
      "pluginDownloadButtonText": "Download selected version",
      "packCardKicker": "02 / OPTIONAL CONTENT",
      "packCardTitle": "Resource packs",
      "packCardDescription": "Choose a resource pack for your preferred version. Files can be added through the admin panel.",
      "packSelectLabel": "Choose a resource pack",
      "packDownloadButtonText": "Download resource pack",
      "modrinthEyebrow": "ALSO AVAILABLE ON MODRINTH",
      "modrinthTitle": "Follow the official release page.",
      "modrinthDescription": "The Modrinth button takes you to the project page where you publish your plugin.",
      "masksPageTitle": "Choose your mask.",
      "masksPageIntro": "Explore the interactive 3D mask, select a type at the bottom, and discover its abilities and upgrade tiers. Drag the mask to rotate it.",
      "galleryLightboxCloseText": "Close"
  };
  const form = document.getElementById('settings-form');
  const galleryEditor = document.getElementById('gallery-editor');
  const photoInput = document.getElementById('photo-files');
  const status = document.getElementById('save-status');
  const photoCount = document.getElementById('photo-count');
  let config = { ...fallback, gallery: [], pluginVersions: [], resourcePacks: [] };
  let canonical = { ...fallback, gallery: [], pluginVersions: [], resourcePacks: [] };
  let dirty = false;

  function announce(message, tone='') {
    status.textContent = message;
    status.classList.remove('is-saved','is-error');
    if (tone) status.classList.add(tone);
  }
  function markDirty(message='You have unsaved changes.') { dirty = true; announce(message); }
  function normalise(value) {
    const object = value && typeof value === 'object' ? value : {};
    return {
      ...fallback, ...object,
      gallery: Array.isArray(object.gallery) ? object.gallery.filter(photo => photo && typeof photo.src === 'string') : [],
      pluginVersions: Array.isArray(object.pluginVersions) ? object.pluginVersions.filter(item => item && typeof item === 'object') : [],
      resourcePacks: Array.isArray(object.resourcePacks) ? object.resourcePacks.filter(item => item && typeof item === 'object') : []
    };
  }
  function openDb() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) return reject(new Error('IndexedDB is not supported in this browser.'));
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(DB_STORE)) request.result.createObjectStore(DB_STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Could not open browser database.'));
    });
  }
  async function dbGet(key) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readonly');
      const request = tx.objectStore(DB_STORE).get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  }
  async function dbSet(key, value) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).put(value, key);
      tx.oncomplete = () => { db.close(); resolve(true); };
      tx.onerror = () => { const error = tx.error; db.close(); reject(error || new Error('Could not save to browser database.')); };
      tx.onabort = () => { const error = tx.error; db.close(); reject(error || new Error('Saving was cancelled.')); };
    });
  }
  async function dbDelete(key) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readwrite'); tx.objectStore(DB_STORE).delete(key);
      tx.oncomplete = () => { db.close(); resolve(true); };
      tx.onerror = () => { const error = tx.error; db.close(); reject(error); };
    });
  }
  async function readCanonical() {
    try {
      const response = await fetch('../site-config.json', { cache:'no-store' });
      if (response.ok) return normalise(await response.json());
    } catch (error) { /* direct file opening falls back to defaults */ }
    return normalise(fallback);
  }
  async function readLocal() {
    try {
      const value = await dbGet('siteConfig');
      if (value && typeof value === 'object') return value;
    } catch (error) { /* continue with localStorage fallback */ }
    try { const value = localStorage.getItem(STORAGE_KEY); return value ? JSON.parse(value) : null; }
    catch (error) { return null; }
  }
  function isRepoDownloadPath(value) {
    if (typeof value !== 'string') return false;
    const path = value.trim().replace(/^\.\//, '');
    return path.startsWith('downloads/') && !/[\u0000-\u001f?#\\]/.test(path) && !path.includes('//') && !path.split('/').slice(1).some(part => !part || part === '.' || part === '..');
  }
  function combineSavedWithPublished(saved, published) {
    if (!saved) return normalise(published);
    const combined = { ...published, ...saved };
    const savedGallery = Array.isArray(saved.gallery) ? saved.gallery : [];
    const publicGallery = Array.isArray(published.gallery) ? published.gallery : [];
    const publicGalleryIds = new Set(publicGallery.filter(item => item && item.id).map(item => item.id));
    const savedById = new Map(savedGallery.filter(item => item && item.id).map(item => [item.id, item]));
    // Start with all published images so another device's latest additions are not hidden by an older local draft.
    combined.gallery = [
      ...publicGallery.map(item => savedById.has(item.id) ? { ...item, ...savedById.get(item.id) } : item),
      ...savedGallery.filter(item => !item || !item.id || !publicGalleryIds.has(item.id))
    ];
    const mergeAssets = (localItems, publicItems) => {
      const localList = Array.isArray(localItems) ? localItems : [];
      const source = Array.isArray(publicItems) ? publicItems : [];
      const localById = new Map(localList.filter(item => item && item.id).map(item => [item.id, item]));
      const publishedIds = new Set(source.filter(item => item && item.id).map(item => item.id));
      const mergedPublished = source.map(publishedItem => {
        const localItem = localById.get(publishedItem?.id);
        if (!localItem) return publishedItem;
        const merged = { ...publishedItem, ...localItem };
        // A committed downloads/ path is the shared copy. Never replace it with an older browser-only base64 value.
        if (isRepoDownloadPath(publishedItem.downloadUrl)) {
          merged.downloadUrl = publishedItem.downloadUrl;
          merged.fileData = '';
          merged.fileName = publishedItem.fileName || merged.fileName;
          merged.fileSize = publishedItem.fileSize || merged.fileSize;
        }
        return merged;
      });
      return [...mergedPublished, ...localList.filter(item => !item || !item.id || !publishedIds.has(item.id))];
    };
    combined.pluginVersions = mergeAssets(saved.pluginVersions, published.pluginVersions);
    combined.resourcePacks = mergeAssets(saved.resourcePacks, published.resourcePacks);
    return normalise(combined);
  }
  function getFormConfig() {
    const formData = new FormData(form);
    const next = { ...config };
    fields.forEach(key => { next[key] = String(formData.get(key) ?? '').trim(); });
    next.gallery = config.gallery;
    next.pluginVersions = config.pluginVersions;
    next.resourcePacks = config.resourcePacks;
    return next;
  }
  function fillForm(value) {
    fields.forEach(key => { const field = form.elements.namedItem(key); if (field) field.value = value[key] ?? ''; });
  }
  function renderGallery() {
    galleryEditor.replaceChildren();
    photoCount.textContent = `${config.gallery.length} / ${MAX_PHOTOS} images`;
    if (!config.gallery.length) {
      const empty = document.createElement('div'); empty.className = 'admin-gallery-empty'; empty.textContent = 'There are no screenshots yet. Add images above.'; galleryEditor.append(empty); return;
    }
    config.gallery.forEach((photo, index) => {
      const card = document.createElement('article'); card.className = 'photo-card';
      const image = document.createElement('img'); image.src = photo.src; image.alt = photo.title || `Screenshot ${index+1}`; image.loading = 'lazy';
      const meta = document.createElement('div'); meta.className = 'photo-meta';
      const label = document.createElement('label'); label.textContent = `Photo title ${index+1}`; label.htmlFor = `photo-title-${index}`;
      const title = document.createElement('input'); title.id = `photo-title-${index}`; title.type = 'text'; title.maxLength = 90; title.value = photo.title || ''; title.placeholder = 'e.g. Dragon ability in-game';
      title.addEventListener('input', () => { config.gallery[index].title = title.value; image.alt = title.value || `Screenshot ${index+1}`; markDirty(); });
      meta.append(label, title);
      const actions = document.createElement('div'); actions.className = 'photo-actions';
      const number = document.createElement('small'); number.textContent = `PHOTO / ${(index+1).toString().padStart(2,'0')}`;
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'delete-photo'; remove.textContent = 'Remove'; remove.setAttribute('aria-label', `Remove photo ${photo.title || index+1}`);
      remove.addEventListener('click', () => {
        config.gallery.splice(index, 1); renderGallery(); markDirty('Photo removed from the draft. Click Save to keep the change.');
      });
      actions.append(number, remove); card.append(image, meta, actions); galleryEditor.append(card);
    });
  }
  async function imageToDataUrl(file) {
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) throw new Error(`${file.name}: choose a PNG, JPG, or WebP image.`);
    if (file.size > 12 * 1024 * 1024) throw new Error(`${file.name}: the file is larger than 12 MB.`);
    if (!('createImageBitmap' in window)) throw new Error('This browser cannot resize images. Use an up-to-date browser.');
    const bitmap = await createImageBitmap(file);
    let width = bitmap.width, height = bitmap.height;
    const maxSide = 1400;
    const scale = Math.min(1, maxSide / Math.max(width, height));
    width = Math.max(1, Math.round(width * scale)); height = Math.max(1, Math.round(height * scale));
    const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
    const context = canvas.getContext('2d', { alpha:true });
    if (!context) { bitmap.close(); throw new Error('This browser cannot process the image.'); }
    context.drawImage(bitmap, 0, 0, width, height); bitmap.close();
    let quality = 0.82; let dataUrl = canvas.toDataURL('image/webp', quality);
    while (dataUrl.length > MAX_IMAGE_DATA_LENGTH && quality > 0.48) { quality -= 0.08; dataUrl = canvas.toDataURL('image/webp', quality); }
    if (dataUrl.length > MAX_IMAGE_DATA_LENGTH) {
      const smaller = document.createElement('canvas'); smaller.width = Math.round(width * .72); smaller.height = Math.round(height * .72);
      const smallCtx = smaller.getContext('2d'); smallCtx.drawImage(canvas, 0, 0, smaller.width, smaller.height);
      dataUrl = smaller.toDataURL('image/webp', .58);
    }
    if (dataUrl.length > MAX_IMAGE_DATA_LENGTH) throw new Error(`${file.name}: this image is still too large after resizing. Use a smaller image.`);
    return dataUrl;
  }
  async function handlePhotos(files) {
    const list = Array.from(files || []); if (!list.length) return;
    if (config.gallery.length + list.length > MAX_PHOTOS) {
      announce(`You can add up to ${MAX_PHOTOS} photos. Remove a photo first.`, 'is-error'); photoInput.value = ''; return;
    }
    photoInput.disabled = true;
    const initialPhotoCount = config.gallery.length;
    try {
      for (const file of list) {
        const src = await imageToDataUrl(file);
        const currentImageSize = config.gallery.reduce((sum, item) => sum + (item.src?.startsWith('data:image/') ? item.src.length : 0), 0);
        if (currentImageSize + src.length > MAX_TOTAL_IMAGE_DATA_LENGTH) throw new Error('The total image size is too large to save safely. Remove a photo or use smaller screenshots.');
        config.gallery.push({ id: (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`), title: file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '), src });
      }
      renderGallery(); markDirty(`${list.length} image(s) added to your draft. Click Save.`);
    } catch (error) { if (config.gallery.length !== initialPhotoCount) renderGallery(); announce(error.message || 'Adding the image failed.', 'is-error'); }
    finally { photoInput.disabled = false; photoInput.value = ''; }
  }
  function dataUrlBytes(value) {
    if (typeof value !== 'string' || !value.startsWith('data:')) return 0;
    const comma = value.indexOf(',');
    return comma < 0 ? 0 : Math.floor((value.length - comma - 1) * 0.75);
  }
  function totalAssetBytes() {
    // Only embedded data URLs use the JSON-embed budget. Files already stored under downloads/ live in GitHub.
    return [...config.pluginVersions, ...config.resourcePacks].reduce((sum, item) => sum + dataUrlBytes(item.fileData), 0);
  }
  function renderAssetList(kind) {
    const plugin = kind === 'plugin';
    const list = document.getElementById(plugin ? 'plugin-versions-list' : 'resource-packs-list');
    const assets = plugin ? config.pluginVersions : config.resourcePacks;
    const emptyText = plugin ? 'No plugin versions added yet.' : 'No resource packs added yet.';
    list.replaceChildren();
    if (!assets.length) {
      const empty = document.createElement('div'); empty.className = 'asset-list-empty'; empty.textContent = emptyText; list.append(empty); return;
    }
    assets.forEach((asset, index) => {
      const card = document.createElement('article'); card.className = 'asset-item';
      const head = document.createElement('div'); head.className = 'asset-item-head';
      const titleWrap = document.createElement('div');
      const title = document.createElement('div'); title.className = 'asset-item-title'; title.textContent = plugin ? `MaskSMP ${asset.version || `release ${index + 1}`}` : (asset.name || `Resource pack ${index + 1}`);
      const subtitle = document.createElement('div'); subtitle.className = 'asset-item-subtitle';
      const parts = [];
      if (asset.minecraftVersion) parts.push(`Minecraft ${asset.minecraftVersion}`);
      if (asset.fileName) parts.push(asset.fileName);
      else if (asset.downloadUrl) parts.push('External HTTPS link');
      if (asset.notes) parts.push(asset.notes);
      subtitle.textContent = parts.join(' · ') || 'No additional details';
      titleWrap.append(title, subtitle);
      const badge = document.createElement('span'); badge.className = 'asset-item-badge'; badge.textContent = asset.fileData ? 'UPLOAD' : 'LINK';
      head.append(titleWrap, badge);
      const actions = document.createElement('div'); actions.className = 'asset-item-actions';
      const size = document.createElement('small');
      const bytes = Number(asset.fileSize) || dataUrlBytes(asset.fileData);
      size.textContent = asset.fileData ? `${(bytes / (1024 * 1024)).toFixed(2)} MB · will be exported` : 'Will be downloaded from link';
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'asset-remove'; remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        assets.splice(index, 1); renderAssetList(kind); markDirty(`${plugin ? 'Plugin version' : 'Resource pack'} removed. Click Save to keep the change.`);
      });
      actions.append(size, remove); card.append(head, actions); list.append(card);
    });
  }
  function readDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error(`Could not read ${file.name}.`)); reader.readAsDataURL(file);
    });
  }
  function forceFileMime(dataUrl, mime) {
    return dataUrl.replace(/^data:[^;,]+;base64,/i, `data:${mime};base64,`);
  }
  function setAssetStatus(kind, message, isError=false) {
    const node = document.getElementById(kind === 'plugin' ? 'plugin-version-status' : 'resource-pack-status');
    node.textContent = message; node.classList.toggle('is-error', isError);
  }
  async function addAsset(kind) {
    const plugin = kind === 'plugin';
    config = getFormConfig();
    const name = document.getElementById(plugin ? 'plugin-version-name' : 'pack-name');
    const version = document.getElementById(plugin ? 'plugin-version-name' : 'pack-version');
    const minecraft = document.getElementById(plugin ? 'plugin-minecraft-version' : 'pack-minecraft-version');
    const fileInput = document.getElementById(plugin ? 'plugin-version-file' : 'pack-file');
    const urlInput = document.getElementById(plugin ? 'plugin-version-url' : 'pack-url');
    const notes = document.getElementById(plugin ? 'plugin-version-notes' : 'pack-notes');
    const label = name.value.trim();
    const file = fileInput.files && fileInput.files[0];
    const url = urlInput.value.trim();
    if (!label) { setAssetStatus(kind, plugin ? 'Enter a version number first.' : 'Enter a name for the resource pack first.', true); name.focus(); return; }
    if (!file && !url) { setAssetStatus(kind, 'Choose a file from your device or enter a direct HTTPS link.', true); return; }
    if (url && !/^https:\/\//i.test(url)) { setAssetStatus(kind, 'Use a full HTTPS download link only.', true); urlInput.focus(); return; }
    if (file && file.size > MAX_ASSET_FILE_BYTES) { setAssetStatus(kind, 'This file is larger than 15 MB. Use an HTTPS link to the file.', true); return; }
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (plugin && ext !== 'jar') { setAssetStatus(kind, 'Select the actual plugin file with the .jar extension.', true); return; }
      if (!plugin && ext !== 'zip') { setAssetStatus(kind, 'Select a resource pack file with the .zip extension.', true); return; }
      if (totalAssetBytes() + file.size > MAX_TOTAL_ASSET_BYTES) { setAssetStatus(kind, 'The total upload would exceed 15 MB. Use an HTTPS link for larger files.', true); return; }
    }
    const addButton = document.getElementById(plugin ? 'add-plugin-version' : 'add-resource-pack');
    addButton.disabled = true;
    try {
      let fileData = '';
      if (file) {
        fileData = await readDataUrl(file);
        fileData = forceFileMime(fileData, plugin ? 'application/java-archive' : 'application/zip');
      }
      const entry = {
        id: (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`),
        version: plugin ? label : (version.value.trim() || '1.0'),
        name: plugin ? `MaskSMP ${label}` : label,
        minecraftVersion: minecraft.value.trim(), notes: notes.value.trim(),
        fileName: file ? file.name : '', fileSize: file ? file.size : 0,
        fileData, downloadUrl: file ? '' : url
      };
      if (plugin) config.pluginVersions.unshift(entry); else config.resourcePacks.unshift(entry);
      renderAssetList(kind);
      name.value = ''; if (!plugin) version.value = ''; minecraft.value = ''; notes.value = ''; fileInput.value = ''; urlInput.value = '';
      markDirty(`${plugin ? 'Plugin version' : 'Resource pack'} added. Click Publish to GitHub so everyone can see it.`);
      setAssetStatus(kind, file ? `${file.name} added.` : 'Download link added.');
    } catch (error) {
      setAssetStatus(kind, error.message || 'Adding the file failed.', true);
    } finally { addButton.disabled = false; }
  }
  function compactConfig(value) {
    // Store descriptions and metadata in localStorage; larger uploaded binaries live in IndexedDB.
    return {
      ...value,
      pluginVersions: value.pluginVersions.map(({ fileData, ...item }) => item),
      resourcePacks: value.resourcePacks.map(({ fileData, ...item }) => item)
    };
  }
  async function saveLocal(showMessage=true) {
    config = getFormConfig();
    let dbSaved = false;
    try { await dbSet('siteConfig', config); dbSaved = true; }
    catch (error) { /* try compact metadata in localStorage below */ }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(compactConfig(config))); }
    catch (error) { if (!dbSaved) { announce('Save failed. Browser storage is full or unavailable.', 'is-error'); return false; } }
    if (!dbSaved && (config.pluginVersions.some(item => item.fileData) || config.resourcePacks.some(item => item.fileData))) {
      announce('The browser could not store files locally. Download the GitHub config so you do not lose these uploads.', 'is-error');
      dirty = false; return false;
    }
    dirty = false;
    if (showMessage) announce('Saved as a local draft only. Click Publish to GitHub to share it with every visitor.', 'is-saved');
    return true;
  }
  async function downloadConfig() {
    config = getFormConfig();
    const blob = new Blob([JSON.stringify(config, null, 2)], { type:'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = 'site-config.json'; document.body.append(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    await saveLocal(false);
    announce('Backup downloaded. For a one-step publish, use Publish to GitHub above.', 'is-saved');
  }
  const GITHUB_OWNER = 'MaskSMP-plugin';
  const GITHUB_REPO = 'MaskSMP';
  const GITHUB_BRANCH = 'main';
  const GITHUB_API_ROOT = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/`;

  function githubPath(path) { return path.split('/').map(encodeURIComponent).join('/'); }
  async function githubRequest(path, token, options={}) {
    const headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28'
    };
    if (options.body) headers['Content-Type'] = 'application/json';
    let response;
    try {
      response = await fetch(`${GITHUB_API_ROOT}${githubPath(path)}${options.query || ''}`, {
        method: options.method || 'GET', headers, body: options.body ? JSON.stringify(options.body) : undefined,
        cache: 'no-store', credentials: 'omit'
      });
    } catch (error) {
      throw new Error('Could not connect to GitHub. Check your internet connection and try again.');
    }
    const raw = await response.text();
    let data = {};
    try { data = raw ? JSON.parse(raw) : {}; } catch (error) { data = { message: raw || 'GitHub returned an unreadable response.' }; }
    if (!response.ok) {
      const error = new Error(data.message || `GitHub returned HTTP ${response.status}.`);
      error.status = response.status; throw error;
    }
    return data;
  }
  async function getGitHubSha(path, token) {
    try {
      const existing = await githubRequest(path, token, { query: `?ref=${encodeURIComponent(GITHUB_BRANCH)}` });
      return existing.sha || null;
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }
  function dataUrlBase64(value) {
    if (typeof value !== 'string') return '';
    const match = value.match(/^data:[^;,]+;base64,([A-Za-z0-9+/=\r\n]+)$/i);
    return match ? match[1].replace(/\s+/g, '') : '';
  }
  function slugForFile(value) {
    const slug = String(value || 'release').normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 42);
    return slug || 'release';
  }
  function safeOriginalFileName(value, fallbackName) {
    let name = String(value || fallbackName || 'download.bin').split(/[\\/]/).pop().normalize('NFKC');
    name = name.replace(/[^\p{L}\p{N}._() -]/gu, '_').replace(/\s+/g, ' ').trim().replace(/^\.+/, '');
    if (!name || name === '.' || name === '..') name = fallbackName || 'download.bin';
    return name.slice(0, 110);
  }
  async function publishBinaryAsset(asset, kind, index, token) {
    const payload = dataUrlBase64(asset.fileData);
    if (!payload) return;
    const isPlugin = kind === 'plugin';
    const folder = isPlugin ? 'downloads/plugins' : 'downloads/resourcepacks';
    const original = safeOriginalFileName(asset.fileName, isPlugin ? 'MaskSMP.jar' : 'MaskSMP-resourcepack.zip');
    let path = isRepoDownloadPath(asset.downloadUrl) ? asset.downloadUrl.trim().replace(/^\.\//, '') : '';
    // If the existing shared path is already committed, prefer it and drop the stale embedded copy.
    if (path) {
      const existingSha = await getGitHubSha(path, token);
      if (existingSha) {
        asset.fileData = '';
        asset.downloadUrl = path;
        asset.fileName = asset.fileName || original;
        return;
      }
    } else {
      const versionSlug = slugForFile(asset.version || asset.name || `${kind}-${index + 1}`);
      const idSuffix = String(asset.id || `${Date.now()}${index}`).replace(/[^A-Za-z0-9]/g, '').slice(-8) || String(index + 1);
      path = `${folder}/${versionSlug}-${idSuffix}-${original}`;
    }
    const sha = await getGitHubSha(path, token);
    await githubRequest(path, token, {
      method: 'PUT',
      body: {
        message: `Publish MaskSMP ${isPlugin ? 'plugin' : 'resource pack'}: ${original}`,
        content: payload,
        branch: GITHUB_BRANCH,
        ...(sha ? { sha } : {})
      }
    });
    asset.downloadUrl = path;
    asset.fileData = '';
    asset.fileName = asset.fileName || original;
    if (!Number(asset.fileSize)) asset.fileSize = Math.floor(payload.length * 0.75);
  }
  async function publishToGitHub() {
    const tokenInput = document.getElementById('github-publish-token');
    const button = document.getElementById('publish-github-button');
    const statusNode = document.getElementById('github-publish-status');
    const token = tokenInput?.value.trim();
    if (!token) {
      announce('Enter your fine-grained GitHub token first.', 'is-error');
      tokenInput?.focus(); return;
    }
    if (!window.confirm('Publish the current website draft to MaskSMP-plugin/MaskSMP on the main branch? Visitors will see the published version after GitHub Pages updates.')) {
      if (tokenInput) tokenInput.value = '';
      return;
    }
    button.disabled = true;
    try {
      config = getFormConfig();
      const saved = await saveLocal(false);
      if (!saved) throw new Error('Could not save the local draft before publishing.');
      statusNode.textContent = 'Checking GitHub permissions…';
      // Validate access to the exact repository before attempting any write.
      await githubRequest('site-config.json', token, { query: `?ref=${encodeURIComponent(GITHUB_BRANCH)}` });
      const assetGroups = [
        ['plugin', config.pluginVersions],
        ['pack', config.resourcePacks]
      ];
      let uploaded = 0;
      for (const [kind, assets] of assetGroups) {
        for (let index = 0; index < assets.length; index++) {
          const asset = assets[index];
          if (dataUrlBase64(asset?.fileData)) {
            statusNode.textContent = `Publishing ${kind === 'plugin' ? 'plugin' : 'resource pack'} file ${uploaded + 1}…`;
            await publishBinaryAsset(asset, kind, index, token);
            uploaded++;
          }
        }
      }
      statusNode.textContent = 'Publishing site settings and images…';
      const jsonText = JSON.stringify(config, null, 2);
      const bytes = new TextEncoder().encode(jsonText);
      let binary = '';
      const chunkSize = 0x8000;
      for (let offset = 0; offset < bytes.length; offset += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
      }
      const content = btoa(binary);
      const sha = await getGitHubSha('site-config.json', token);
      await githubRequest('site-config.json', token, {
        method: 'PUT',
        body: {
          message: 'Publish MaskSMP website changes from admin panel',
          content,
          branch: GITHUB_BRANCH,
          ...(sha ? { sha } : {})
        }
      });
      const savedAfterPublish = await saveLocal(false);
      if (!savedAfterPublish) throw new Error('GitHub was updated, but the local browser could not save the final draft. Your published site is still updated.');
      renderAssetList('plugin'); renderAssetList('pack');
      dirty = false;
      statusNode.textContent = `Published successfully${uploaded ? `, including ${uploaded} file(s)` : ''}. GitHub Pages may take a short time to refresh.`;
      announce('Published to GitHub. Visitors on other devices will now use the shared published config.', 'is-saved');
    } catch (error) {
      const detail = error.status === 401 ? 'The token is invalid or expired.'
        : error.status === 403 ? 'GitHub denied access. The token needs Contents: Read and write for this repository.'
        : error.status === 404 ? 'The repository or site-config.json was not found. Check that the token grants access to MaskSMP-plugin/MaskSMP.'
        : error.status === 409 || error.status === 422 ? 'GitHub detected a conflict. Reload this admin page, keep your draft backed up, and try publishing again.'
        : error.message || 'Publishing failed.';
      statusNode.textContent = detail;
      announce(detail, 'is-error');
    } finally {
      if (tokenInput) tokenInput.value = '';
      if (button) button.disabled = false;
    }
  }

  async function resetPublished() {
    if (!window.confirm('Discard all local draft changes and reload the contents of site-config.json?')) return;
    localStorage.removeItem(STORAGE_KEY);
    try { await dbDelete('siteConfig'); } catch (error) { /* database may not exist yet */ }
    canonical = await readCanonical(); config = normalise(canonical); fillForm(config); renderGallery(); renderAssetList('plugin'); renderAssetList('pack');
    dirty = false; announce('Local changes cleared. This is the published configuration.', 'is-saved');
  }
  async function importConfig(file) {
    if (!file) return;
    try {
      const imported = normalise(JSON.parse(await file.text()));
      config = imported; fillForm(config); renderGallery(); renderAssetList('plugin'); renderAssetList('pack'); dirty = true;
      document.getElementById('import-status').textContent = `Imported: ${file.name}. Save locally or publish it to GitHub.`;
      announce('Configuration loaded as a draft. Remember to click Save.');
    } catch (error) { document.getElementById('import-status').textContent = 'Import failed. Make sure you selected a valid site-config.json file.'; announce('The JSON file could not be read.', 'is-error'); }
  }
  document.addEventListener('DOMContentLoaded', async () => {
    canonical = await readCanonical(); config = combineSavedWithPublished(await readLocal(), canonical);
    fillForm(config); renderGallery(); renderAssetList('plugin'); renderAssetList('pack');
    form.addEventListener('input', event => { if (event.target.matches('input,textarea,select')) markDirty(); });
    photoInput.addEventListener('change', () => handlePhotos(photoInput.files));
    document.getElementById('add-plugin-version').addEventListener('click', () => addAsset('plugin'));
    document.getElementById('add-resource-pack').addEventListener('click', () => addAsset('pack'));
    document.getElementById('save-button').addEventListener('click', () => saveLocal(true));
    document.getElementById('export-button').addEventListener('click', downloadConfig);
    document.getElementById('publish-github-button')?.addEventListener('click', publishToGitHub);
    document.getElementById('reset-button').addEventListener('click', resetPublished);
    document.getElementById('config-file').addEventListener('change', event => importConfig(event.target.files?.[0]));
    window.addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
  });
})();

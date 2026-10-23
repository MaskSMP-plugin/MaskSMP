(() => {
  'use strict';
  const STORAGE_KEY = 'masksmp-site-config-v1';
  const DB_NAME = 'masksmp-site-db';
  const DB_STORE = 'settings';
  const fallback = {"siteName":"MaskSMP","heroEyebrow":"MINECRAFT PLUGIN","heroTitle":"Your server.","heroAccent":"Your legend.","heroDescription":"Bring unique masks, distinctive abilities, and an upgrade system to your Minecraft server.","serverIp":"","minecraftVersion":"Not set yet","discordUrl":"","downloadUrl":"","downloadLabel":"Download the plugin","pluginVersion":"Not set yet","pluginDescription":"Bring the MaskSMP experience to your server.","contactUrl":"","gallery":[],"modrinthUrl":"","pluginVersions":[],"resourcePacks":[],"navHomeText":"Home","navMasksText":"Masks","navDownloadsText":"Downloads","navFeaturesText":"Features","navGalleryText":"Gallery","navPluginText":"Download plugin","heroDownloadText":"Download plugin","heroMasksText":"Explore the masks","heroMetaOne":"16 mask types","heroMetaTwo":"6 upgrade tiers","heroMetaThree":"Unique abilities","trustOne":"BUILT FOR MINECRAFT SERVERS","trustTwo":"MASK COLLECTION","trustThree":"PROGRESSION SYSTEM","trustFour":"YOUR PLAYSTYLE","featuresEyebrow":"MAKE EVERY MASK UNIQUE","featuresTitleOne":"A new way","featuresTitleTwo":"to play.","featuresIntro":"Give players a reason to explore, upgrade, and find their own style. MaskSMP revolves around different masks and their abilities.","featureOneTitle":"Unique masks","featureOneText":"Explore a collection featuring Dragon, Flame, Shadow, Storm, Ocean, Galaxy, and more.","featureOneLink":"Explore the collection","featureTwoTitle":"Impactful abilities","featureTwoText":"Give every mask a distinct playstyle, from powerful attacks to tactical abilities.","featureTwoLink":"See examples","featureThreeTitle":"Upgrade your mask","featureThreeText":"Progress through six tiers and let players work toward their next upgrade with /mask upgrade.","featureThreeLink":"Plugin details","maskPreviewEyebrow":"FIND YOUR PLAYSTYLE","maskPreviewTitle":"Which mask fits your playstyle?","maskPreviewLink":"All 16 masks","galleryEyebrow":"IN-GAME GALLERY","galleryTitle":"From your server.","galleryIntro":"Screenshots you add through the admin panel will appear here after you save and publish your changes.","galleryEmptyTitle":"Your screenshots will appear here","galleryEmptyText":"Open the admin panel to add images.","pluginCtaEyebrow":"READY TO UPGRADE YOUR SERVER?","footerTagline":"Made for players who want to write their own story.","pluginInfoDownloadText":"Download plugin","downloadsEyebrow":"DOWNLOADS / RELEASES","downloadsTitle":"Everything for your","downloadsTitleAccent":"Minecraft server.","downloadsIntro":"Choose the plugin version that fits your server or download a resource pack. Manage versions and files in the admin panel.","pluginCardKicker":"01 / PLUGIN RELEASES","pluginCardTitle":"MaskSMP Plugin","pluginCardDescription":"Select a release and check which Minecraft version it supports.","pluginSelectLabel":"Choose a plugin version","pluginDownloadButtonText":"Download selected version","packCardKicker":"02 / OPTIONAL CONTENT","packCardTitle":"Resource packs","packCardDescription":"Choose a resource pack for your preferred version. Files can be added through the admin panel.","packSelectLabel":"Choose a resource pack","packDownloadButtonText":"Download resource pack","modrinthEyebrow":"ALSO AVAILABLE ON MODRINTH","modrinthTitle":"Follow the official release page.","modrinthDescription":"The Modrinth button takes you to the project page where you publish your plugin.","masksPageTitle":"Choose your mask.","masksPageIntro":"Explore the interactive 3D mask, select a type at the bottom, and discover its abilities and upgrade tiers. Drag the mask to rotate it.","galleryLightboxCloseText":"Close"};
  const safeUrl = (value) => {
    if (typeof value !== 'string') return '';
    const text = value.trim();
    if (/^https:\/\//i.test(text)) return text;
    if (/^http:\/\//i.test(text) && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) return text;
    return '';
  };
  // Accept a repository-local download path, including filenames with spaces and parentheses,
  // while rejecting traversal, queries and absolute/external paths.
  const safeFilePath = (value) => {
    if (typeof value !== 'string') return '';
    const text = value.trim().replace(/^\.\//, '');
    if (!text.startsWith('downloads/') || /[\u0000-\u001f?#\\]/.test(text) || text.includes('//')) return '';
    const parts = text.split('/');
    if (parts[0] !== 'downloads' || parts.length < 2 || parts.slice(1).some((part) => !part || part === '.' || part === '..')) return '';
    try { if (parts.some((part) => { const decoded = decodeURIComponent(part); return decoded === '..' || decoded === '.' || decoded.includes('/') || decoded.includes('\\'); })) return ''; } catch (error) { return ''; }
    return text;
  };
  function safeImageSrc(value) {
    if (typeof value !== 'string') return '';
    const text = value.trim();
    if (/^data:image\/(?:png|jpeg|webp|gif|avif);base64,/i.test(text)) return text;
    // GitHub's /blob/ URL shows an HTML page rather than the image bytes; convert it to raw.
    const githubBlob = text.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/i);
    if (githubBlob) return `https://raw.githubusercontent.com/${githubBlob[1]}/${githubBlob[2]}/${githubBlob[3]}/${githubBlob[4]}`;
    if (/^https:\/\//i.test(text)) return text;
    const relative = text.replace(/^\.\//, '');
    if (/^\/MaskSMP\/assets\//.test(relative)) return new URL(relative, location.origin).href;
    const assetPath = relative.startsWith('/assets/') ? relative.slice(1) : relative;
    if (!assetPath.startsWith('assets/') || assetPath.includes('\\') || /[\u0000-\u001f?#]/.test(assetPath)) return '';
    const parts = assetPath.split('/');
    if (parts.some((part) => !part || part === '.' || part === '..')) return '';
    return new URL(assetPath, new URL('./', document.baseURI)).href;
  }
  const safeFileData = (value) => typeof value === 'string' && /^data:(application\/(java-archive|octet-stream|zip|x-zip-compressed)|application\/vnd\.minecraft\.resource-pack);base64,/i.test(value);
  const normalise = (value) => {
    const object = value && typeof value === 'object' ? value : {};
    return { ...fallback, ...object,
      gallery: Array.isArray(object.gallery) ? object.gallery : [],
      pluginVersions: Array.isArray(object.pluginVersions) ? object.pluginVersions : [],
      resourcePacks: Array.isArray(object.resourcePacks) ? object.resourcePacks : [] };
  };
  function openDb() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) return reject(new Error('IndexedDB unavailable'));
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains(DB_STORE)) request.result.createObjectStore(DB_STORE); };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Could not open database'));
    });
  }
  async function dbGet(key) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readonly');
      const req = tx.objectStore(DB_STORE).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
  }
  async function getConfig() {
    // The public website must have one shared source of truth for every visitor: site-config.json
    // committed to GitHub. Never overlay localStorage or IndexedDB drafts on public pages.
    try {
      const endpoint = new URL('site-config.json', document.baseURI);
      const response = await fetch(endpoint.href, { cache: 'no-cache', credentials: 'same-origin' });
      if (!response.ok) throw new Error(`site-config.json returned HTTP ${response.status}`);
      const remote = await response.json();
      if (!remote || typeof remote !== 'object' || Array.isArray(remote)) throw new Error('site-config.json is not a JSON object');
      return normalise(remote);
    } catch (error) {
      console.error('MaskSMP: the published site-config.json could not be loaded.', error);
      // Local browser drafts are only a fallback for local development, never for live GitHub Pages.
      if (location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        try {
          const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
          if (local && typeof local === 'object') return normalise({ ...fallback, ...local });
        } catch (localError) { /* use fallback below */ }
      }
      return normalise(fallback);
    }
  }
  function setText(config) {
    document.querySelectorAll('[data-config]').forEach((node) => {
      const key = node.getAttribute('data-config');
      if (Object.prototype.hasOwnProperty.call(config, key) && config[key] !== null && typeof config[key] !== 'object') node.textContent = String(config[key]);
    });
    document.title = document.body.classList.contains('mask-system-page') ? `${config.siteName || 'MaskSMP'} — Masks` : (document.body.classList.contains('downloads-page') ? `${config.siteName || 'MaskSMP'} — Downloads` : (document.body.classList.contains('features-page') ? `${config.siteName || 'MaskSMP'} — Features` : (document.body.classList.contains('gallery-page') ? `${config.siteName || 'MaskSMP'} — Gallery` : `${config.siteName || 'MaskSMP'} — Minecraft plugin`)));
    const serverLine = document.getElementById('server-ip-line');
    if (serverLine) serverLine.hidden = !String(config.serverIp || '').trim();
    const contact = document.getElementById('contact-link');
    if (contact) { const href = safeUrl(config.contactUrl); contact.hidden = !href; if (href) contact.href = href; }
    const discord = document.getElementById('discord-link');
    if (discord) { const href = safeUrl(config.discordUrl); discord.hidden = !href; if (href) discord.href = href; }
    const version = (config.pluginVersions || []).find(item => item && item.version) || null;
    const versionNode = document.querySelector('[data-config="pluginVersion"]');
    if (versionNode) versionNode.textContent = version?.version || config.pluginVersion || 'Not set yet';
    const mcNode = document.querySelector('[data-config="minecraftVersion"]');
    if (mcNode) mcNode.textContent = version?.minecraftVersion || config.minecraftVersion || 'Not set yet';
    const hero = document.getElementById('hero-download');
    if (hero) { hero.href = 'downloads.html'; hero.removeAttribute('target'); hero.removeAttribute('rel'); }
    const downloadNote = document.getElementById('download-note');
    if (downloadNote) downloadNote.textContent = 'Choose your plugin version on the separate Downloads page.';
  }
  function renderGallery(config) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return [];
    grid.replaceChildren();
    const photos = config.gallery
      .filter(item => item && typeof item.src === 'string')
      .map(item => ({ ...item, src: safeImageSrc(item.src) }))
      .filter(item => Boolean(item.src));
    if (!photos.length) {
      const empty = document.createElement('div'); empty.className = 'gallery-empty';
      const icon = document.createElement('span'); icon.textContent = '▧'; icon.setAttribute('aria-hidden', 'true');
      const title = document.createElement('b'); title.dataset.config = 'galleryEmptyTitle'; title.textContent = config.galleryEmptyTitle || 'Your screenshots will appear here';
      const text = document.createElement('p'); text.dataset.config = 'galleryEmptyText'; text.textContent = config.galleryEmptyText || 'Open the admin panel to add images.';
      empty.append(icon, title, text); grid.append(empty); return [];
    }
    photos.forEach((item, index) => {
      const figure = document.createElement('figure'); figure.className = 'gallery-card';
      const open = document.createElement('button'); open.type = 'button'; open.className = 'gallery-image-open'; open.dataset.galleryIndex = String(index); open.setAttribute('aria-label', `Enlarge image ${index + 1}`);
      const image = document.createElement('img'); image.src = item.src; image.alt = String(item.title || 'MaskSMP screenshot'); image.loading = 'lazy';
      open.append(image);
      const caption = document.createElement('figcaption'); caption.textContent = item.title || 'MaskSMP in-game';
      figure.append(open, caption); grid.append(figure);
    });
    return photos;
  }
  function initLightbox(photos) {
    const modal = document.getElementById('image-lightbox');
    if (!modal) return;
    const image = document.getElementById('lightbox-image');
    const title = document.getElementById('lightbox-title');
    const count = document.getElementById('lightbox-count');
    const closeButton = document.getElementById('lightbox-close');
    const prevButton = document.getElementById('lightbox-prev');
    const nextButton = document.getElementById('lightbox-next');
    let current = 0, opener = null;
    const close = () => { modal.hidden = true; document.body.classList.remove('lightbox-open'); if (opener && opener.focus) opener.focus(); };
    const show = (index) => {
      if (!photos.length) return;
      current = (index + photos.length) % photos.length;
      const photo = photos[current]; image.src = photo.src; image.alt = String(photo.title || 'MaskSMP screenshot'); title.textContent = photo.title || 'MaskSMP in-game'; count.textContent = `${current + 1} / ${photos.length}`;
      prevButton.hidden = photos.length < 2; nextButton.hidden = photos.length < 2;
    };
    document.getElementById('gallery-grid')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-gallery-index]');
      if (!button) return;
      opener = button; show(Number(button.dataset.galleryIndex)); modal.hidden = false; document.body.classList.add('lightbox-open'); closeButton.focus();
    });
    closeButton?.addEventListener('click', close);
    prevButton?.addEventListener('click', () => show(current - 1));
    nextButton?.addEventListener('click', () => show(current + 1));
    modal.addEventListener('click', event => { if (event.target === modal) close(); });
    document.addEventListener('keydown', event => {
      if (modal.hidden) return;
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowLeft' && photos.length > 1) show(current - 1);
      else if (event.key === 'ArrowRight' && photos.length > 1) show(current + 1);
    });
  }
  function validAsset(asset) { return Boolean(asset && typeof asset === 'object' && (safeFilePath(asset.downloadUrl) || safeUrl(asset.downloadUrl) || safeFileData(asset.fileData))); }
  function assetUrl(asset) { return safeFilePath(asset?.downloadUrl) || safeUrl(asset?.downloadUrl) || (safeFileData(asset?.fileData) ? asset.fileData : ''); }
  function setupAssetSelector({ assets, selectId, metaId, downloadId, emptyLabel, buttonLabel, extraInfo }) {
    const select = document.getElementById(selectId), meta = document.getElementById(metaId), button = document.getElementById(downloadId);
    if (!select || !meta || !button) return;
    const valid = assets.filter(validAsset); let selectedAsset = null;
    const downloadSelected = async () => {
      if (!selectedAsset) return;
      const fileName = selectedAsset.fileName || (selectId === 'plugin-version-select' ? 'MaskSMP.jar' : 'MaskSMP-resourcepack.zip');
      const localPath = safeFilePath(selectedAsset.downloadUrl);
      if (localPath) {
        const link = document.createElement('a');
        link.href = localPath; link.download = fileName; link.rel = 'noopener';
        document.body.append(link); link.click(); link.remove();
        return;
      }
      if (safeFileData(selectedAsset.fileData)) {
        try {
          const response = await fetch(selectedAsset.fileData);
          if (!response.ok) throw new Error('Embedded file could not be read');
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = objectUrl; link.download = fileName; link.rel = 'noopener';
          document.body.append(link); link.click(); link.remove();
          setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
        } catch (error) {
          meta.textContent = 'Download failed. Publish site-config.json again and check that the selected file is included.';
        }
        return;
      }
      const href = safeUrl(selectedAsset.downloadUrl);
      if (href) window.open(href, '_blank', 'noopener,noreferrer');
    };
    button.addEventListener('click', async event => {
      if (!selectedAsset) return;
      event.preventDefault();
      if (safeFileData(selectedAsset.fileData) || safeFilePath(selectedAsset.downloadUrl) || safeUrl(selectedAsset.downloadUrl)) {
        button.setAttribute('aria-busy','true');
        try { await downloadSelected(); } finally { button.removeAttribute('aria-busy'); }
      }
    });
    select.replaceChildren();
    if (!valid.length) { const option = document.createElement('option'); option.value = ''; option.textContent = emptyLabel; select.append(option); select.disabled = true; button.hidden = true; meta.textContent = extraInfo; return; }
    select.disabled = false;
    valid.forEach((asset, index) => {
      const option = document.createElement('option'); option.value = String(index);
      const label = selectId === 'resource-pack-select' ? `${asset.name || 'Resource pack'}${asset.version ? ` · v${asset.version}` : ''}` : (asset.version ? `v${asset.version}` : (asset.name || asset.fileName || `File ${index + 1}`));
      option.textContent = `${label}${asset.minecraftVersion ? ` · Minecraft ${asset.minecraftVersion}` : ''}`; select.append(option);
    });
    const update = () => {
      selectedAsset = valid[Number(select.value)] || valid[0]; const href = assetUrl(selectedAsset);
      if (!href) { button.hidden = true; meta.textContent = 'No valid download link was found.'; return; }
      const embedded = safeFileData(selectedAsset.fileData), localPath = safeFilePath(selectedAsset.downloadUrl), external = safeUrl(selectedAsset.downloadUrl);
      button.href = (embedded || localPath) ? '#' : (external || '#'); button.hidden = false;
      button.removeAttribute('target'); button.removeAttribute('rel');
      if (embedded || localPath) button.download = selectedAsset.fileName || (selectId === 'plugin-version-select' ? 'MaskSMP.jar' : 'MaskSMP-resourcepack.zip');
      else button.removeAttribute('download');
      const notes = [selectedAsset.minecraftVersion ? `Minecraft ${selectedAsset.minecraftVersion}` : '', selectedAsset.fileName || '', selectedAsset.notes || ''].filter(Boolean);
      meta.textContent = notes.length ? notes.join(' · ') : 'Download is available.';
    };
    select.addEventListener('change', update); update();
  }
  function renderDownloads(config) {
    // Files are downloaded directly from the published site configuration; no Modrinth redirect is used.
    setupAssetSelector({ assets: config.pluginVersions, selectId: 'plugin-version-select', metaId: 'plugin-version-meta', downloadId: 'selected-plugin-download', emptyLabel: 'No versions have been configured yet', buttonLabel: config.pluginDownloadButtonText || 'Download selected version', extraInfo: 'Add plugin versions in the admin panel.' });
    setupAssetSelector({ assets: config.resourcePacks, selectId: 'resource-pack-select', metaId: 'resource-pack-meta', downloadId: 'selected-pack-download', emptyLabel: 'No resource packs have been configured yet', buttonLabel: config.packDownloadButtonText || 'Download resource pack', extraInfo: 'Add resource packs in the admin panel.' });
  }
  function initNav() {
    const toggle = document.querySelector('.menu-toggle'), nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded',String(open)); toggle.textContent = open ? '×' : '☰'; });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.textContent = '☰'; }));
  }
  document.addEventListener('DOMContentLoaded', async () => {
    initNav(); const year = document.getElementById('year'); if (year) year.textContent = String(new Date().getFullYear());
    const config = await getConfig(); setText(config);
    if (document.body.classList.contains('mask-system-page')) return;
    const photos = renderGallery(config); initLightbox(photos);
    if (document.body.classList.contains('downloads-page')) renderDownloads(config);
  });
})();

(() => {
  'use strict';
  const STORAGE_KEY = 'masksmp-site-config-v1';
  const DB_NAME = 'masksmp-site-db';
  const DB_STORE = 'settings';
  const fallback = {"siteName":"MaskSMP","downloadCounterNamespace":"masksmp-official-site-2026","heroEyebrow":"MINECRAFT PLUGIN","heroTitle":"Mask","heroAccent":"SMP","heroDescription":"Bring unique masks, distinctive abilities, and an upgrade system to your Minecraft server.","serverIp":"","minecraftVersion":"Not set yet","discordUrl":"","downloadUrl":"","downloadLabel":"Download the plugin","pluginVersion":"Not set yet","pluginDescription":"Bring the MaskSMP experience to your server.","contactUrl":"","gallery":[],"faqItems":[],"textOverrides":{},"trailerVideoUrl":"","trailerComingSoon":false,"logoTheme":"purple","modrinthUrl":"","pluginVersions":[],"resourcePacks":[],"navHomeText":"Home","navMasksText":"Masks","navDownloadsText":"Downloads","navFaqText":"FAQ","navFeaturesText":"Features","navGalleryText":"Gallery","navPluginText":"Download plugin","heroDownloadText":"Download plugin","heroMasksText":"Explore the masks","heroMetaOne":"16 mask types","heroMetaTwo":"6 upgrade tiers","heroMetaThree":"Unique abilities","trustOne":"BUILT FOR MINECRAFT SERVERS","trustTwo":"MASK COLLECTION","trustThree":"PROGRESSION SYSTEM","trustFour":"YOUR PLAYSTYLE","featuresEyebrow":"MAKE EVERY MASK UNIQUE","featuresTitleOne":"A new way","featuresTitleTwo":"to play.","featuresIntro":"Give players a reason to explore, upgrade, and find their own style. MaskSMP revolves around different masks and their abilities.","featureOneTitle":"Unique masks","featureOneText":"Explore a collection featuring Dragon, Flame, Shadow, Storm, Ocean, Galaxy, and more.","featureOneLink":"Explore the collection","featureTwoTitle":"Impactful abilities","featureTwoText":"Give every mask a distinct playstyle, from powerful attacks to tactical abilities.","featureTwoLink":"See examples","featureThreeTitle":"Upgrade your mask","featureThreeText":"Progress through six tiers and let players work toward their next upgrade with /mask upgrade.","featureThreeLink":"Plugin details","maskPreviewEyebrow":"FIND YOUR PLAYSTYLE","maskPreviewTitle":"Which mask fits your playstyle?","maskPreviewLink":"All 16 masks","galleryEyebrow":"IN-GAME GALLERY","galleryTitle":"From your server.","galleryIntro":"Screenshots you add through the admin panel will appear here after you save and publish your changes.","galleryEmptyTitle":"Your screenshots will appear here","galleryEmptyText":"Open the admin panel to add images.","pluginCtaEyebrow":"READY TO UPGRADE YOUR SERVER?","footerTagline":"Made for players who want to write their own story.","pluginInfoDownloadText":"Download plugin","downloadsEyebrow":"DOWNLOADS / RELEASES","downloadsTitle":"Everything for your","downloadsTitleAccent":"Minecraft server.","downloadsIntro":"Choose a plugin release and its matching resource pack. Each download has its own version selector.","pluginCardKicker":"01 / PLUGIN RELEASES","pluginCardTitle":"MaskSMP Plugin","pluginCardDescription":"Choose the plugin release that matches your Minecraft server.","pluginSelectLabel":"Select plugin version","pluginDownloadButtonText":"Download plugin","packCardKicker":"02 / RESOURCE PACKS","packCardTitle":"Resource Pack","packCardDescription":"Choose the matching pack for your selected Minecraft version.","packSelectLabel":"Select resource pack","packDownloadButtonText":"Download resource pack","modrinthEyebrow":"ALSO AVAILABLE ON MODRINTH","modrinthTitle":"Follow the official release page.","modrinthDescription":"The Modrinth button takes you to the project page where you publish your plugin.","masksPageTitle":"Choose your mask.","masksPageIntro":"Explore the interactive 3D mask, select a type at the bottom, and discover its abilities and upgrade tiers. Drag the mask to rotate it.","galleryLightboxCloseText":"Close"};
  const safeUrl = (value) => {
    if (typeof value !== 'string') return '';
    const text = value.trim();
    if (/^https:\/\//i.test(text)) return text;
    if (/^http:\/\//i.test(text) && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) return text;
    // Allow a bundled, same-site asset URL (portable across GitHub Pages/custom domains).
    if (/^(?:\.\/)?assets\/[A-Za-z0-9_./-]+$/i.test(text) && !text.split('/').includes('..')) return text;
    return '';
  };
  const safeFileData = (value) => typeof value === 'string' && /^data:(application\/(java-archive|octet-stream|zip|x-zip-compressed)|application\/vnd\.minecraft\.resource-pack);base64,/i.test(value);
  const normalise = (value) => {
    const object = value && typeof value === 'object' ? value : {};
    return { ...fallback, ...object,
      gallery: Array.isArray(object.gallery) ? object.gallery : [],
      customMasks: Array.isArray(object.customMasks) ? object.customMasks : [],
      faqItems: Array.isArray(object.faqItems) ? object.faqItems.filter(item => item && typeof item.question === 'string' && typeof item.answer === 'string').map(item => ({ ...item, linkUrl: String(item.linkUrl || ''), linkText: String(item.linkText || ''), videoUrl: String(item.videoUrl || '') })) : [],
      textOverrides: object.textOverrides && typeof object.textOverrides === 'object' && !Array.isArray(object.textOverrides) ? object.textOverrides : {},
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
    let remote = {};
    try { const response = await fetch('site-config.json', { cache: 'no-store' }); if (response.ok) remote = await response.json(); } catch (error) { /* local preview may use defaults */ }
    let local = {};
    try { local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (error) { local = {}; }
    try { const saved = await dbGet('siteConfig'); if (saved && typeof saved === 'object') local = { ...local, ...saved }; } catch (error) { /* keep localStorage/remote config */ }
    const combined = { ...remote, ...local };
    if (!Array.isArray(local.gallery)) combined.gallery = Array.isArray(remote.gallery) ? remote.gallery : [];
    const mergeAssets = (localItems, remoteItems) => {
      if (!Array.isArray(localItems)) return Array.isArray(remoteItems) ? remoteItems : [];
      const source = Array.isArray(remoteItems) ? remoteItems : [];
      return localItems.map((item) => {
        const published = source.find((candidate) => candidate && item && candidate.id && candidate.id === item.id);
        return published ? { ...published, ...item, fileData: item.fileData || published.fileData || '' } : item;
      });
    };
    combined.pluginVersions = mergeAssets(local.pluginVersions, remote.pluginVersions);
    combined.resourcePacks = mergeAssets(local.resourcePacks, remote.resourcePacks);
    // Compact browser drafts keep custom-mask metadata only; merge model geometry and textures back from the published config.
    if (Array.isArray(local.customMasks) && local.customMasks.length) {
      const publishedMasks = Array.isArray(remote.customMasks) ? remote.customMasks : [];
      combined.customMasks = local.customMasks.map((draft) => {
        const published = publishedMasks.find((item) => item && draft && item.id === draft.id);
        if (!published) return draft;
        return { ...published, ...draft,
          geometry: Array.isArray(draft.geometry) && draft.geometry.length ? draft.geometry : published.geometry,
          textureData: draft.textureData || published.textureData,
          tierTextures: Array.isArray(draft.tierTextures) && draft.tierTextures.some(Boolean) ? draft.tierTextures.map((value, i) => value || (published.tierTextures || [])[i] || '') : published.tierTextures };
      }).filter((item) => Array.isArray(item.geometry) && item.textureData);
    } else { combined.customMasks = Array.isArray(remote.customMasks) ? remote.customMasks : []; }
    const publicCounterNamespace = String(combined.downloadCounterNamespace || '').trim();
    if (/^[A-Za-z0-9_.-]{3,64}$/.test(publicCounterNamespace)) DOWNLOAD_COUNTER_NAMESPACE = publicCounterNamespace;
    return normalise(combined);
  }
  function renderTrailer(config) {
    const container = document.getElementById('trailer-player');
    if (!container) return;
    container.replaceChildren();
    const raw = String(config.trailerVideoUrl || '').trim();
    const urlText = safeUrl(raw);
    const showEmpty = (message, heading = 'Your MaskSMP trailer') => {
      const empty = document.createElement('div'); empty.className = 'trailer-empty';
      const icon = document.createElement('span'); icon.className = 'trailer-play-icon'; icon.setAttribute('aria-hidden', 'true'); icon.textContent = '▶';
      const title = document.createElement('strong'); title.textContent = heading;
      const note = document.createElement('span'); note.textContent = message;
      empty.append(icon, title, note); container.append(empty);
    };
    const comingSoon = config.trailerComingSoon === true || String(config.trailerComingSoon || '').toLowerCase() === 'true' || String(config.trailerComingSoon || '').toLowerCase() === 'on';
    container.classList.toggle('is-coming-soon', comingSoon);
    if (comingSoon) { showEmpty('The official MaskSMP trailer will be here soon.', 'Coming soon'); return; }
    if (!urlText) { showEmpty('Add a YouTube link in the admin panel to show your video here.'); return; }
    let url;
    try { url = new URL(urlText, window.location.href); } catch (_) { showEmpty('Add a valid YouTube or direct video URL in the admin panel.'); return; }
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    let videoId = '';
    if (host === 'youtu.be') videoId = url.pathname.split('/').filter(Boolean)[0] || '';
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      videoId = url.searchParams.get('v') || (url.pathname.match(/^\/(?:embed|shorts|live)\/([A-Za-z0-9_-]+)/) || [])[1] || '';
    }
    if (/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
      const frame = document.createElement('iframe'); frame.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?rel=0';
      frame.title = 'MaskSMP trailer'; frame.loading = 'lazy'; frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin'; container.append(frame); return;
    }
    if (/\.(?:mp4|webm|ogg)$/i.test(url.pathname)) {
      const video = document.createElement('video'); video.controls = true; video.preload = 'metadata'; video.playsInline = true;
      const source = document.createElement('source'); source.src = url.href;
      source.type = /\.webm$/i.test(url.pathname) ? 'video/webm' : /\.ogg$/i.test(url.pathname) ? 'video/ogg' : 'video/mp4';
      video.append(source); container.append(video); return;
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const videoIdVimeo = (url.pathname.match(/(?:^|\/)(\d+)(?:\/|$)/) || [])[1] || '';
      if (videoIdVimeo) { const frame = document.createElement('iframe'); frame.src = 'https://player.vimeo.com/video/' + videoIdVimeo; frame.title = 'MaskSMP trailer'; frame.loading = 'lazy'; frame.allow = 'autoplay; fullscreen; picture-in-picture'; frame.allowFullscreen = true; frame.referrerPolicy = 'strict-origin-when-cross-origin'; container.append(frame); return; }
    }
    showEmpty('Use a YouTube video link or a direct .mp4, .webm, or .ogg URL.');
  }

  function createFaqVideo(rawUrl, question) {
    const cleaned = safeUrl(String(rawUrl || '').trim());
    if (!cleaned) return null;
    let url;
    try { url = new URL(cleaned, window.location.href); } catch (_) { return null; }
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    let source = '';
    let kind = '';
    let type = '';
    let id = '';
    if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] || '';
    if (['youtube.com','m.youtube.com','youtube-nocookie.com'].includes(host)) id = url.searchParams.get('v') || (url.pathname.match(/^\/(?:embed|shorts|live)\/([A-Za-z0-9_-]+)/) || [])[1] || '';
    if (/^[A-Za-z0-9_-]{11}$/.test(id)) { kind = 'iframe'; source = 'https://www.youtube-nocookie.com/embed/' + id + '?rel=0'; }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const vimeoId = (url.pathname.match(/(?:^|\/)(\d+)(?:\/|$)/) || [])[1] || '';
      if (vimeoId) { kind = 'iframe'; source = 'https://player.vimeo.com/video/' + vimeoId; }
    }
    if (!kind && /\.(?:mp4|webm|ogg)$/i.test(url.pathname)) {
      kind = 'video'; source = url.href;
      type = /\.webm$/i.test(url.pathname) ? 'video/webm' : /\.ogg$/i.test(url.pathname) ? 'video/ogg' : 'video/mp4';
    }
    if (!kind) return null;
    const wrap = document.createElement('div'); wrap.className = 'faq-video-wrap';
    if (kind === 'iframe') {
      const frame = document.createElement('iframe'); frame.src = source; frame.title = 'Video answer: ' + question;
      frame.loading = 'lazy'; frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true; frame.referrerPolicy = 'strict-origin-when-cross-origin'; wrap.append(frame);
    } else {
      const video = document.createElement('video'); video.controls = true; video.preload = 'metadata'; video.playsInline = true;
      const sourceNode = document.createElement('source'); sourceNode.src = source; sourceNode.type = type; video.append(sourceNode); wrap.append(video);
    }
    return wrap;
  }
  function renderFAQ(config) {
    const list = document.getElementById('faq-list');
    const empty = document.getElementById('faq-empty');
    if (!list || !empty) return;
    list.replaceChildren();
    const items = (Array.isArray(config.faqItems) ? config.faqItems : []).filter(item => item && String(item.question || '').trim() && String(item.answer || '').trim());
    empty.hidden = items.length > 0;
    items.forEach((item, index) => {
      const details = document.createElement('details'); details.className = 'faq-item';
      const summary = document.createElement('summary'); summary.className = 'faq-question';
      const number = document.createElement('span'); number.className = 'faq-number'; number.textContent = String(index + 1).padStart(2, '0');
      const question = document.createElement('span'); question.className = 'faq-question-text'; question.textContent = item.question;
      const toggle = document.createElement('span'); toggle.className = 'faq-toggle'; toggle.setAttribute('aria-hidden', 'true'); toggle.textContent = '+';
      summary.append(number, question, toggle);
      const answer = document.createElement('div'); answer.className = 'faq-answer';
      const paragraph = document.createElement('p'); paragraph.textContent = item.answer; answer.append(paragraph);
      const linkUrl = safeUrl(String(item.linkUrl || '').trim());
      if (linkUrl) {
        const relatedLink = document.createElement('a'); relatedLink.className = 'faq-answer-link'; relatedLink.href = linkUrl;
        relatedLink.textContent = String(item.linkText || '').trim() || 'Read more';
        if (/^https:\/\//i.test(linkUrl)) { relatedLink.target = '_blank'; relatedLink.rel = 'noopener noreferrer'; }
        const arrow = document.createElement('span'); arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = '↗'; relatedLink.append(' ', arrow); answer.append(relatedLink);
      }
      const video = createFaqVideo(item.videoUrl, item.question); if (video) answer.append(video);
      details.append(summary, answer);
      details.addEventListener('toggle', () => { toggle.textContent = details.open ? '−' : '+'; });
      list.append(details);
    });
  }

  function applyBranding(config) {
    const theme = String(config.logoTheme || 'purple').toLowerCase() === 'yellow' ? 'yellow' : 'purple';
    const wideLogo = theme === 'yellow' ? 'assets/masksmp-logo-wide.png' : 'assets/masksmp-logo-wide-purple.png';
    const faviconIco = theme === 'yellow' ? 'masksmp-favicon.ico?v=8' : 'masksmp-favicon-purple.ico?v=13';
    const faviconPng = theme === 'yellow' ? 'masksmp-favicon.png?v=8' : 'masksmp-favicon-purple.png?v=13';
    document.querySelectorAll('.site-nav .logo img, .footer-brand img').forEach((image) => { image.src = wideLogo; });
    document.querySelectorAll('link[rel="icon"][sizes="any"]').forEach((link) => { link.href = faviconIco; });
    document.querySelectorAll('link[rel="icon"][type="image/png"], link[rel="apple-touch-icon"]').forEach((link) => { link.href = faviconPng; });
    // mask-visuals.js exposes a shallow copy of its gallery list; the first entry is the logo tile.
    if (Array.isArray(window.__G0) && window.__G0[0] && window.__G0[0].t === 'Mask SMP') { window.__G0[0].s = wideLogo; const galleryLogo = document.querySelector('#ga button[data-g="0"] img'); if (galleryLogo) galleryLogo.src = wideLogo; }
    document.documentElement.dataset.logoTheme = theme;
  }

  function setText(config) {
    applyBranding(config);
    document.querySelectorAll('[data-config]').forEach((node) => {
      const key = node.getAttribute('data-config');
      if (Object.prototype.hasOwnProperty.call(config, key) && config[key] !== null && typeof config[key] !== 'object') node.textContent = String(config[key]);
    });
    const overrides = config.textOverrides && typeof config.textOverrides === 'object' ? config.textOverrides : {};
    document.querySelectorAll('[data-site-text]').forEach((node) => {
      const key = node.getAttribute('data-site-text');
      if (Object.prototype.hasOwnProperty.call(overrides, key) && typeof overrides[key] === 'string') node.textContent = overrides[key];
    });
    renderTrailer(config);
    renderFAQ(config);
    if (document.body.classList.contains('mask-system-page')) document.title = `${config.siteName || 'MaskSMP'} — Masks`;
else if (document.body.classList.contains('downloads-page')) document.title = `${config.siteName || 'MaskSMP'} — Downloads`;
else if (document.body.classList.contains('page-upgrading')) document.title = `${config.siteName || 'MaskSMP'} — Upgrading`;
else if (document.body.classList.contains('page-gallery')) document.title = `${config.siteName || 'MaskSMP'} — Gallery`;
else if (document.body.classList.contains('page-features')) document.title = `${config.siteName || 'MaskSMP'} — Features`;
else if (document.body.classList.contains('page-faq')) document.title = `${config.siteName || 'MaskSMP'} — FAQ`;
else if (document.body.classList.contains('page-license')) document.title = `${config.siteName || 'MaskSMP'} — License`;
else document.title = `${config.siteName || 'MaskSMP'} — Minecraft plugin`;
    const serverLine = document.getElementById('server-ip-line');
    if (serverLine) serverLine.hidden = !String(config.serverIp || '').trim();
    const contact = document.getElementById('contact-link');
    if (contact) { const href = safeUrl(config.contactUrl); contact.hidden = !href; if (href) contact.href = href; }
    const discord = document.getElementById('discord-link');
    if (discord) { const href = safeUrl(config.discordUrl); discord.hidden = !href; if (href) discord.href = href; }
    const modrinth = document.getElementById('modrinth-link');
    const placeholder = document.getElementById('modrinth-placeholder');
    if (modrinth) { const href = safeUrl(config.modrinthUrl); modrinth.hidden = !href; if (href) modrinth.href = href; if (placeholder) placeholder.hidden = Boolean(href); }
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
    // Keep the original HTML gallery (with its white photo frames) and append
    // any images published from the admin panel using exactly the same visual treatment.
    const grid = document.getElementById('ga');
    if (!grid) return [];
    grid.querySelectorAll('.admin-gallery-photo').forEach(node => node.remove());
    const photos = config.gallery.filter(item => item && typeof item.src === 'string' && (item.src.startsWith('data:image/') || item.src.startsWith('assets/') || /^https:\/\//i.test(item.src)));
    const rotations = [-2.5, 1.8, -1.2, 2.7, -1.8, 1.1, -3, 2.1];
    photos.forEach((item, index) => {
      const open = document.createElement('button');
      open.type = 'button';
      open.className = 'admin-gallery-photo';
      open.dataset.galleryIndex = String(index);
      open.style.setProperty('--r', `${rotations[index % rotations.length]}deg`);
      open.setAttribute('aria-label', `Enlarge image ${index + 1}`);
      const image = document.createElement('img');
      image.src = item.src;
      image.alt = String(item.title || 'MaskSMP screenshot');
      image.loading = 'lazy';
      const caption = document.createElement('span');
      caption.textContent = item.title || 'MaskSMP in-game';
      open.append(image, caption);
      grid.append(open);
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
    document.getElementById('ga')?.addEventListener('click', (event) => {
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
  function validAsset(asset) { return Boolean(asset && typeof asset === 'object' && (safeUrl(asset.downloadUrl) || safeFileData(asset.fileData))); }
  function assetUrl(asset) { return safeFileData(asset?.fileData) ? asset.fileData : safeUrl(asset?.downloadUrl); }
  // Shared counters for static hosting. The old public CounterAPI v1 endpoint was retired.
  const DOWNLOAD_COUNTER_BASE = 'https://abacus.jasoncameron.dev';
  let DOWNLOAD_COUNTER_NAMESPACE = 'masksmp-official-site-2026';
  const DOWNLOAD_COUNTER_KEYS = { plugin: 'plugin-downloads', pack: 'resource-pack-downloads' };
  function counterNode(kind) {
    return document.getElementById(kind === 'plugin' ? 'plugin-download-count' : 'resource-pack-download-count');
  }
  function updateDownloadCounter(kind, value) {
    const node = counterNode(kind);
    if (!node) return;
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0) return;
    const previous = Number(node.dataset.count);
    const count = Number.isFinite(previous) ? Math.max(Math.floor(previous), Math.floor(number)) : Math.floor(number);
    node.dataset.count = String(count);
    node.textContent = count.toLocaleString();
    node.removeAttribute('title');
  }
  function counterUnavailable(kind) {
    const node = counterNode(kind);
    if (!node) return;
    if (Number(node.dataset.count) > 0) return;
    node.textContent = 'Unavailable';
    node.title = 'The shared counter could not be reached. Downloads are not blocked.';
  }
  async function readDownloadCounter(kind) {
    const node = counterNode(kind);
    if (!node) return;
    if (!node.textContent.trim() || /loading|^—$|^-$/.test(node.textContent.trim().toLowerCase())) {
      node.textContent = '0';
      node.dataset.count = '0';
    }
    try {
      const key = DOWNLOAD_COUNTER_KEYS[kind];
      const response = await fetch(`${DOWNLOAD_COUNTER_BASE}/get/${DOWNLOAD_COUNTER_NAMESPACE}/${key}`, { cache: 'no-store', mode: 'cors' });
      if (response.status === 404) { updateDownloadCounter(kind, 0); return; }
      if (!response.ok) throw new Error(`Counter service returned ${response.status}`);
      const result = await response.json();
      if (!Number.isFinite(Number(result.value))) throw new Error('Counter value missing');
      updateDownloadCounter(kind, result.value);
    } catch (error) {
      counterUnavailable(kind);
    }
  }
  async function trackDownload(kind) {
    try {
      const key = DOWNLOAD_COUNTER_KEYS[kind];
      const response = await fetch(`${DOWNLOAD_COUNTER_BASE}/hit/${DOWNLOAD_COUNTER_NAMESPACE}/${key}`, {
        method: 'GET', cache: 'no-store', keepalive: true, mode: 'cors'
      });
      if (!response.ok) throw new Error(`Counter service returned ${response.status}`);
      const result = await response.json();
      if (Number.isFinite(Number(result.value))) updateDownloadCounter(kind, result.value);
      else void readDownloadCounter(kind);
    } catch (error) {
      // Never block the file transfer if the separate counter service is down.
      void readDownloadCounter(kind);
    }
  }
  function showDownloadThanks(kind) {
    const dialog = document.getElementById('download-thanks-dialog');
    const message = document.getElementById('download-thanks-message');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    if (message) message.textContent = kind === 'plugin'
      ? 'Thanks for downloading the MaskSMP plugin! Your download should start shortly. Put the JAR in your server’s plugins folder and restart the server.'
      : 'Thanks for downloading the MaskSMP resource pack! Your download should start shortly. Apply the pack to your Minecraft server to see the custom textures and interface.';
    if (!dialog.open) dialog.showModal();
  }
  function initDownloadThanks() {
    const dialog = document.getElementById('download-thanks-dialog');
    const close = () => { if (dialog && dialog.open) dialog.close(); };
    const closeButton = document.getElementById('download-thanks-close');
    const continueButton = document.getElementById('download-thanks-continue');
    if (closeButton) closeButton.addEventListener('click', close);
    if (continueButton) continueButton.addEventListener('click', close);
    if (dialog) dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }
  function wireAssetDownload(anchor, asset, kind, metaNode) {
    const fallbackName = kind === 'plugin' ? 'MaskSMP.jar' : 'MaskSMP-resourcepack.zip';
    if (safeFileData(asset.fileData)) {
      anchor.href = '#';
      anchor.removeAttribute('target');
      anchor.removeAttribute('rel');
      anchor.removeAttribute('download');
      anchor.addEventListener('click', async event => {
        event.preventDefault();
        if (anchor.getAttribute('aria-busy') === 'true') return;
        anchor.setAttribute('aria-busy', 'true');
        try {
          const response = await fetch(asset.fileData);
          if (!response.ok) throw new Error('File could not be read');
          const blob = await response.blob();
          void trackDownload(kind);
          const objectUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = objectUrl;
          link.download = asset.fileName || fallbackName;
          document.body.append(link);
          link.click();
          link.remove();
          setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
          showDownloadThanks(kind);
        } catch (error) {
          if (metaNode) metaNode.textContent = 'Download failed. Re-export the configuration or use a direct HTTPS download link.';
        } finally {
          anchor.removeAttribute('aria-busy');
        }
      });
    } else {
      const url = safeUrl(asset.downloadUrl);
      anchor.href = url;
      anchor.removeAttribute('download');
      if (url.toLowerCase().startsWith('https://')) {
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      } else {
        anchor.removeAttribute('target');
        anchor.removeAttribute('rel');
        anchor.download = asset.fileName || fallbackName;
      }
      anchor.addEventListener('click', () => {
        void trackDownload(kind);
        window.setTimeout(() => showDownloadThanks(kind), 0);
      });
    }
  }
  function assetSummary(asset, fallbackLabel) {
    return [
      asset.version ? `v${String(asset.version).replace(/^v/i, '')}` : (asset.name || fallbackLabel),
      asset.minecraftVersion ? `Minecraft ${asset.minecraftVersion}` : '',
      asset.fileName || '',
      asset.notes || ''
    ].filter(Boolean);
  }
  function setupAssetMenu({ assets, kind, metaId, downloadId, detailsId, menuId, extraInfo }) {
    const meta = document.getElementById(metaId);
    const button = document.getElementById(downloadId);
    const details = document.getElementById(detailsId);
    const menu = document.getElementById(menuId);
    if (!meta || !button || !details || !menu) return;
    const valid = (Array.isArray(assets) ? assets : []).filter(validAsset);
    const labelSpan = button.querySelector('span');
    menu.replaceChildren();
    if (!valid.length) {
      button.hidden = true;
      details.hidden = true;
      meta.textContent = extraInfo;
      return;
    }
    const latest = valid[0];
    button.hidden = false;
    if (labelSpan) labelSpan.textContent = kind === 'plugin' ? 'Download latest version' : 'Download latest resource pack';
    wireAssetDownload(button, latest, kind, meta);
    meta.textContent = assetSummary(latest, kind === 'plugin' ? 'Latest plugin release' : 'Latest resource pack').join(' · ');

    const older = valid.slice(1);
    details.hidden = older.length === 0;
    older.forEach((asset, index) => {
      const link = document.createElement('a');
      link.className = 'older-release-option';
      link.href = '#';
      const title = document.createElement('span');
      title.className = 'older-release-title';
      title.textContent = asset.version ? `Version ${String(asset.version).replace(/^v/i, '')}` : (asset.name || asset.fileName || `Release ${index + 2}`);
      const description = document.createElement('small');
      description.textContent = [asset.minecraftVersion ? `Minecraft ${asset.minecraftVersion}` : '', asset.fileName || '', asset.notes || ''].filter(Boolean).join(' · ') || 'Download release';
      const arrow = document.createElement('b');
      arrow.setAttribute('aria-hidden', 'true');
      const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); arrowSvg.setAttribute('viewBox', '0 0 24 24'); arrowSvg.setAttribute('aria-hidden', 'true'); arrowSvg.setAttribute('focusable', 'false');
      const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'); arrowPath.setAttribute('d', 'M12 4v15M6 13l6 6 6-6'); arrowSvg.append(arrowPath); arrow.append(arrowSvg);
      link.append(title, description, arrow);
      wireAssetDownload(link, asset, kind, meta);
      menu.append(link);
    });
  }
  function renderDownloads(config) {
    // Newest versions are inserted first by the admin panel. Keep that release
    // as the primary one-click download and place older releases in an expandable list.
    setupAssetMenu({ assets: config.pluginVersions, kind: 'plugin', metaId: 'plugin-version-meta', downloadId: 'selected-plugin-download', detailsId: 'plugin-older-details', menuId: 'plugin-older-releases', extraInfo: 'Add plugin versions in the admin panel.' });
    setupAssetMenu({ assets: config.resourcePacks, kind: 'pack', metaId: 'resource-pack-meta', downloadId: 'selected-pack-download', detailsId: 'pack-older-details', menuId: 'pack-older-releases', extraInfo: 'Add resource packs in the admin panel.' });
  }
  function initNav() {
    const toggle = document.querySelector('.menu-toggle'), nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      toggle.textContent = '☰';
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      toggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });
  }
  document.addEventListener('DOMContentLoaded', async () => {
    initNav(); const year = document.getElementById('year'); if (year) year.textContent = String(new Date().getFullYear());
    const config = await getConfig(); setText(config);
    window.MASKSMP_SITE_CONFIG = config;
    window.dispatchEvent(new CustomEvent('masksmp:config-ready', { detail: config }));
    if (document.body.classList.contains('mask-system-page')) return;
    const photos = renderGallery(config); initLightbox(photos);
    if (document.body.classList.contains('downloads-page')) {
      initDownloadThanks();
      renderDownloads(config);
      readDownloadCounter('plugin');
      readDownloadCounter('pack');
    }
  });
})();

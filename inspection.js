async function loadManifest() {
  const response = await fetch('/assets-manifest.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`manifest fetch failed: ${response.status}`);
  }
  return response.json();
}

function byPath(assets, path) {
  return assets.find((asset) => asset.path === path) || null;
}

function categoryCounts(assets) {
  return assets.reduce((acc, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + 1;
    return acc;
  }, {});
}

function statusCounts(assets) {
  return assets.reduce((acc, asset) => {
    acc[asset.status] = (acc[asset.status] || 0) + 1;
    return acc;
  }, {});
}

function assetCard(asset, options = {}) {
  const title = options.title || asset.id;
  const description = options.description || '';
  const previewPath = options.previewPath || asset.path;
  const previewClass = options.previewClass || '';
  const note = options.note || '';
  const badge = asset.status || 'draft';
  return `
    <article class="card">
      <div class="chip-row">
        <span class="badge ${badge}">${badge}</span>
        <span class="mono">${asset.format}</span>
      </div>
      <h3>${title}</h3>
      ${description ? `<p>${description}</p>` : ''}
      <div class="preview ${previewClass}">
        <img src="${previewPath}" alt="${title}">
      </div>
      <div class="meta">
        <div class="mono">id: ${asset.id}</div>
        <div class="mono">path: ${asset.path}</div>
        <div class="mono">source: ${asset.source_ref}</div>
        ${note ? `<div class="mono">${note}</div>` : ''}
      </div>
    </article>
  `;
}

function fileCard(asset, title, description) {
  return `
    <article class="card">
      <div class="chip-row">
        <span class="badge ${asset.status}">${asset.status}</span>
        <span class="mono">${asset.format}</span>
      </div>
      <h3>${title}</h3>
      <p>${description}</p>
      <div class="meta">
        <div class="mono">id: ${asset.id}</div>
        <div class="mono">path: ${asset.path}</div>
        <div class="mono">normalized_from: ${asset.normalized_from}</div>
      </div>
    </article>
  `;
}

function renderHome(manifest, assets) {
  const counts = categoryCounts(assets);
  const statuses = statusCounts(assets);
  const baselineStatus = manifest.status || 'approved';
  document.getElementById('summary-metrics').innerHTML = `
    <article class="metric-card"><strong>${assets.length}</strong><span>total assets</span></article>
    <article class="metric-card"><strong>${statuses.approved || 0}</strong><span>approved entries</span></article>
    <article class="metric-card"><strong>${statuses.draft || 0}</strong><span>draft entries</span></article>
  `;
  document.getElementById('home-categories').innerHTML = [
    ['brand', '/brand/', 'logo · favicon · app icon · ci board'],
    ['og-social', '/og-social/', 'global/site OG previews'],
    ['footer', '/footer/', 'attribution logos'],
    ['icons', '/icons/', 'line icon set'],
    ['ui-patterns', '#supporting-assets', 'backgrounds · dividers'],
    ['css', '#supporting-assets', 'design tokens']
  ].map(([key, href, text]) => `
    <article class="card category-card">
      <h3><a href="${href}">${key}</a></h3>
      <p>${text}</p>
      <div class="category-card__meta">
        <span class="mono">entries: ${counts[key] || 0}</span>
        <span class="badge ${baselineStatus}">${baselineStatus}</span>
      </div>
    </article>
  `).join('');

  const featured = [
    [byPath(assets, '/brand/wcamper/logos/wcamper-logo-primary.svg'), 'Primary Logo', '현재 approved baseline primary logo'],
    [byPath(assets, '/brand/wcamper/ci/wcamper-identity-guidelines-board.png'), 'CI Board', 'brand/ci 페이지와 검수용 보드'],
    [byPath(assets, '/brand/wcamper/app-icons/wcamper-app-icon-512.png'), 'App Icon 512', '앱/웹앱 대표 아이콘'],
    [byPath(assets, '/brand/wcamper/og/wcamper-og-default-1200x630.webp'), 'OG Default', '대표 OG 기본안']
  ].filter(([asset]) => asset);
  document.getElementById('home-featured').innerHTML = featured.map(([asset, title, description]) => assetCard(asset, { title, description, previewClass: asset.path.includes('/og/') ? 'preview--og' : '' })).join('');

  const supportAssets = [
    [byPath(assets, '/ui-patterns/backgrounds/wcamper-canvas-subtle.svg'), 'Canvas Background Pattern', '배경 패턴 approved baseline'],
    [byPath(assets, '/ui-patterns/dividers/wcamper-divider-dashed.svg'), 'Divider Pattern', '분리선 패턴 approved baseline'],
    [byPath(assets, '/css/wcamper-tokens.css'), 'CSS Tokens', '웹 공통 토큰 파일'],
    [byPath(assets, '/css/wcamper-tokens.json'), 'JSON Tokens', '디자인 핸드오프용 토큰 파일']
  ].filter(([asset]) => asset);
  document.getElementById('supporting-assets-grid').innerHTML = supportAssets.map(([asset, title, description]) => {
    if (asset.format === 'css' || asset.format === 'json') {
      return fileCard(asset, title, description);
    }
    return assetCard(asset, { title, description });
  }).join('');
}

function renderBrand(assets) {
  const featured = [
    [byPath(assets, '/brand/wcamper/logos/wcamper-logo-primary.svg'), 'Primary Logo', '대표 브랜드 표기에 쓰는 기본 조합'],
    [byPath(assets, '/brand/wcamper/logos/wcamper-logo-primary-on-dark.svg'), 'Logo on Dark', '어두운 배경 대응 버전', 'preview--dark'],
    [byPath(assets, '/brand/wcamper/logos/wcamper-symbol-card.svg'), 'Symbol Card', '심볼 단독 카드형'],
    [byPath(assets, '/brand/wcamper/logos/wcamper-wordmark.svg'), 'Wordmark', '워드마크 단독 사용'],
    [byPath(assets, '/brand/wcamper/favicon/favicon-32.png'), 'Favicon 32', '브라우저 탭/shortcut 기준'],
    [byPath(assets, '/brand/wcamper/app-icons/wcamper-app-icon-512.png'), 'App Icon 512', '앱/웹앱 기준 아이콘'],
    [byPath(assets, '/brand/wcamper/ci/wcamper-identity-guidelines-board.png'), 'CI Board', '브랜드 체계와 사용 원칙 보드'],
    [byPath(assets, '/brand/wcamper/og/wcamper-og-default-1200x630.webp'), 'Brand OG Default', '공통 대표 OG 이미지', 'preview--og']
  ].filter(([asset]) => asset);
  document.getElementById('brand-featured-grid').innerHTML = featured.map(([asset, title, description, previewClass]) => assetCard(asset, { title, description, previewClass })).join('');

  const refs = [
    ['CI board', '/brand/wcamper/ci/wcamper-identity-guidelines-board.png'],
    ['Primary logo', '/brand/wcamper/logos/wcamper-logo-primary.svg'],
    ['Primary logo PNG', '/brand/wcamper/logos/wcamper-logo-primary.png'],
    ['Favicon ICO', '/brand/wcamper/favicon/favicon.ico'],
    ['App icon 512', '/brand/wcamper/app-icons/wcamper-app-icon-512.png'],
    ['OG default', '/brand/wcamper/og/wcamper-og-default-1200x630.webp'],
    ['CSS tokens', '/css/wcamper-tokens.css'],
    ['JSON tokens', '/css/wcamper-tokens.json']
  ];
  document.getElementById('brand-reference-list').innerHTML = refs.map(([label, path]) => `
    <article class="card">
      <strong>${label}</strong>
      <div class="mono">${path}</div>
    </article>
  `).join('');
}

function renderFooter(assets) {
  const footerAssets = assets.filter((asset) => asset.category === 'footer').sort((a, b) => a.path.localeCompare(b.path));
  document.getElementById('footer-asset-grid').innerHTML = footerAssets.map((asset) => assetCard(asset, {
    title: asset.path.split('/').slice(-1)[0],
    description: asset.path.includes('light') ? 'dark surface 대응용 light variant' : '기본 attribution variant',
    previewClass: asset.path.includes('light') ? 'preview--dark' : ''
  })).join('');

  const dreamDefault = byPath(assets, '/footer/dreamlabs/dreamlabs-logo-default.svg');
  const dreamLight = byPath(assets, '/footer/dreamlabs/dreamlabs-logo-light.svg');
  const campDefault = byPath(assets, '/footer/camprogrammer/camprogrammer-logo-default.svg');
  const campLight = byPath(assets, '/footer/camprogrammer/camprogrammer-logo-light.svg');
  document.getElementById('footer-surface-preview').innerHTML = `
    <div class="surface surface--light">
      <strong>Light surface example</strong>
      <div class="surface__logos">
        <img src="${dreamDefault.path}" alt="DreamLabs default logo">
        <img src="${campDefault.path}" alt="Camprogrammer default logo">
      </div>
    </div>
    <div class="surface surface--dark">
      <strong>Dark surface example</strong>
      <div class="surface__logos">
        <img class="surface-light-bg" src="${dreamLight.path}" alt="DreamLabs light logo">
        <img class="surface-light-bg" src="${campLight.path}" alt="Camprogrammer light logo">
      </div>
    </div>
  `;
}

function renderOg(assets) {
  const order = [
    '/brand/wcamper/og/wcamper-og-default-1200x630.webp',
    '/brand/wcamper/og/og-global-default-1200x630.webp',
    '/brand/wcamper/og/og-www-default-1200x630.png',
    '/brand/wcamper/og/og-guide-default-1200x630.png',
    '/brand/wcamper/og/og-spot-default-1200x630.png',
    '/brand/wcamper/og/og-magazine-default-1200x630.png',
    '/brand/wcamper/og/og-partners-default-1200x630.png'
  ];
  const cards = order.map((path) => byPath(assets, path)).filter(Boolean);
  document.getElementById('og-grid').innerHTML = cards.map((asset) => assetCard(asset, {
    title: asset.path.split('/').slice(-1)[0],
    description: '1200x630 approved preview',
    previewClass: 'preview--og'
  })).join('');
}

function renderIcons(assets) {
  const icons = assets.filter((asset) => asset.category === 'icons' && asset.format === 'svg').sort((a, b) => a.path.localeCompare(b.path));
  document.getElementById('icon-grid').innerHTML = icons.map((asset) => `
    <article class="card icon-card">
      <span class="badge ${asset.status}">${asset.status}</span>
      <h3>${asset.path.split('/').slice(-1)[0].replace('.svg', '')}</h3>
      <div class="preview">
        <img src="${asset.path}" alt="${asset.id}">
      </div>
      <div class="meta">
        <div class="mono">id: ${asset.id}</div>
        <div class="mono">path: ${asset.path}</div>
      </div>
    </article>
  `).join('');
}

function renderError(error) {
  const target = document.getElementById('page-error');
  if (!target) return;
  target.innerHTML = `<article class="callout error-card"><strong>manifest load failed</strong><p>${String(error.message || error)}</p></article>`;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const manifest = await loadManifest();
    const assets = manifest.assets || [];
    const page = document.body.dataset.page;
    if (page === 'home') renderHome(manifest, assets);
    if (page === 'brand') renderBrand(assets);
    if (page === 'footer') renderFooter(assets);
    if (page === 'og-social') renderOg(assets);
    if (page === 'icons') renderIcons(assets);
  } catch (error) {
    renderError(error);
  }
});

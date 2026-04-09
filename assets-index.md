# Asset Index

## Asset Categories
- `brand`: 브랜드 로고, favicon, app icon, 브랜드 OG
- `footer`: footer attribution 고정 로고
- `og-social`: 공통 OG 템플릿 및 사이트별 파생 이미지
- `icons`: 라인/상태/맵 아이콘
- `ui-patterns`: 텍스처, 배경, 구분선

## P0 Assets (Bootstrap Priority)
- `brand.wcamper.logo.primary.svg`
- `brand.wcamper.favicon.default.ico`
- `brand.wcamper.appicon.512.png`
- `brand.wcamper.og.default.1200x630.webp`
- `footer.dreamlabs.logo.default.svg`
- `footer.camprogrammer.logo.default.svg`
- `og.global.default.1200x630.webp`
- `icons.line.nav.menu.svg`
- `icons.line.action.external-link.svg`
- `icons.line.status.info.svg`
- `icons.line.status.warning.svg`
- `icons.line.status.error.svg`

## P1 Assets (Planned Next)
- `og.www.default.1200x630.webp`
- `og.guide.default.1200x630.webp`
- `og.spot.default.1200x630.webp`
- `og.magazine.default.1200x630.webp`
- `ui.background.default.pattern.webp`
- `icons.map.pin.default.svg`

## Registry Rules
- 단일 기준 registry는 `assets-manifest.json`이다.
- 단, `assets-manifest.json`은 runtime-safe 실파일 자산만 포함한다.
- 미제공/placeholder 자산은 카테고리 경로의 `*.placeholder.md` 또는 `README-placeholder.md`로 관리한다.
- Asset ID는 dot-path 규칙을 사용한다.
- 실제 파일명은 kebab-case를 사용한다.
- 상태값은 `planned`, `draft`, `approved`, `deprecated`, `do-not-use`만 사용한다.
- 없는 파일은 manifest에 기재하지 않거나 placeholder임을 명시해야 한다.

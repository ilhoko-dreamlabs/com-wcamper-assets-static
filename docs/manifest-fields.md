# Manifest Fields

`assets-manifest.json`의 각 asset 객체는 아래 필드를 사용한다.

| field | 설명 |
| --- | --- |
| `id` | dot-path 형식의 자산 식별자. 예: `brand.wcamper.logo.primary.svg` |
| `category` | 자산 카테고리. 예: `brand`, `footer`, `og-social`, `icons` |
| `status` | 자산 상태값. `planned`, `draft`, `approved`, `deprecated`, `do-not-use` |
| `version` | 자산 버전. 소비 측 캐시 무효화/추적을 위한 값. 예: `0.1.0-draft` |
| `format` | 파일 포맷 확장자. 예: `svg`, `png`, `webp`, `ico` |
| `path` | repo 루트 기준 상대 경로 |
| `usage` | 자산 사용 맥락과 목적 |
| `owner` | 자산 관리 책임 주체(팀/도메인) |
| `source_type` | source candidate 유형. `live-site`, `asset-tmp`, `local-repo` |
| `source_ref` | source 후보의 URL 또는 절대 경로 |
| `normalized_from` | 원본 대비 정규화 방식. 예: `copy-only`, `resized`, `converted PNG to WEBP` |
| `notes` | placeholder 여부, 교체 제한, 마이그레이션 메모 등 |

## Validation Baseline
- `id`와 `path`는 자산 의미와 경로가 충돌하지 않아야 한다.
- `path`는 실제 파일과 정확히 일치해야 한다.
- `source_type`, `source_ref`, `normalized_from`은 provenance 추적 가능하도록 채운다.
- runtime-safe하지 않은 placeholder 자산은 manifest에서 제외한다.
- 미제공 자산은 동일 카테고리 경로에 `*.placeholder.md` 또는 `README-placeholder.md`로 분리 기록한다.

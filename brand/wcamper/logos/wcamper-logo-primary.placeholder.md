# Placeholder Spec

- asset_id: `brand.wcamper.logo.primary.svg`
- policy: registry-only (not in runtime manifest)
- intended_runtime_path: `brand/wcamper/logos/wcamper-logo-primary.svg`
- expected_format: `svg`
- harvest_status: `not-harvested`
- reason: runtime 사용 가능한 `wcamper` primary SVG source candidate를 찾지 못함
- source_candidates_checked:
  - live-site: `https://www.wcamper.com/assets/img/brand/wcamper-ci-logo-v2.png` (PNG 1400x1400)
  - local-repo: `C:/dreamlabs/github/com-wcamper-www-landing/assets/img/brand/wcamper-ci-logo-v2.png` (PNG 1400x1400)
  - local-repo (rejected): `C:/dreamlabs/github/com-wcamper-bdcrew-landing/assets/img/logo.svg` (BD-Crew 전용)
- next_action:
  - 로고 소유자에게 primary vector 원본(`.svg` 또는 편집 가능한 벡터 포맷) 수급
  - 수급 후 `brand/wcamper/logos/wcamper-logo-primary.svg`로 편입하고 manifest 재등록

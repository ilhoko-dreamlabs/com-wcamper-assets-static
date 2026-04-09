# Placeholder Spec

- asset_id: `footer.camprogrammer.logo.default.svg`
- policy: registry-only (not in runtime manifest)
- intended_runtime_path: `footer/camprogrammer/camprogrammer-logo-default.svg`
- expected_format: `svg`
- harvest_status: `not-harvested`
- reason: footer attribution에 사용 가능한 `camprogrammer` SVG source candidate를 찾지 못함
- source_candidates_checked:
  - live-site: `https://www.wcamper.com/assets/img/support/camprogrammer-logo.png` (PNG 254x142)
  - local-repo: `C:/dreamlabs/github/com-wcamper-www-landing/assets/img/support/camprogrammer-logo.png` (PNG 254x142)
  - asset-tmp: `C:/dreamlabs/github/_tmp_camprogrammer_logo.png` (PNG 343x200)
- next_action:
  - attribution 소유자에게 기본 로고 vector 원본(`.svg`) 요청
  - 수급 후 고정 경로 `footer/camprogrammer/camprogrammer-logo-default.svg`에 편입하고 manifest 재등록

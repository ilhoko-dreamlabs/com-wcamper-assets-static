# Asset Usage Policy

## 1) Common URL Reference Principle
- 사이트 repo는 공통 asset을 중앙 저장소 기준 URL로 참조한다.
- 운영 URL baseline은 `assets.wcamper.com`을 대상으로 설계한다.
- 현재 문서는 bootstrap 단계 기준이며 runtime 반영 완료를 의미하지 않는다.

## 2) No Local Copy Principle
- 사이트 repo에 공통 asset을 복사해 소유하는 방식은 금지한다.
- 예외 상황(장애 대응 등)이 있으면 임시 분기와 만료 계획을 함께 기록한다.
- 공통 asset 변경은 중앙 manifest와 release note를 통해 반영한다.

## 3) Footer Attribution Asset Principle
- DreamLabs 기본 로고 경로: `footer/dreamlabs/dreamlabs-logo-default.svg`
- 캠핑하는 프로그래머 기본 로고 경로: `footer/camprogrammer/camprogrammer-logo-default.svg`
- 위 경로는 attribution baseline으로 고정하며, 사이트별 임의 교체를 허용하지 않는다.

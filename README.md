# com-wcamper-assets-static

## Repo Purpose
- wcamper 사이트군에서 공통으로 사용하는 정적 asset을 중앙 저장소에서 관리하기 위한 bootstrap repo다.
- 사이트별 repo에 공통 asset을 중복 복사하지 않고, 공통 registry 기준으로 참조하는 것을 원칙으로 한다.
- 문서 기준선 관리와 실제 바이너리 자산 저장소 관리를 분리한다.
- `assets.wcamper.com`에서 공통 asset host + human inspection page를 함께 제공하는 것을 목표로 한다.

## Structure Overview
- `assets-manifest.json`: 자산 registry 원본 데이터
- `assets-index.md`: 카테고리/P0/P1 인덱스
- `brand/`: 브랜드 공통 자산
- `footer/`: footer attribution 고정 자산
- `og-social/`: OG/SNS 이미지 템플릿 및 사이트별 분류
- `icons/`: 공통 아이콘 세트
- `ui-patterns/`: UI 패턴 텍스처/배경/디바이더
- `docs/`: 사용/릴리즈/manifest 필드 문서

## Usage Principles
- 사이트 repo는 asset의 소유자가 아니라 사용자다.
- 공통 asset은 중앙 저장소 기준으로 관리하고 URL 참조 방식으로 사용한다.
- 로컬 복사본을 운영 기준으로 삼지 않는다.
- 미확정 자산은 placeholder 상태로 명시하고 runtime 반영 완료로 취급하지 않는다.
- placeholder-only 자산은 preview/registry 문맥용이며 runtime-ready final asset이 아니다.

## Planned Distribution Target
- 공통 배포 도메인 후보: `assets.wcamper.com`
- 현재는 bootstrap 단계이며, 실제 운영 배포 완료 또는 도메인 연결 완료 상태가 아니다.
- inspection page는 검수 편의용 보조 UI이며, 일반 서비스 웹앱을 대체하지 않는다.

# 노션 API 연동 가이드

## 개요

메인 페이지의 모든 콘텐츠를 노션 데이터베이스에서 관리할 수 있도록 설정했습니다. 빌드 타임에 노션 API를 통해 데이터를 가져와 정적 페이지를 생성합니다.

## 1. 노션 데이터베이스 생성

`docs/notion-data/` 폴더의 CSV 파일들을 노션에 임포트하세요.

### CSV 임포트 방법

1. 노션에서 새 페이지 생성
2. 좌측 사이드바 → "Import" 클릭
3. "CSV" 선택
4. 해당 CSV 파일 선택 (예: `1-hero-slides.csv`)
5. 자동으로 데이터베이스 생성됨

각 CSV 파일마다 별도의 데이터베이스를 생성해야 합니다.

## 2. 노션 Integration 설정

### Integration 생성

1. https://www.notion.so/my-integrations 접속
2. "New integration" 클릭
3. Integration 이름 입력 (예: "AMOREA Platform")
4. Workspace 선택
5. "Submit" 클릭
6. **Integration Token (secret_xxx...)** 복사 → `.env.local`에 저장

### 데이터베이스에 Integration 연결

각 노션 데이터베이스마다:
1. 데이터베이스 페이지 열기
2. 우측 상단 "..." 메뉴 클릭
3. "Connections" → "Add connections"
4. 방금 생성한 Integration 선택

## 3. Database ID 확인

각 데이터베이스의 URL에서 ID를 추출합니다:

```
https://www.notion.so/[workspace]/[DATABASE_ID]?v=[VIEW_ID]
                                  ^^^^^^^^^^^^
                                  이 부분이 Database ID
```

예시:
```
https://www.notion.so/myworkspace/a1b2c3d4e5f6...?v=...
                                   ^^^^^^^^^^^^^^^^^
```

## 4. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# Notion API Configuration
NOTION_API_KEY=secret_your_integration_token_here

# Notion Database IDs
NOTION_DATABASE_HERO_SLIDES=your_hero_slides_database_id
NOTION_DATABASE_ABOUT_CARDS=your_about_cards_database_id
NOTION_DATABASE_STATISTICS=your_statistics_database_id
NOTION_DATABASE_COUNSELORS=your_counselors_database_id
NOTION_DATABASE_REVIEWS=your_reviews_database_id
NOTION_DATABASE_BEFORE_AFTER=your_before_after_database_id
NOTION_DATABASE_JOURNEY=your_journey_steps_database_id
NOTION_DATABASE_PERSONAS=your_personas_database_id
NOTION_DATABASE_BENEFITS=your_benefits_database_id
```

> **참고**: `.env.local.example` 파일을 복사해서 사용하세요.

## 5. 로컬 빌드 테스트

```bash
# 의존성 설치 (이미 완료됨)
npm install

# 빌드 (노션 데이터 가져오기)
npm run build

# 프로덕션 서버 실행
npm run start
```

## 6. Cloudflare Pages 배포

### 환경 변수 설정

1. Cloudflare Pages 대시보드
2. 프로젝트 선택 → "Settings" → "Environment variables"
3. Production 환경에 다음 변수 추가:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_HERO_SLIDES`
   - `NOTION_DATABASE_ABOUT_CARDS`
   - ... (모든 Database ID)

### 자동 배포

GitHub에 push하면 자동으로 빌드 & 배포됩니다.

```bash
git add .
git commit -m "feat: 노션 API 연동 완료"
git push
```

## 7. 데이터 구조

### 연동된 데이터베이스

1. **Hero Slides** - 히어로 캐러셀 (3개 슬라이드)
2. **About Cards** - 저속노화 소개 카드 (3개)
3. **Statistics** - 통계 섹션 (4개 항목)
4. **Counselors** - 카운셀러 정보 (4명)
5. **Reviews** - 고객 후기 (3개)
6. **Before After** - 변화 갤러리 (3개)
7. **Journey Steps** - 성장 여정 (4단계)
8. **Target Personas** - 타겟 페르소나 (4개)
9. **Benefits** - CTA 혜택 (3개)

상세 스키마는 `docs/notion-database-schema.md` 참고.

## 8. Fallback 데이터

노션 API 연동 전 또는 연동 실패 시, 기존 하드코딩된 데이터가 fallback으로 사용됩니다.

## 9. 코드 구조

```
src/
├── lib/
│   ├── notion.ts           # Notion 클라이언트 & 헬퍼 함수
│   └── notion-fetchers.ts  # 데이터 fetch 함수들
├── app/
│   └── page.tsx            # 메인 페이지 (async Server Component)
└── components/
    ├── HeroCarousel.tsx      # slides props 받음
    ├── StatsSection.tsx      # stats props 받음
    ├── BeforeAfterGallery.tsx # gallery props 받음
    └── ReviewCard.tsx        # review props 받음
```

## 10. 주의사항

- **빌드 타임 데이터 fetch**: 노션 데이터는 빌드할 때만 가져옵니다. 실시간 업데이트가 아닙니다.
- **재배포 필요**: 노션 데이터를 수정한 후에는 다시 빌드 & 배포해야 반영됩니다.
- **환경 변수 보안**: `.env.local`은 절대 커밋하지 마세요 (`.gitignore`에 이미 등록됨).

## 11. 트러블슈팅

### "Unauthorized" 에러
- Integration Token이 올바른지 확인
- 데이터베이스에 Integration이 연결되어 있는지 확인

### "Database not found" 에러
- Database ID가 올바른지 확인
- URL에서 ID를 정확히 복사했는지 확인

### 빌드는 성공하지만 데이터가 안 나옴
- 환경 변수가 제대로 설정되었는지 확인
- 노션 데이터베이스의 "활성화" 체크박스가 체크되어 있는지 확인

## 12. 다음 단계 (선택사항)

- [ ] On-demand ISR: 노션 데이터 변경 시 자동 재빌드
- [ ] Webhook: 노션 → Cloudflare Pages 자동 트리거
- [ ] CMS UI: 노션 외에 자체 관리자 페이지 추가

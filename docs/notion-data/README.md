# 노션 데이터 임포트 가이드

## 📁 CSV 파일 목록

1. `1-hero-slides.csv` - 히어로 캐러셀 슬라이드
2. `2-about-cards.csv` - 저속노화 소개 카드
3. `3-statistics.csv` - 통계 섹션
4. `4-counselors.csv` - 카운셀러 정보
5. `5-reviews.csv` - 고객 후기
6. `6-before-after.csv` - 비포/애프터 갤러리
7. `7-journey-steps.csv` - 성장 여정 단계
8. `8-target-personas.csv` - 타겟 페르소나
9. `9-benefits.csv` - CTA 혜택

## 🔨 노션에 임포트하는 방법

### 방법 1: CSV 직접 임포트

1. 노션에서 새 페이지 생성
2. 좌측 사이드바에서 "Import" 클릭
3. "CSV" 선택
4. 해당 CSV 파일 선택
5. 데이터베이스로 변환

### 방법 2: 빈 데이터베이스 생성 후 데이터 입력

1. `/database` 입력해서 데이터베이스 생성
2. 컬럼 추가 (스키마 참고: `../notion-database-schema.md`)
3. CSV 내용 복사 붙여넣기

## 🎨 노션 데이터베이스 뷰 추천

### Hero Slides
- **Gallery View**: 이미지 중심으로 보기
- **Table View**: 순서 편집용

### Counselors
- **Gallery View**: 프로필 사진 중심
- **Board View**: 역할별 그룹핑

### Reviews
- **Table View**: 기본
- **Board View**: 평점별 그룹핑

### Before After
- **Gallery View**: 이미지 비교용

## 🔗 다음 단계

1. ✅ CSV 파일을 노션에 임포트
2. 노션 Integration Token 받기
3. Database ID 복사
4. Next.js에 노션 API 연동 (.env 파일 설정)
5. 빌드 타임에 데이터 fetch

## 📝 환경 변수 설정

`.env.local` 파일 생성:
```env
NOTION_API_KEY=your_integration_token_here
NOTION_DATABASE_HERO_SLIDES=database_id_here
NOTION_DATABASE_ABOUT_CARDS=database_id_here
NOTION_DATABASE_STATISTICS=database_id_here
NOTION_DATABASE_COUNSELORS=database_id_here
NOTION_DATABASE_REVIEWS=database_id_here
NOTION_DATABASE_BEFORE_AFTER=database_id_here
NOTION_DATABASE_JOURNEY=database_id_here
NOTION_DATABASE_PERSONAS=database_id_here
NOTION_DATABASE_BENEFITS=database_id_here
```

## 🚀 API 연동 예시

```typescript
import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function getHeroSlides() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_HERO_SLIDES!,
    filter: {
      property: "활성화",
      checkbox: { equals: true }
    },
    sorts: [{ property: "순서", direction: "ascending" }]
  })

  return response.results
}
```

노션 API 연동이 필요하시면 말씀해주세요!

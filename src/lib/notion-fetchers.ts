import {
  notion,
  getPlainText,
  getNumber,
  getCheckbox,
  getUrl,
  getSelect,
  getFiles,
} from "./notion";

// 히어로 슬라이드 데이터 가져오기
export async function getHeroSlides() {
  const databaseId = process.env.NOTION_DATABASE_HERO_SLIDES;
  if (!databaseId) return [];

  const response = await (notion.databases as any).query({
    database_id: databaseId,
    filter: {
      property: "활성화",
      checkbox: { equals: true },
    },
    sorts: [{ property: "순서", direction: "ascending" }],
  });

  return response.results.map((page: any) => ({
    id: getNumber(page.properties["순서"]),
    title: getPlainText(page.properties["제목"]),
    subtitle: getPlainText(page.properties["부제목"]),
    image: getUrl(page.properties["이미지 URL"]),
    gradient: getPlainText(page.properties["그라데이션"]),
  }));
}

// 소개 카드 데이터 가져오기
export async function getAboutCards() {
  const databaseId = process.env.NOTION_DATABASE_ABOUT_CARDS;
  if (!databaseId) return [];

  const response = await (notion.databases as any).query({
    database_id: databaseId,
    filter: {
      property: "활성화",
      checkbox: { equals: true },
    },
    sorts: [{ property: "순서", direction: "ascending" }],
  });

  return response.results.map((page: any) => ({
    icon: getPlainText(page.properties["아이콘"]),
    title: getPlainText(page.properties["제목"]),
    description: getPlainText(page.properties["설명"]),
  }));
}

// 통계 데이터 가져오기
export async function getStatistics() {
  const databaseId = process.env.NOTION_DATABASE_STATISTICS;
  if (!databaseId) return [];

  const response = await (notion.databases as any).query({
    database_id: databaseId,
    filter: {
      property: "활성화",
      checkbox: { equals: true },
    },
    sorts: [{ property: "순서", direction: "ascending" }],
  });

  return response.results.map((page: any) => ({
    value: getNumber(page.properties["숫자"]),
    label: getPlainText(page.properties["레이블"]),
    suffix: getPlainText(page.properties["단위"]),
    icon: getPlainText(page.properties["아이콘"]),
  }));
}

// 카운셀러 데이터 가져오기
export async function getCounselors() {
  const databaseId = process.env.NOTION_DATABASE_COUNSELORS;
  if (!databaseId) return [];

  const response = await (notion.databases as any).query({
    database_id: databaseId,
    filter: {
      property: "활성화",
      checkbox: { equals: true },
    },
    sorts: [{ property: "순서", direction: "ascending" }],
  });

  return response.results.map((page: any) => ({
    id: getNumber(page.properties["순서"]),
    name: getPlainText(page.properties["이름"]),
    role: getPlainText(page.properties["역할"]),
    image: getUrl(page.properties["프로필 이미지 URL"]),
    bio: getPlainText(page.properties["소개"]),
    specialties: getPlainText(page.properties["전문 분야"])
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s),
    experience: getPlainText(page.properties["경력"]),
    certifications: getPlainText(page.properties["자격증"])
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s),
    phone: getPlainText(page.properties["연락처"]),
    email: getPlainText(page.properties["이메일"]),
  }));
}

// 후기 데이터 가져오기
export async function getReviews() {
  const databaseId = process.env.NOTION_DATABASE_REVIEWS;
  if (!databaseId) return [];

  const response = await (notion.databases as any).query({
    database_id: databaseId,
    filter: {
      property: "활성화",
      checkbox: { equals: true },
    },
    sorts: [{ property: "순서", direction: "ascending" }],
  });

  return response.results.map((page: any) => ({
    id: getNumber(page.properties["순서"]),
    name: getPlainText(page.properties["이름"]),
    age: getNumber(page.properties["나이"]),
    rating: getNumber(page.properties["평점"]),
    content: getPlainText(page.properties["내용"]),
    date: getPlainText(page.properties["날짜"]),
    program: getPlainText(page.properties["프로그램"]),
  }));
}

// 비포/애프터 데이터 가져오기
export async function getBeforeAfter() {
  const databaseId = process.env.NOTION_DATABASE_BEFORE_AFTER;
  if (!databaseId) return [];

  const response = await (notion.databases as any).query({
    database_id: databaseId,
    filter: {
      property: "활성화",
      checkbox: { equals: true },
    },
    sorts: [{ property: "순서", direction: "ascending" }],
  });

  return response.results.map((page: any) => ({
    id: getNumber(page.properties["순서"]),
    title: getPlainText(page.properties["제목"]),
    before: getUrl(page.properties["Before URL"]),
    after: getUrl(page.properties["After URL"]),
    description: getPlainText(page.properties["설명"]),
    duration: getPlainText(page.properties["기간"]),
  }));
}

// 성장 여정 데이터 가져오기
export async function getJourneySteps() {
  const databaseId = process.env.NOTION_DATABASE_JOURNEY;
  if (!databaseId) return [];

  const response = await (notion.databases as any).query({
    database_id: databaseId,
    filter: {
      property: "활성화",
      checkbox: { equals: true },
    },
    sorts: [{ property: "순서", direction: "ascending" }],
  });

  return response.results.map((page: any) => ({
    step: getNumber(page.properties["단계 번호"]),
    icon: getPlainText(page.properties["아이콘"]),
    title: getPlainText(page.properties["제목"]),
    description: getPlainText(page.properties["설명"]),
  }));
}

// 타겟 페르소나 데이터 가져오기
export async function getTargetPersonas() {
  const databaseId = process.env.NOTION_DATABASE_PERSONAS;
  if (!databaseId) return [];

  const response = await (notion.databases as any).query({
    database_id: databaseId,
    filter: {
      property: "활성화",
      checkbox: { equals: true },
    },
    sorts: [{ property: "순서", direction: "ascending" }],
  });

  return response.results.map((page: any) => ({
    type: getPlainText(page.properties["타입"]),
    emoji: getPlainText(page.properties["이모지"]),
    description: getPlainText(page.properties["설명"]),
    color: getPlainText(page.properties["색상"]),
  }));
}

// CTA 혜택 데이터 가져오기
export async function getBenefits() {
  const databaseId = process.env.NOTION_DATABASE_BENEFITS;
  if (!databaseId) return [];

  const response = await (notion.databases as any).query({
    database_id: databaseId,
    filter: {
      property: "활성화",
      checkbox: { equals: true },
    },
    sorts: [{ property: "순서", direction: "ascending" }],
  });

  return response.results.map((page: any) => ({
    title: getPlainText(page.properties["제목"]),
    icon: getPlainText(page.properties["아이콘"]),
    description: getPlainText(page.properties["설명"]),
  }));
}

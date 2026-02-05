#!/usr/bin/env node

const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");

// 환경 변수 또는 커맨드 라인 인자에서 가져오기
const NOTION_TOKEN = process.env.NOTION_TOKEN || process.argv[2];
const PARENT_PAGE_ID = process.env.PARENT_PAGE_ID || process.argv[3];

if (!NOTION_TOKEN || !PARENT_PAGE_ID) {
  console.error("\n❌ 오류: Integration Token과 Parent Page ID가 필요합니다.\n");
  console.log("사용법:");
  console.log("  node scripts/setup-notion.js <INTEGRATION_TOKEN> <PARENT_PAGE_ID>");
  console.log("\n또는 환경 변수 설정:");
  console.log("  NOTION_TOKEN=xxx PARENT_PAGE_ID=xxx node scripts/setup-notion.js\n");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// CSV 파싱 함수
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] || "";
    });
    return obj;
  });
}

// 데이터베이스 스키마 정의
const databaseSchemas = {
  "Hero Slides": {
    csvFile: "1-hero-slides.csv",
    properties: {
      "제목": { title: {} },
      "부제목": { rich_text: {} },
      "이미지 URL": { url: {} },
      "그라데이션": { rich_text: {} },
      "순서": { number: {} },
      "활성화": { checkbox: {} },
    },
  },
  "About Cards": {
    csvFile: "2-about-cards.csv",
    properties: {
      "제목": { title: {} },
      "아이콘": { rich_text: {} },
      "설명": { rich_text: {} },
      "순서": { number: {} },
      "활성화": { checkbox: {} },
    },
  },
  "Statistics": {
    csvFile: "3-statistics.csv",
    properties: {
      "레이블": { title: {} },
      "숫자": { number: {} },
      "단위": { rich_text: {} },
      "아이콘": { rich_text: {} },
      "순서": { number: {} },
      "활성화": { checkbox: {} },
    },
  },
  "Counselors": {
    csvFile: "4-counselors.csv",
    properties: {
      "이름": { title: {} },
      "역할": { rich_text: {} },
      "소개": { rich_text: {} },
      "전문 분야": { rich_text: {} },
      "경력": { rich_text: {} },
      "자격증": { rich_text: {} },
      "연락처": { rich_text: {} },
      "이메일": { email: {} },
      "프로필 이미지 URL": { url: {} },
      "순서": { number: {} },
      "활성화": { checkbox: {} },
    },
  },
  "Reviews": {
    csvFile: "5-reviews.csv",
    properties: {
      "이름": { title: {} },
      "나이": { number: {} },
      "평점": { number: {} },
      "내용": { rich_text: {} },
      "날짜": { rich_text: {} },
      "프로그램": { rich_text: {} },
      "순서": { number: {} },
      "활성화": { checkbox: {} },
    },
  },
  "Before After": {
    csvFile: "6-before-after.csv",
    properties: {
      "제목": { title: {} },
      "Before URL": { url: {} },
      "After URL": { url: {} },
      "설명": { rich_text: {} },
      "기간": { rich_text: {} },
      "순서": { number: {} },
      "활성화": { checkbox: {} },
    },
  },
  "Journey Steps": {
    csvFile: "7-journey-steps.csv",
    properties: {
      "제목": { title: {} },
      "단계 번호": { number: {} },
      "아이콘": { rich_text: {} },
      "설명": { rich_text: {} },
      "순서": { number: {} },
      "활성화": { checkbox: {} },
    },
  },
  "Target Personas": {
    csvFile: "8-target-personas.csv",
    properties: {
      "타입": { title: {} },
      "이모지": { rich_text: {} },
      "설명": { rich_text: {} },
      "색상": { rich_text: {} },
      "순서": { number: {} },
      "활성화": { checkbox: {} },
    },
  },
  "Benefits": {
    csvFile: "9-benefits.csv",
    properties: {
      "제목": { title: {} },
      "아이콘": { rich_text: {} },
      "설명": { rich_text: {} },
      "순서": { number: {} },
      "활성화": { checkbox: {} },
    },
  },
};

// 데이터베이스 생성 및 데이터 임포트
async function createDatabase(name, schema) {
  console.log(`\n📊 "${name}" 데이터베이스 생성 중...`);

  try {
    // 데이터베이스 생성
    const database = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: PARENT_PAGE_ID
      },
      title: [{ type: "text", text: { content: name } }],
      properties: schema.properties,
    });

    console.log(`✅ 데이터베이스 생성 완료: ${database.id}`);

    // CSV 데이터 읽기 및 임포트
    const csvPath = path.join(__dirname, "..", "docs", "notion-data", schema.csvFile);
    if (fs.existsSync(csvPath)) {
      const data = parseCSV(csvPath);
      console.log(`📝 ${data.length}개 항목 임포트 중...`);

      for (const item of data) {
        const properties = {};

        // CSV 데이터를 Notion properties로 변환
        Object.entries(item).forEach(([key, value]) => {
          if (!schema.properties[key]) return;

          const propType = Object.keys(schema.properties[key])[0];

          switch (propType) {
            case "title":
              properties[key] = { title: [{ text: { content: value } }] };
              break;
            case "rich_text":
              properties[key] = { rich_text: [{ text: { content: value } }] };
              break;
            case "number":
              properties[key] = { number: parseFloat(value) || 0 };
              break;
            case "checkbox":
              properties[key] = { checkbox: value === "TRUE" || value === "true" };
              break;
            case "url":
              properties[key] = { url: value || null };
              break;
            case "email":
              properties[key] = { email: value || null };
              break;
          }
        });

        await notion.pages.create({
          parent: { database_id: database.id },
          properties,
        });
      }

      console.log(`✅ ${data.length}개 항목 임포트 완료`);
    }

    return { name, id: database.id };
  } catch (error) {
    console.error(`❌ "${name}" 생성 실패:`, error.message);
    return { name, id: null, error: error.message };
  }
}

// 메인 실행
async function main() {
  console.log("\n🚀 AMOREA 노션 데이터베이스 자동 설정 시작\n");
  console.log(`Parent Page ID: ${PARENT_PAGE_ID}`);

  const results = [];

  for (const [name, schema] of Object.entries(databaseSchemas)) {
    const result = await createDatabase(name, schema);
    results.push(result);
    // API rate limit 방지를 위한 대기
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // 결과 요약
  console.log("\n" + "=".repeat(60));
  console.log("📋 설정 완료 요약");
  console.log("=".repeat(60) + "\n");

  results.forEach(({ name, id, error }) => {
    if (id) {
      console.log(`✅ ${name}`);
      console.log(`   ID: ${id}\n`);
    } else {
      console.log(`❌ ${name}`);
      console.log(`   오류: ${error}\n`);
    }
  });

  // .env.local 파일 생성
  const envContent = `# Notion API Configuration
NOTION_API_KEY=${NOTION_TOKEN}

# Notion Database IDs
NOTION_DATABASE_HERO_SLIDES=${results.find(r => r.name === "Hero Slides")?.id || ""}
NOTION_DATABASE_ABOUT_CARDS=${results.find(r => r.name === "About Cards")?.id || ""}
NOTION_DATABASE_STATISTICS=${results.find(r => r.name === "Statistics")?.id || ""}
NOTION_DATABASE_COUNSELORS=${results.find(r => r.name === "Counselors")?.id || ""}
NOTION_DATABASE_REVIEWS=${results.find(r => r.name === "Reviews")?.id || ""}
NOTION_DATABASE_BEFORE_AFTER=${results.find(r => r.name === "Before After")?.id || ""}
NOTION_DATABASE_JOURNEY=${results.find(r => r.name === "Journey Steps")?.id || ""}
NOTION_DATABASE_PERSONAS=${results.find(r => r.name === "Target Personas")?.id || ""}
NOTION_DATABASE_BENEFITS=${results.find(r => r.name === "Benefits")?.id || ""}
`;

  const envPath = path.join(__dirname, "..", ".env.local");
  fs.writeFileSync(envPath, envContent);

  console.log("=".repeat(60));
  console.log(`✅ .env.local 파일 생성 완료: ${envPath}`);
  console.log("=".repeat(60) + "\n");

  console.log("🎉 모든 설정이 완료되었습니다!");
  console.log("\n다음 단계:");
  console.log("  1. npm run build  - 노션 데이터로 빌드");
  console.log("  2. npm run dev    - 로컬에서 확인");
  console.log("  3. git push       - Cloudflare Pages 배포\n");
}

main().catch(console.error);

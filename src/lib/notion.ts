import { Client } from "@notionhq/client";

// Notion 클라이언트 초기화
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Notion 프로퍼티 값 추출 헬퍼 함수들
export function getPlainText(property: any): string {
  if (!property) return "";

  if (property.type === "title" && property.title) {
    return property.title.map((t: any) => t.plain_text).join("");
  }

  if (property.type === "rich_text" && property.rich_text) {
    return property.rich_text.map((t: any) => t.plain_text).join("");
  }

  return "";
}

export function getNumber(property: any): number {
  if (!property || property.type !== "number") return 0;
  return property.number || 0;
}

export function getCheckbox(property: any): boolean {
  if (!property || property.type !== "checkbox") return false;
  return property.checkbox || false;
}

export function getUrl(property: any): string {
  if (!property || property.type !== "url") return "";
  return property.url || "";
}

export function getSelect(property: any): string {
  if (!property || property.type !== "select") return "";
  return property.select?.name || "";
}

export function getFiles(property: any): string {
  if (!property || property.type !== "files") return "";
  if (property.files && property.files.length > 0) {
    const file = property.files[0];
    return file.type === "external" ? file.external.url : file.file.url;
  }
  return "";
}

export function getDate(property: any): string {
  if (!property || property.type !== "date") return "";
  return property.date?.start || "";
}

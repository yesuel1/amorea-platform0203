# 노션 자동 설정 스크립트

## setup-notion.js

모든 노션 데이터베이스를 자동으로 생성하고 CSV 데이터를 임포트하는 스크립트입니다.

### 사용 방법

#### 1. Notion Integration 생성

1. https://www.notion.so/my-integrations 접속
2. "+ New integration" 클릭
3. 설정:
   - Name: `AMOREA Platform`
   - Associated workspace: 작업 공간 선택
   - Capabilities: Read content, Update content, Insert content 체크
4. "Submit" 클릭
5. **Integration Token 복사** (secret_xxx...)

#### 2. Parent Page 준비

1. 노션에서 새 페이지 생성 (예: "AMOREA Database")
2. 페이지 URL에서 ID 추출:
   ```
   https://www.notion.so/workspace/[PAGE_ID]
                                   ^^^^^^^^^
   ```
3. 페이지 우측 상단 `...` → "Connections" → Integration 연결

#### 3. 스크립트 실행

```bash
node scripts/setup-notion.js <INTEGRATION_TOKEN> <PARENT_PAGE_ID>
```

**예시:**
```bash
node scripts/setup-notion.js secret_abc123xyz456 a1b2c3d4e5f6g7h8
```

### 스크립트가 하는 일

1. ✅ 9개 데이터베이스 생성
   - Hero Slides
   - About Cards
   - Statistics
   - Counselors
   - Reviews
   - Before After
   - Journey Steps
   - Target Personas
   - Benefits

2. ✅ CSV 데이터 자동 임포트
   - `docs/notion-data/` 폴더의 CSV 파일들 읽기
   - 각 데이터베이스에 데이터 삽입

3. ✅ `.env.local` 파일 자동 생성
   - Integration Token 저장
   - 모든 Database ID 저장

### 완료 후

스크립트가 완료되면:

1. 노션에서 생성된 데이터베이스 확인
2. `.env.local` 파일이 자동 생성됨
3. 바로 빌드 가능:
   ```bash
   npm run build
   npm run dev
   ```

### 문제 해결

**"Unauthorized" 에러**
- Integration Token이 올바른지 확인
- Integration이 Parent Page에 연결되어 있는지 확인

**"Object not found" 에러**
- Parent Page ID가 올바른지 확인
- Page URL에서 ID를 정확히 추출했는지 확인

**CSV 파일 없음 에러**
- `docs/notion-data/` 폴더에 CSV 파일이 있는지 확인

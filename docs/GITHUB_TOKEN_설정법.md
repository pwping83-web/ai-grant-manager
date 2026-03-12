# 실시간 크롤링 버튼 사용을 위한 GITHUB_TOKEN 설정

## 1. GitHub 토큰 발급

1. GitHub 로그인 → **Settings** (우측 상단 프로필 메뉴)
2. 왼쪽 하단 **Developer settings** → **Personal access tokens**
3. **Tokens (classic)** → **Generate new token (classic)**
4. Note: `ai-grant-manager crawl` (아무 이름 가능)
5. Expiration: 90 days (또는 원하는 기간)
6. Scopes: **`workflow`** 체크 (GitHub Actions 워크플로우 실행 권한)
7. **Generate token** 클릭 → 토큰 복사 (한 번만 표시됨!)

## 2. Vercel에 환경변수 등록

1. [Vercel 대시보드](https://vercel.com) → 프로젝트 **ai-grant-manager** 선택
2. **Settings** → **Environment Variables**
3. **Add** 클릭
   - **Name**: `GITHUB_TOKEN`
   - **Value**: (복사한 토큰 붙여넣기)
   - **Environment**: Production, Preview, Development 모두 체크
4. **Save** 후 **Redeploy** (Deployments → 우측 ... → Redeploy)

## 3. 동작 확인

- 배포 후 **https://ai-grant-manager.vercel.app/api/health** 접속 → `{"ok":true}` 나오면 API 정상
- 개인용 페이지 → 실시간 크롤링 버튼 클릭 → 성공 메시지 확인

## 수동 실행 (토큰 미설정 시)

버튼이 동작하지 않으면 GitHub에서 직접 실행할 수 있습니다.

1. https://github.com/pwping83-web/ai-grant-manager/actions
2. **Daily Crawler Bot** 워크플로우 선택
3. **Run workflow** → **Run workflow** 클릭
4. 1~2분 후 지원정보가 갱신됩니다.

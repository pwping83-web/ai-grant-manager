# 정부지원금 크롤러 봇

## 0. Python 설치 (필수)

Python이 없다면 먼저 설치하세요.

- **다운로드**: https://www.python.org/downloads/
- 설치 시 **"Add Python to PATH"** 체크 필수
- 설치 후 **새 터미널**을 연 다음 `python --version`으로 확인

## 1. 빠른 실행 (한 번만 설정)

`run-crawler.bat`를 더블클릭하거나, 터미널에서:

```cmd
cd crawler
run-crawler.bat
```

최초 1회 가상환경 생성·패키지 설치 후 `main.py`가 자동 실행됩니다.

## 2. 파이썬 환경 수동 설정

### 가상환경 생성 및 활성화

**Windows (PowerShell):**
```powershell
cd crawler
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
cd crawler
python -m venv venv
venv\Scripts\activate.bat
```

**Mac/Linux:**
```bash
cd crawler
python3 -m venv venv
source venv/bin/activate
```

### 패키지 설치

```bash
pip install -r requirements.txt
```

또는 개별 설치:

```bash
pip install requests beautifulsoup4 supabase python-dotenv
```

## 2. 실행 방법

```bash
python main.py
```

## 3. 환경변수

`.env` 파일에 Supabase 연결 정보가 저장되어 있습니다.
- `SUPABASE_URL`: Supabase 프로젝트 URL
- `SUPABASE_KEY`: Service Role Key (관리자용, 백엔드 전용)

### 네이버 검색 API (선택, 보조 크롤링)

K-Startup 크롤링에 더해 **네이버 검색 API**로 정부지원금 관련 뉴스를 보조 수집할 수 있습니다.

1. [네이버 개발자센터](https://developers.naver.com)에서 애플리케이션 등록
2. 검색 API 이용 신청 후 **Client ID**, **Client Secret** 발급
3. `.env`에 추가:
   ```
   NAVER_CLIENT_ID=발급받은ID
   NAVER_CLIENT_SECRET=발급받은시크릿
   ```

설정 시 "정부지원금 2026", "소상공인 지원사업 2026" 등 검색어로 뉴스 결과를 수집하며, `source_url`(원문 링크)도 함께 저장됩니다. 일일 25,000건 한도.  
※ Supabase `grants` 테이블에 `source_url` 컬럼이 있어야 원문 링크가 저장됩니다.

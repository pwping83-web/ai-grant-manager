# 정부지원금 크롤러 봇

## 1. 파이썬 환경 설정

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

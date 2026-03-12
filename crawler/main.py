"""
정부지원금 공고 크롤러 봇
- 요청·파싱: requests, BeautifulSoup
- DB 저장: Supabase (grants 테이블)
- 중복 방지: 공고명(title)이 존재하면 건너뜀
"""

import os
from datetime import datetime
from typing import List
from dotenv import load_dotenv
from supabase import create_client, Client
import requests
from bs4 import BeautifulSoup

# .env 로드
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("SUPABASE_URL, SUPABASE_KEY가 .env에 설정되어 있어야 합니다.")


def get_supabase_client() -> Client:
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def scrape_grants() -> List[dict]:
    """
    타겟 URL에서 공고 데이터 수집 (가상 크롤링)
    예시용: 실제 사이트 구조에 맞게 셀렉터를 수정하면 됨
    """
    target_url = "https://www.k-startup.go.kr/common/announcement/announcementList.do?mid=30004"
    grants = []

    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        res = requests.get(target_url, headers=headers, timeout=10)
        res.raise_for_status()
        res.encoding = "utf-8"
        soup = BeautifulSoup(res.text, "html.parser")

        # 기업마당/창업넷 등 실제 사이트의 테이블/리스트 구조에 맞게 수정
        rows = soup.select("tbody tr") or soup.select(".list-item") or []

        for row in rows[:5]:  # 상위 5개만 시도 (구조 테스트용)
            cells = row.select("td") or row.select(".cell")
            if len(cells) >= 2:
                title = cells[1].get_text(strip=True) if len(cells) > 1 else ""
                org = cells[2].get_text(strip=True) if len(cells) > 2 else ""
                deadline = cells[-1].get_text(strip=True) if cells else ""
                if title and len(title) > 3:
                    grants.append({
                        "title": title[:200],
                        "organization": org[:100] if org else None,
                        "category": "창업지원",
                        "max_amount": None,
                        "deadline": _parse_date(deadline),
                        "status": "open",
                        "description": title[:500] if title else None,
                    })

    except Exception as e:
        print(f"[크롤링 실패] {e} - 샘플 데이터로 대체합니다.")

    # 파싱 실패 시 테스트용 샘플 데이터
    if not grants:
        grants = [
            {
                "title": "2026년 초기창업패키지",
                "organization": "중소벤처기업부",
                "category": "창업지원",
                "max_amount": "1억원",
                "deadline": "2026-04-15",
                "status": "open",
                "description": "혁신적인 기술 아이디어를 보유한 초기 창업자를 위한 지원",
            },
            {
                "title": "경기도 청년창업사관학교",
                "organization": "경기도경제과학진흥원",
                "category": "교육/멘토링",
                "max_amount": "5천만원",
                "deadline": "2026-03-20",
                "status": "open",
                "description": "경기도 소재 청년 창업자 대상 입주·교육·멘토링 지원",
            },
            {
                "title": "소상공인 디지털전환 지원사업",
                "organization": "소상공인시장진흥공단",
                "category": "디지털전환",
                "max_amount": "3천만원",
                "deadline": "2026-05-31",
                "status": "open",
                "description": "소상공인 디지털 전환 촉진 지원",
            },
        ]

    return grants


def _parse_date(s: str) -> str | None:
    """날짜 문자열을 YYYY-MM-DD 형식으로 변환"""
    if not s or len(s.strip()) < 6:
        return None
    s = s.strip().replace(".", "-").replace("/", "-")
    parts = s.split("-")
    if len(parts) >= 3:
        y, m, d = parts[0][:4], parts[1].zfill(2), parts[2][:2].zfill(2)
        try:
            datetime(int(y), int(m), int(d))
            return f"{y}-{m}-{d}"
        except ValueError:
            pass
    return None


def save_to_supabase(client: Client, grants: List[dict]) -> tuple:
    """
    grants 테이블에 저장. 공고명 중복 시 건너뜀.
    반환: (저장된 개수, 건너뜀 개수)
    """
    inserted = 0
    skipped = 0

    for g in grants:
        title = g.get("title")
        if not title:
            skipped += 1
            continue

        # 기존 공고명 존재 여부 확인
        existing = (
            client.table("grants")
            .select("id")
            .eq("title", title)
            .execute()
        )

        if existing.data and len(existing.data) > 0:
            print(f"  [건너뜀] {title[:40]}...")
            skipped += 1
            continue

        row = {
            "title": title,
            "organization": g.get("organization"),
            "category": g.get("category"),
            "max_amount": g.get("max_amount"),
            "deadline": g.get("deadline"),
            "status": g.get("status", "open"),
            "description": g.get("description"),
        }

        try:
            client.table("grants").insert(row).execute()
            print(f"  [저장] {title[:40]}...")
            inserted += 1
        except Exception as e:
            print(f"  [오류] {title[:30]}... - {e}")
            skipped += 1

    return inserted, skipped


def main():
    print("=" * 50)
    print("정부지원금 크롤러 봇 실행")
    print("=" * 50)

    client = get_supabase_client()
    print("[1/2] 공고 데이터 수집 중...")
    grants = scrape_grants()
    print(f"      수집된 공고: {len(grants)}건")

    print("[2/2] Supabase grants 테이블에 저장 중...")
    inserted, skipped = save_to_supabase(client, grants)

    print("=" * 50)
    print(f"완료: 저장 {inserted}건, 중복/건너뜀 {skipped}건")
    print("=" * 50)


if __name__ == "__main__":
    main()

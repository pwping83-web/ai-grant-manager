개발자에게 기획안을 전달할 때, 프론트엔드 화면뿐만 아니라 **'어떤 데이터를 어떻게 저장할 것인가(DB 스키마)'**까지 함께 주면 커뮤니케이션 속도가 몇 배는 빨라집니다.

대표님이 구상하시는 서비스는 유저 데이터와 공고 데이터를 정교하게 매칭하는 것이 핵심이므로, 관계형 데이터베이스(PostgreSQL 등) 환경에서 확장성 있게 사용할 수 있는 표준 테이블 구조를 설계해 드립니다.

크게 1. 유저 정보, 2. 지원사업 공고 정보, 3. 유저-공고 매칭(지원서) 정보 3가지 핵심 테이블로 나뉩니다.

🗄️ [테이블 1] users (유저 정보 테이블)
온보딩 과정에서 1TPP(한 화면에 하나씩) 방식으로 수집한 유저의 핵심 자격 요건을 저장합니다.

id (UUID, Primary Key): 유저 고유 식별자

business_type (VARCHAR): 사업 형태 (예비창업자, 개인사업자, 법인사업자)

established_date (DATE): 사업자 등록일 (업력 n년 차 계산용)

birth_date (DATE): 대표자 생년월일 (만 39세 이하 청년 창업 지원금 필터링용)

gender (VARCHAR): 성별 (여성기업 우대사업 필터링용)

region (VARCHAR): 사업장 시/도 (예: 경기도)

sub_region (VARCHAR): 사업장 시/군/구 (예: 안양시)

industry (VARCHAR): 주요 업종 (IT, F&B, 제조 등)

employee_count (INT): 4대 보험 가입 고용 인원 수

revenue (BIGINT): 작년 매출액 (소상공인 대출 등 매출액 제한 필터링용)

created_at (TIMESTAMP): 가입 일시

📋 [테이블 2] grants (정부지원금 공고 테이블)
관리자(어드민) 페이지에서 수집 및 검수하여 배포하는 정부지원금의 세부 조건입니다.

id (UUID, Primary Key): 공고 고유 식별자

title (VARCHAR): 지원사업명 (예: 2026년 소상공인 스마트상점 기술보급사업)

organization (VARCHAR): 주관/주최 기관 (예: 소상공인시장진흥공단)

target_region (JSONB): 지원 가능 지역 배열 (전국 공통이거나 특정 지자체 한정일 경우 배열로 관리)

target_years_min (INT): 최소 요구 업력 (개월 수 기준, 예: 0)

target_years_max (INT): 최대 허용 업력 (개월 수 기준, 예: 36)

max_budget (BIGINT): 최대 지원 금액 (랜딩 페이지에서 '당장 받을 수 있는 총액' 합산용)

deadline (TIMESTAMP): 서류 접수 마감 일시

status (VARCHAR): 공고 상태 (검수대기, 배포완료, 마감됨)

hwp_template_url (VARCHAR): 원본 사업계획서/지원서 양식 파일(HWP/PDF) 링크

✍️ [테이블 3] applications (지원 현황 및 AI 작성 데이터 테이블)
유저가 특정 공고에 매칭되어 수수료를 결제하고, AI가 작성한 지원서 초안 데이터를 저장하는 곳입니다. (수익 창출의 핵심 테이블)

id (UUID, Primary Key): 지원 내역 고유 식별자

user_id (UUID, Foreign Key): users 테이블 참조

grant_id (UUID, Foreign Key): grants 테이블 참조

status (VARCHAR): 진행 상태 (스크랩됨, 결제대기, 결제완료, AI작성중, 최종완료)

payment_status (BOOLEAN): 수수료 결제 완료 여부 (True/False)

user_keywords (JSONB): 유저가 에디터 좌측에 입력한 키워드들 (예: {"item": "수제 마카롱", "target": "20대 여성"})

ai_generated_content (TEXT 또는 JSONB): AI가 키워드를 바탕으로 생성한 사업계획서 본문 데이터

updated_at (TIMESTAMP): 최근 저장/수정 일시

💡 데이터베이스 설계 핵심 포인트 (개발자 전달용)
업력과 나이는 '계산' 가능하게: 나이나 업력(예: 3년 미만, 만 39세 이하)은 시간이 지남에 따라 변하므로, DB에는 '개월 수'나 '나이'를 직접 적지 않고 반드시 **생년월일(birth_date)과 개업일(established_date)**로 저장하여 매칭 시점에 실시간으로 계산해야 합니다.

유연한 조건 관리를 위한 JSONB 활용: 지원사업마다 필터링 조건(지역, 특정 우대사항 등)이 매우 다양하므로, 고정된 컬럼보다는 유연하게 확장할 수 있는 JSONB 타입(PostgreSQL 등 지원)을 활용해 조건을 담아두는 것이 관리하기 좋습니다.
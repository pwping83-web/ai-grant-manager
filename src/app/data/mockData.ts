export interface Grant {
  id: string;
  title: string;
  organization: string;
  category: string;
  deadline: string;
  dDay: number;
  maxAmount: string;
  maxAmountNum: number;
  matchRate: number;
  matchReasons: string[];
  status: 'open' | 'closing' | 'closed';
  description: string;
  eligibility: string[];
  benefits: string[];
  requiredDocs: string[];
  timeline: { date: string; label: string; done: boolean }[];
  scraped?: boolean;
  /** 원문 공고 URL (원문 보기 버튼 연결) */
  source_url?: string;
}

export type PlanType = 'free' | 'standard' | 'premium';

export interface SubscriptionState {
  plan: PlanType;
  aiGenerationsUsed: number;   // 이번 달 사용 횟수
  aiGenerationsLimit: number;  // -1 = 무제한
  expertReviewAvailable: boolean;
}

export interface UserProfile {
  name: string;
  businessName: string;
  businessType: string;
  region: string;
  subRegion: string;
  yearsInBusiness: number;
  employees: number;
  annualRevenue: string;
  industry: string;
  birthYear: number;
  gender: string;
}

export const mockSubscription: SubscriptionState = {
  plan: 'standard',
  aiGenerationsUsed: 2,
  aiGenerationsLimit: 3,  // 스탠다드: 월 3회
  expertReviewAvailable: false,  // 프리미엄 전용
};

export const planConfig = {
  free: { price: 0, aiLimit: 0, expertReview: false, label: '무료' },
  standard: { price: 29000, aiLimit: 3, expertReview: false, label: '스탠다드' },
  premium: { price: 89000, aiLimit: -1, expertReview: true, label: '프리미엄' },
};

export const mockUser: UserProfile = {
  name: '김민수',
  businessName: '민수테크',
  businessType: '초기 창업자',
  region: '경기도',
  subRegion: '성남시',
  yearsInBusiness: 1,
  employees: 3,
  annualRevenue: '5천만원 미만',
  industry: 'IT/소프트웨어',
  birthYear: 1993,
  gender: '남성',
};

export const mockGrants: Grant[] = [
  {
    id: '1',
    title: '2026년 초기창업패키지',
    organization: '중소벤처기업부',
    category: '창업지원',
    deadline: '2026-04-15',
    dDay: 39,
    maxAmount: '1억원',
    maxAmountNum: 100000000,
    matchRate: 95,
    matchReasons: ['경기 지역 조건 충족', '창업 1년차 조건 충족', 'IT/소프트웨어 업종 적합'],
    status: 'open',
    source_url: 'https://www.k-startup.go.kr/common/announcement/announcementList.do',
    description: '혁신적인 기술 아이디어를 보유한 초기 창업자(3년 이내)를 대상으로 사업화 자금, 멘토링, 교육 등을 종합 지원하는 프로그램입니다.',
    eligibility: ['창업 3년 이내 기업', '대표자 만 39세 이하', '기술 기반 창업 아이템 보유', '타 창업패키지 미수혜'],
    benefits: ['사업화 자금 최대 1억원', '전담 멘토 매칭', '공유오피스 입주 지원', '후속 투자 연계'],
    requiredDocs: ['사업계획서', '사업자등록증 사본', '대표자 이력서', '기술 관련 증빙서류'],
    timeline: [
      { date: '2026-03-01', label: '공고 오픈', done: true },
      { date: '2026-03-15', label: '온라인 접수 시작', done: true },
      { date: '2026-04-15', label: '접수 마감', done: false },
      { date: '2026-05-10', label: '서류 심사 결과', done: false },
      { date: '2026-06-01', label: '대면 평가', done: false },
      { date: '2026-07-01', label: '최종 선정', done: false },
    ],
  },
  {
    id: '2',
    title: '경기도 청년창업사관학교',
    organization: '경기도경제과학진흥원',
    category: '교육/멘토링',
    deadline: '2026-03-20',
    dDay: 13,
    maxAmount: '5천만원',
    maxAmountNum: 50000000,
    matchRate: 88,
    matchReasons: ['경기도 소재 기업', '청년 창업자 대상', 'IT 분야 우대'],
    status: 'closing',
    source_url: 'https://www.gbed.or.kr',
    description: '경기도 소재 청년 창업자를 대상으로 입주 공간, 창업 교육, 멘토링, 사업화 자금을 지원합니다.',
    eligibility: ['만 39세 이하 청년', '경기도 소재 또는 이전 가능', '창업 3년 이내'],
    benefits: ['사업화 자금 최대 5천만원', '무상 입주 공간(1년)', '전문 멘토링 12회', '데모데이 참여 기회'],
    requiredDocs: ['창업사업계획서', '사업자등록증', '주민등록등본', '4대 보험 가입 확인서'],
    timeline: [
      { date: '2026-02-20', label: '공고 오픈', done: true },
      { date: '2026-03-01', label: '온라인 접수 시작', done: true },
      { date: '2026-03-20', label: '접수 마감', done: false },
      { date: '2026-04-10', label: '1차 서류 심사', done: false },
      { date: '2026-05-01', label: '2차 면접 심사', done: false },
    ],
  },
  {
    id: '3',
    title: '소상공인 디지털전환 지원사업',
    organization: '소상공인시장진흥공단',
    category: '디지털전환',
    source_url: 'https://www.sbc.or.kr',
    deadline: '2026-05-31',
    dDay: 85,
    maxAmount: '3천만원',
    maxAmountNum: 30000000,
    matchRate: 72,
    matchReasons: ['IT 업종 해당', '소규모 인력 조건 충족'],
    status: 'open',
    description: '소상공인의 디지털 전환을 촉진하기 위해 스마트 기기, 온라인 판로 개척, 데이터 활용 등을 지원합니다.',
    eligibility: ['소상공인 확인서 발급 가능', '상시근로자 5인 미만', '사업자등록 후 6개월 이상'],
    benefits: ['디지털 전환 컨설팅', '스마트 기기 도입비(최대 3천만원의 70%)', '온라인 판로 지원'],
    requiredDocs: ['소상공인 확인서', '사업계획서', '사업자등록증', '매출 증빙서류'],
    timeline: [
      { date: '2026-03-15', label: '1차 접수 시작', done: false },
      { date: '2026-05-31', label: '1차 접수 마감', done: false },
      { date: '2026-07-01', label: '2차 접수 시작', done: false },
    ],
  },
  {
    id: '4',
    title: '여성기업 특별지원 프로그램',
    organization: '여성기업종합지원센터',
    category: '특화지원',
    source_url: 'https://www.wom.or.kr',
    deadline: '2026-04-30',
    dDay: 54,
    maxAmount: '8천만원',
    maxAmountNum: 80000000,
    matchRate: 45,
    matchReasons: ['창업 1년차 조건 충족'],
    status: 'open',
    description: '여성 대표 기업을 대상으로 경영 안정화, 판로 개척, 기술개발 등을 종합 지원합니다.',
    eligibility: ['여성 대표 기업', '창업 7년 이내', '제조업 또는 지식서비스업'],
    benefits: ['경영 안정 자금', '전시회/박람회 참가 지원', '기술개발 자금'],
    requiredDocs: ['사업계획서', '여성기업 확인서', '사업자등록증'],
    timeline: [
      { date: '2026-03-10', label: '공고 오픈', done: true },
      { date: '2026-04-30', label: '접수 마감', done: false },
    ],
  },
  {
    id: '5',
    title: '혁신형 소상공인 육성사업',
    organization: '중소벤처기업부',
    category: '성장지원',
    source_url: 'https://www.mss.go.kr',
    deadline: '2026-06-15',
    dDay: 100,
    maxAmount: '2억원',
    maxAmountNum: 200000000,
    matchRate: 68,
    matchReasons: ['IT 업종 해당', '소규모 기업 조건 충족', '혁신성장 아이템 보유'],
    status: 'open',
    description: '혁신적인 아이디어와 성장 잠재력을 가진 소상공인을 선발하여 스케일업을 지원합니다.',
    eligibility: ['소상공인 확인서 발급 가능', '혁신 아이디어 보유', '매출 1억원 이상'],
    benefits: ['사업화 자금 최대 2억원', 'R&D 지원', '해외 판로 개척'],
    requiredDocs: ['혁신사업계획서', '소상공인 확인서', '재무제표', '매출 증빙'],
    timeline: [
      { date: '2026-04-01', label: '공고 오픈', done: false },
      { date: '2026-06-15', label: '접수 마감', done: false },
    ],
  },
  {
    id: '7',
    title: '안양시 소상공인 창업·경영지원사업',
    organization: '안양시',
    category: '창업지원',
    source_url: 'https://www.anyang.go.kr/main/contents/view.do?menuKey=234',
    deadline: '2026-05-15',
    dDay: 69,
    maxAmount: '2천만원',
    maxAmountNum: 20000000,
    matchRate: 92,
    matchReasons: ['안양시 소재 사업자', '소상공인 대상', 'F&B·카페 업종 지원'],
    status: 'open',
    description: '안양시에 사업자등록을 한 소상공인을 대상으로 창업·경영 안정화 자금, 간판 지원, 마케팅 비용 등을 지원합니다. 지역 상권 활성화를 위한 맞춤형 지원사업입니다.',
    eligibility: ['안양시에 사업장 소재', '소상공인 확인서 발급 가능', '사업자등록 후 7년 이내'],
    benefits: ['창업·경영 자금 최대 2천만원', '간판 제작비 50% 지원', '온라인 마케팅 비용 지원', '경영 컨설팅 무료 제공'],
    requiredDocs: ['사업계획서', '소상공인 확인서', '사업자등록증', '임대차계약서'],
    timeline: [
      { date: '2026-04-01', label: '접수 시작', done: false },
      { date: '2026-05-15', label: '접수 마감', done: false },
      { date: '2026-06-20', label: '심사 결과 통보', done: false },
    ],
  },
  {
    id: '8',
    title: '소상공인 전기요금 지원사업',
    organization: '한국전력공사',
    category: '에너지지원',
    deadline: '2026-06-30',
    dDay: 115,
    maxAmount: '연 600만원',
    maxAmountNum: 6000000,
    matchRate: 88,
    matchReasons: ['소상공인 대상', '전기요금 감면 지원', '사업장 사용 전력 지원'],
    status: 'open',
    description: '소상공인 사업장의 전기요금 부담을 경감하기 위한 지원사업입니다. 저압 일반용·간이요금제 사업자를 대상으로 전기요금의 일부를 감면해 드립니다.',
    eligibility: ['소상공인 확인서 발급 가능', '사업장 전기 사용(저압 일반·간이요금제)', '연매출 1억 5천만원 미만'],
    benefits: ['전기요금 월 최대 50만원 감면', '연간 최대 600만원 지원', '신청 시 당월부터 적용'],
    requiredDocs: ['소상공인 확인서', '사업자등록증', '전기요금 고지서', '전기 사용량 확인서'],
    timeline: [
      { date: '2026-01-01', label: '연중 상시 접수', done: true },
      { date: '2026-06-30', label: '1차 분기 마감', done: false },
      { date: '2026-12-31', label: '연간 지원 마감', done: false },
    ],
    source_url: 'https://cyber.kepco.co.kr/ckepco/front/jsp/CY/E/E/CYEEHP00101.jsp',
  },
  {
    id: '9',
    title: '안양시 상권활성화 콘텐츠 제작 지원',
    organization: '안양시 상권진흥과',
    category: '마케팅지원',
    source_url: 'https://www.anyang.go.kr/main/contents/view.do?menuKey=234',
    deadline: '2026-04-30',
    dDay: 54,
    maxAmount: '1천만원',
    maxAmountNum: 10000000,
    matchRate: 90,
    matchReasons: ['안양시 소재', '소상공인 마케팅 지원', '콘텐츠·SNS 제작 지원'],
    status: 'open',
    description: '안양시 상인회 회원사를 대상으로 SNS·영상 콘텐츠 제작비, 광고비, 프로모션 비용 등을 지원합니다. 지역 상권 홍보와 함께 매장 소개 콘텐츠를 제작해 드립니다.',
    eligibility: ['안양시 상인회 가입 또는 상권 내 사업자', '소상공인 확인서 발급 가능', '온·오프라인 판매 혼합 가능'],
    benefits: ['콘텐츠 제작비 최대 1천만원', 'SNS 광고비 70% 지원', '지역축제·이벤트 협찬'],
    requiredDocs: ['사업계획서', '소상공인 확인서', '상인회 가입증명', '사업자등록증'],
    timeline: [
      { date: '2026-03-15', label: '공고 오픈', done: false },
      { date: '2026-04-30', label: '접수 마감', done: false },
    ],
  },
  {
    id: '10',
    title: '소상공인 배달비 지원사업',
    organization: '소상공인시장진흥공단',
    category: '판로지원',
    source_url: 'https://www.sbc.or.kr',
    deadline: '2026-05-31',
    dDay: 85,
    maxAmount: '300만원',
    maxAmountNum: 3000000,
    matchRate: 92,
    matchReasons: ['소상공인 대상', '배달 플랫폼 이용 사업자', 'F&B·카페 업종 지원'],
    status: 'open',
    description: '배달의민족, 요기요, 쿠팡이츠 등 배달 플랫폼을 이용하는 소상공인·자영업자의 배달비 부담을 경감하기 위한 지원사업입니다. 배달 수수료 일부를 지원합니다.',
    eligibility: ['소상공인 확인서 발급 가능', '배달 플랫폼 가입·매출 발생', '연매출 1억 5천만원 미만'],
    benefits: ['배달비 월 최대 25만원 지원', '분기별 정산 지원', '연간 최대 300만원'],
    requiredDocs: ['소상공인 확인서', '사업자등록증', '배달 플랫폼 매출 증빙', '통장 사본'],
    timeline: [
      { date: '2026-04-01', label: '접수 시작', done: false },
      { date: '2026-05-31', label: '접수 마감', done: false },
    ],
  },
  {
    id: '12',
    title: '공동주택 관리지원사업',
    organization: '한국주택관리사협회',
    category: '관리지원',
    source_url: 'https://www.khma.or.kr',
    deadline: '2026-05-31',
    dDay: 85,
    maxAmount: '1천만원',
    maxAmountNum: 10000000,
    matchRate: 88,
    matchReasons: ['공동주택 관리 업무 지원', '문서·행정 작업 대행 가능', '소상공인·개인사업자 대상'],
    status: 'open',
    description: '공동주택 관리지원을 위한 문서 작성, 입주자대표회의 지원, 관리비 정산 등 행정 업무 대행 사업자를 육성·지원합니다. 관리지원 분야 진출을 준비 중인 사업자에게 적합합니다.',
    eligibility: ['소상공인 또는 개인사업자', '관리 관련 자격·경험 우대', '사업자등록 7년 이내'],
    benefits: ['관리지원 업무 교육 무료', '입찰·계약 지원', '연간 최대 1천만원 사업비 지원'],
    requiredDocs: ['사업계획서', '사업자등록증', '관리 관련 경력 증빙', '소상공인 확인서'],
    timeline: [
      { date: '2026-04-01', label: '접수 시작', done: false },
      { date: '2026-05-31', label: '접수 마감', done: false },
      { date: '2026-06-20', label: '선정 결과', done: false },
    ],
  },
  {
    id: '13',
    title: '노후주택 수리 지원사업 (주민동의 기반)',
    organization: '한국주택협회',
    category: '주거지원',
    source_url: 'https://www.molit.go.kr/portal.do',
    deadline: '2026-06-30',
    dDay: 115,
    maxAmount: '단지별 수억원',
    maxAmountNum: 500000000,
    matchRate: 90,
    matchReasons: ['공동주택 동대표·관리지원 연관', '주민 동의 시 노후 수리 지원', '인천 중구·서구 포함 지역 지원'],
    status: 'open',
    description: '공동주택 주민들의 동의를 받아 노후주택(공동주택) 수리·정비·리모델링 비용을 지원합니다. 동대표나 관리사가 주민 동의 절차를 진행한 뒤 신청 가능합니다. 인천 등 전국 단지 대상.',
    eligibility: ['공동주택 입주자대표회의 동의', '노후도·위험도 평가 통과', '관리규약 상 정비사업 계획'],
    benefits: ['노후 수리비 일부 국비 지원', '리모델링·대수선 비용 감면', '주민 부담 최소화'],
    requiredDocs: ['입주자 동의서', '정비계획서', '관리규약', '노후도 평가서'],
    timeline: [
      { date: '2026-01-01', label: '연중 상시 접수', done: true },
      { date: '2026-06-30', label: '상반기 마감', done: false },
      { date: '2026-12-31', label: '연간 지원 마감', done: false },
    ],
  },
  {
    id: '11',
    title: '소상공인 마케팅 지원사업',
    organization: '소상공인시장진흥공단',
    category: '마케팅지원',
    source_url: 'https://www.sbc.or.kr',
    deadline: '2026-06-15',
    dDay: 100,
    maxAmount: '500만원',
    maxAmountNum: 5000000,
    matchRate: 90,
    matchReasons: ['소상공인 대상', '온·오프라인 마케팅 비용 지원', '카페·음식업 지원'],
    status: 'open',
    description: '소상공인·자영업자의 온라인·오프라인 마케팅 비용을 지원합니다. SNS 광고, 인쇄물, 지역 홍보 등 마케팅 활동에 드는 비용의 일부를 지원합니다.',
    eligibility: ['소상공인 확인서 발급 가능', '사업자등록 후 7년 이내', '연매출 1억 5천만원 미만'],
    benefits: ['마케팅 비용 최대 500만원 지원', 'SNS·영상 광고비 70% 지원', '리플렛·간판 제작비 지원'],
    requiredDocs: ['사업계획서', '소상공인 확인서', '사업자등록증', '마케팅 계획서'],
    timeline: [
      { date: '2026-04-15', label: '공고 오픈', done: false },
      { date: '2026-06-15', label: '접수 마감', done: false },
    ],
  },
  {
    id: '6',
    title: 'K-스타트업 그랜드챌린지',
    organization: 'NIPA 정보통신산업진흥원',
    category: '글로벌',
    source_url: 'https://www.k-startup.go.kr',
    deadline: '2026-04-01',
    dDay: 25,
    maxAmount: '3억원',
    maxAmountNum: 300000000,
    matchRate: 82,
    matchReasons: ['IT/소프트웨어 업종 최적', '글로벌 진출 의지', '기술 기반 스타트업'],
    status: 'open',
    description: '글로벌 시장 진출을 목표로 하는 IT 스타트업을 대상으로 한국 시장 진입 및 사업화를 지원합니다.',
    eligibility: ['IT/SW 기반 스타트업', '글로벌 진출 의지', 'MVP 보유'],
    benefits: ['사업화 자금 최대 3억원', '한국 사무공간 제공', '비자 지원', '네트워킹 행사'],
    requiredDocs: ['사업계획서(영문)', '회사소개서', 'MVP 데모', '팀 이력서'],
    timeline: [
      { date: '2026-03-01', label: '접수 시작', done: true },
      { date: '2026-04-01', label: '접수 마감', done: false },
      { date: '2026-05-15', label: '서류 심사', done: false },
      { date: '2026-06-20', label: '데모데이', done: false },
    ],
  },
];

export const mockScrapedGrants = ['1', '2', '6'];

export const mockDrafts = [
  { id: 'd1', grantId: '1', grantTitle: '2026년 초기창업패키지', lastEdited: '2026-03-05', progress: 65 },
  { id: 'd2', grantId: '2', grantTitle: '경기도 청년창업사관학교', lastEdited: '2026-03-03', progress: 30 },
];

// Admin mock data
export const adminStats = {
  totalUsers: 12847,
  activeUsers: 3421,
  totalGrants: 156,
  activeGrants: 89,
  aiUsageToday: 1523,
  conversionRate: 34.2,
  monthlyRevenue: 48750000,
  closingGrantsThisWeek: 7,
};

export const adminUsers = [
  { id: 'u1', name: '김민수', email: 'minsu@test.com', plan: '프로', joinDate: '2026-01-15', lastActive: '2026-03-07', grants: 3, businessType: '초기 창업자' },
  { id: 'u2', name: '이서연', email: 'seoyeon@test.com', plan: '무료', joinDate: '2026-02-03', lastActive: '2026-03-06', grants: 1, businessType: '프리랜서' },
  { id: 'u3', name: '박지훈', email: 'jihun@test.com', plan: '프로', joinDate: '2025-12-20', lastActive: '2026-03-07', grants: 5, businessType: '소상공인' },
  { id: 'u4', name: '최유나', email: 'yuna@test.com', plan: '무료', joinDate: '2026-03-01', lastActive: '2026-03-05', grants: 0, businessType: '예비 창업자' },
  { id: 'u5', name: '정태웅', email: 'taewoong@test.com', plan: '엔터프라이즈', joinDate: '2025-11-10', lastActive: '2026-03-07', grants: 8, businessType: '중소기업' },
];

export const aiTemplates = [
  { id: 't1', name: '초기창업패키지 표준 양식', category: '창업지원', lastUpdated: '2026-02-28', usageCount: 432, status: 'active' as const },
  { id: 't2', name: '청년창업사관학교 양식', category: '교육/멘토링', lastUpdated: '2026-03-01', usageCount: 287, status: 'active' as const },
  { id: 't3', name: '소상공인 디지털전환 양식', category: '디지털전환', lastUpdated: '2026-02-15', usageCount: 156, status: 'active' as const },
  { id: 't4', name: 'K-스타트업 영문 양식', category: '글로벌', lastUpdated: '2026-03-05', usageCount: 89, status: 'draft' as const },
];

export const adminAlerts = [
  { id: 'a1', type: 'crawl', message: 'K-Startup 신규 공고 15건 크롤링 완료 (검수 대기)', time: '10분 전', urgent: false },
  { id: 'a2', type: 'cs', message: '환불 요청 CS 문의 3건 미처리', time: '32분 전', urgent: true },
  { id: 'a3', type: 'deadline', message: '이번 주 마감 공고 7건 - 유저 알림 발송 필요', time: '1시간 전', urgent: true },
  { id: 'a4', type: 'system', message: 'AI 초안 생성 응답시간 2.3초로 정상 범위', time: '2시간 전', urgent: false },
  { id: 'a5', type: 'payment', message: '오늘 프리미엄 전환 23건 (전일 대비 +15%)', time: '3시간 전', urgent: false },
];

export const kanbanData = [
  { id: 'k1', userName: '김민수', grantTitle: '초기창업패키지', stage: 'paid', date: '2026-03-06' },
  { id: 'k2', userName: '박지훈', grantTitle: '소상공인 디지털전환', stage: 'ai_draft', date: '2026-03-05' },
  { id: 'k3', userName: '정태웅', grantTitle: 'K-스타트업 그랜드챌린지', stage: 'review', date: '2026-03-04' },
  { id: 'k4', userName: '정태웅', grantTitle: '초기창업패키지', stage: 'done', date: '2026-03-02' },
  { id: 'k5', userName: '박지훈', grantTitle: '청년창업사관학교', stage: 'review', date: '2026-03-06' },
  { id: 'k6', userName: '김민수', grantTitle: '경기도 청년창업사관학교', stage: 'ai_draft', date: '2026-03-07' },
];

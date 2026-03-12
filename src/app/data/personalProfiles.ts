/**
 * 개인용 프로필 (로그인 없이 사용)
 * - 김기쁨 사장님, 박원평 사장님
 */

export interface PersonalProfile {
  id: string;
  name: string;
  birthYear: number;
  gender: '남성' | '여성';
  isYouth: boolean; // 청년 대상 아님
  businessName: string;
  region: string;
  subRegion: string;
  employees: number; // 상시근로자 수 (0 = 1인 사업, 2 = 3인 미만 등)
  description: string;
  keywords: string[]; // 매칭용 키워드 (지원금 필터링)
}

export const personalProfiles: PersonalProfile[] = [
  {
    id: 'kim',
    name: '김기쁨',
    birthYear: 1983,
    gender: '여성',
    isYouth: false,
    businessName: '안양 브런치 카페',
    region: '경기도',
    subRegion: '안양시 동안구',
    employees: 2, // 3인 미만
    description: '배달의 민족 + 오프라인 브런치(음식·커피). 일반 사업자. 연매출 1억 5천만원 미만. 국내산 쌀로 빵 제조. 쌀가루 지원, 간판 지원, 안양 컨텐츠 지원, 안양시 지원정보, 소상공인 전기지원금 등 모든 맞춤 지원사업 정보 원함.',
    keywords: ['소상공인', '카페', '음식', 'F&B', '창업', '브런치', '쌀', '쌀가루', '간판', '컨텐츠', '안양', '안양시', '동안구', '경기도', '전기', '전기지원금', '소상공인 전기'],
  },
  {
    id: 'park',
    name: '박원평',
    birthYear: 1983,
    gender: '남성',
    isYouth: false,
    businessName: '마카롱프린터기 제조·렌탈',
    region: '인천광역시',
    subRegion: '중구',
    employees: 0, // 1인 사업
    description: '마카롱 프린터기 제조·렌탈·수리. 개인사업자. 번외: 미장·견출·방수 사업, 공동주택 관리지원 문서 작업대행 준비 중. 동대표 업무 수행. 인천 중구 소재. 인천시·인천 중구 지원사업(창업·경영·소상공인·공동주택관리·노후주택 수리 등) 관련 정보 필요. 연매출 5천만원 이하.',
    keywords: ['인천', '인천시', '인천중구', '중구', '제조', '렌탈', '소상공인', '개인사업자', '창업', '관리', '문서', '미장', '견출', '방수', '공동주택', '관리지원', '노후주택', '수리', '주민동의', '동대표', '리모델링', '정비'],
  },
];

export const getProfileById = (id: string) => personalProfiles.find((p) => p.id === id);

/** 프로필별 맞춤 혜택 요약 (직원·간판·쌀 등 한눈에) */
export const profileBenefitHighlights: Record<string, { title: string; items: string[] }[]> = {
  kim: [
    {
      title: '직원 쓰면 받는 혜택',
      items: [
        '6개월 이상 고용 시 60만원/인 지원 (청년고용지원금 등)',
        '신규 채용 시 인건비·교육비 일부 지원 (지역별 상이)',
        '상시근로자 5인 미만 소상공인 청년·여성 채용 시 추가 지원',
      ],
    },
    {
      title: '간판 지원',
      items: [
        '간판 제작비 50% 지원 (안양시 창업·경영지원)',
        '소상공인 확인서 발급 가능 시 간판 비용 일부 국비·지자체 지원',
      ],
    },
    {
      title: '국내산 쌀·쌀가루 지원',
      items: [
        '국내산 쌀 사용 사업자 대상 쌀가루·원료비 지원 프로그램',
        '빵·제과 제조 시 국산 쌀가루 사용 확대 보조금 (농식품부·지자체)',
      ],
    },
    {
      title: '기타 맞춤 혜택',
      items: [
        '전기요금 월 최대 50만원 감면 (소상공인 전기지원)',
        '배달비 월 최대 25만원 지원 (배달 플랫폼 이용 시)',
        '마케팅·콘텐츠 제작비 지원 (SNS 광고 70% 등)',
      ],
    },
  ],
  park: [],
};

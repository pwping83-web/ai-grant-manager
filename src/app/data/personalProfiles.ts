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
    subRegion: '안양시',
    description: '배달의 민족 + 오프라인 브런치(음식·커피). 일반 사업자. 연매출 1억 5천만원 미만. 국내산 쌀로 빵 제조. 쌀가루 지원, 간판 지원, 안양 컨텐츠 지원, 안양시 지원정보, 소상공인 전기지원금 등 모든 맞춤 지원사업 정보 원함.',
    keywords: ['소상공인', '카페', '음식', 'F&B', '창업', '브런치', '쌀', '쌀가루', '간판', '컨텐츠', '안양', '안양시', '경기도', '전기', '전기지원금', '소상공인 전기'],
  },
  {
    id: 'park',
    name: '박원평',
    birthYear: 1983,
    gender: '남성',
    isYouth: false,
    businessName: '마카롱프린터기 제조·렌탈',
    region: '인천광역시',
    subRegion: '중구 운북동',
    description: '마카롱 프린터기 제조·렌탈·수리. 개인사업자. 번외: 미장·견출·방수 사업, 공동주택 관리지원 문서 작업대행 준비 중. 연매출 5천만원 이하.',
    keywords: ['제조', '렌탈', '소상공인', '개인사업자', '창업', '인천', '관리', '문서', '미장', '견출', '방수'],
  },
];

export const getProfileById = (id: string) => personalProfiles.find((p) => p.id === id);

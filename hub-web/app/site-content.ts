export type SEOConfig = {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonical: string;
};

export type Site = {
  id: string;
  slug: string;
  nameKo: string;
  template: 'HUB' | 'MAJOR' | 'ETC';
  domain: string;
  phone: string;
  primaryField?: string;
  externalUrl?: string;
  seo: SEOConfig;
};

export type Field = {
  id: string;
  slug: string;
  name: string;
  group: string;
  description: string;
  keywords: string[];
  siteId: string;
  href: string;
  externalUrl: string;
  caseCount: number;
};

export type Lawyer = {
  id: string;
  name: string;
  title: string;
  headline: string;
  fields: string[];
  badges: string[];
  image: string;
  career: string[];
  priority: number;
};

export type Case = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  result: string;
  field: string;
  siteId: string;
  pinnedOrder?: number;
  publishedAt: string;
};

export type Insight = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  author: string;
  field: string;
  type: '사례분석' | '법률정보' | '법률지식인';
  pinnedOrder?: number;
  publishedAt: string;
};

export type Review = {
  id: string;
  title: string;
  body: string;
  field: string;
  featuredOnMain: boolean;
};

export type Branch = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
};

export type HeroSlide = {
  id: string;
  image: string;
  eyebrow: string;
  title: string;
  lead: string;
};

export type MainSectionConfig = {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
};

export const baseUrl = 'https://www.ohyunlaw.com';

export const hubSite: Site = {
  id: 'hub',
  slug: 'hub',
  nameKo: '법무법인 오현',
  template: 'HUB',
  domain: 'www.ohyunlaw.com',
  phone: '1661-2661',
  seo: {
    title: '법무법인 오현 | 형사·민사·경제범죄 법률상담',
    description: '법무법인 오현은 형사, 민사, 경제범죄, 이혼, 부동산 등 주요 분야의 업무사례와 변호사, 법률정보, 전국 상담을 제공합니다.',
    keywords: ['법무법인 오현', '오현 변호사', '형사변호사', '민사변호사', '경제범죄 변호사', '법률상담'],
    ogImage: '/reference-assets/ohyun/homepage-07.png',
    canonical: '/'
  }
};

export const sites: Site[] = [
  hubSite,
  { id: 'criminal', slug: 'criminal', nameKo: '형사그룹', template: 'MAJOR', domain: 'ohcrime.com', phone: '1661-2661', primaryField: 'criminal', externalUrl: 'http://ohcrime.com/', seo: seo('형사그룹', '형사 사건 초기 대응과 재판 전략을 제공하는 오현 형사그룹입니다.', ['형사변호사', '형사전문', '구속영장']) },
  { id: 'civil', slug: 'civil', nameKo: '민사그룹', template: 'MAJOR', domain: 'ohyunlaw-civil.com', phone: '1661-2661', primaryField: 'civil', seo: seo('민사그룹', '계약, 손해배상, 부동산 분쟁을 다루는 오현 민사그룹입니다.', ['민사변호사', '손해배상', '계약분쟁']) },
  { id: 'economic', slug: 'economic', nameKo: '경제범죄그룹', template: 'MAJOR', domain: '경제범죄변호사.com', phone: '1661-2661', primaryField: 'economic', externalUrl: 'http://xn--289aq8y23acf26qh8m0eu7cy75e.com/', seo: seo('경제범죄그룹', '사기, 횡령, 배임 등 경제범죄 사건을 다루는 오현 경제범죄그룹입니다.', ['경제범죄', '사기죄', '횡령죄']) }
];

function seo(name: string, description: string, keywords: string[]): SEOConfig {
  return {
    title: `법무법인 오현 ${name}`,
    description,
    keywords,
    ogImage: '/reference-assets/ohyun/homepage-13.jpg',
    canonical: '/'
  };
}

const fieldNames = [
  ['criminal', '형사', '형사·수사', '수사 초기 대응, 구속영장, 재판 전략', 'criminal', 'http://ohcrime.com/'],
  ['economic', '경제범죄', '형사·수사', '사기, 횡령, 배임, 금융범죄 대응', 'economic', 'http://xn--289aq8y23acf26qh8m0eu7cy75e.com/'],
  ['civil', '민사', '민사·분쟁', '계약, 손해배상, 부동산 분쟁 해결', 'civil', '/fields/civil'],
  ['traffic', '교통범죄', '형사·수사', '음주운전, 교통사고, 뺑소니 대응', 'criminal', 'https://xn--9d0bt7xv7a0xhrplktodoh.com/'],
  ['defamation', '명예훼손', '형사·수사', '온라인 명예훼손과 모욕 사건 대응', 'criminal', 'http://xn--v42bwm31b0xhr6ad2owudf72bjpb.com/'],
  ['family', '이혼·가사·상속', '가사·상속', '이혼, 재산분할, 양육권, 상속 분쟁', 'family', 'http://xn--z92b21ac0glcu4c81v42af54f4a.com/'],
  ['real-estate', '부동산', '민사·분쟁', '임대차, 매매, 개발, 공사대금 분쟁', 'real-estate', 'http://xn--2q1bv3lv7a4vd0jva642kfv1a.com/'],
  ['drug', '마약', '형사·수사', '마약 투약, 유통, 수사 대응', 'criminal', 'http://ohdcrime.com/'],
  ['appeal', '추심', '민사·분쟁', '채권추심, 지급명령, 강제집행', 'civil', 'http://www.ohchusim.com/'],
  ['sex-crime', '성범죄', '형사·수사', '성범죄 고소·피의자 방어와 피해자 조력', 'criminal', 'http://ohscrime.com/'],
  ['rehabilitation', '회생·파산', '기업·금융', '개인회생, 법인회생, 파산 절차', 'civil', 'http://xn--h49ap70b6yefqr.org/'],
  ['school', '학교폭력', '학교·소년', '학폭위, 소년 사건, 행정심판', 'criminal', 'http://xn--9d0bl9rqnc2zbpxih8m03uftcstc.com/'],
  ['labor', '노동', '기업·금융', '부당해고, 임금, 산업재해, 노무 분쟁', 'civil', 'http://ohlabor.com/'],
  ['military', '군형사·징계', '형사·수사', '군형사, 군징계, 군인 신분 분쟁', 'criminal', 'http://xn--6e0bj5xv7ayxhca193ifyyeia.com/'],
  ['medical', '의료', '전문분야', '의료과실, 손해배상, 의료기관 자문', 'civil', '/fields/medical'],
  ['corporate', '기업법무·M&A', '기업·금융', '계약 검토, M&A, 주주 분쟁, 자문', 'civil', '/fields/corporate'],
  ['tax', '조세', '기업·금융', '조세불복, 세무조사, 조세범 처벌', 'economic', '/fields/tax'],
  ['administrative', '행정', '전문분야', '영업정지, 인허가, 행정심판·소송', 'civil', '/fields/administrative'],
  ['construction', '건설', '민사·분쟁', '공사대금, 하자, 건설 계약 분쟁', 'real-estate', '/fields/construction'],
  ['insurance', '보험', '민사·분쟁', '보험금, 보험사기, 손해사정 분쟁', 'civil', '/fields/insurance'],
  ['ip', '지식재산권', '기업·금융', '상표, 저작권, 영업비밀, 부정경쟁', 'corporate', '/fields/ip'],
  ['digital', '디지털포렌식', '전문분야', '증거보전, 포렌식 분석, 디지털 증거', 'criminal', '/fields/digital'],
  ['juvenile', '소년사건', '학교·소년', '소년보호, 촉법소년, 보호처분 대응', 'criminal', '/fields/juvenile'],
  ['inheritance', '상속', '가사·상속', '유류분, 상속재산분할, 상속회복', 'family', '/fields/inheritance'],
  ['finance', '금융', '기업·금융', '금융분쟁, 투자피해, 불완전판매', 'economic', '/fields/finance'],
  ['industrial', '중대재해', '기업·금융', '중대재해처벌법, 산업안전, 기업 대응', 'corporate', '/fields/industrial']
] as const;

export const fields: Field[] = fieldNames.map((item, index) => ({
  id: item[0],
  slug: item[0],
  name: item[1],
  group: item[2],
  description: item[3],
  siteId: item[4],
  externalUrl: item[5],
  href: `/fields/${item[0]}`,
  caseCount: [1247, 876, 684, 348, 219, 563, 412, 112, 168, 331, 247, 67, 318, 96, 192, 284, 146, 228, 175, 139, 121, 88, 74, 213, 156, 58][index],
  keywords: item[3].split(',').map((value) => value.trim()).slice(0, 3)
}));

export const heroSlides: HeroSlide[] = [
  {
    id: 'main',
    image: '/reference-assets/ohyun/homepage-07.png',
    eyebrow: 'OHYUN LAW FIRM',
    title: '법무법인 오현',
    lead: '형사, 민사, 경제범죄, 가사, 기업법무까지 사건의 시작부터 해결까지 오현이 함께합니다.'
  },
  {
    id: 'case',
    image: '/reference-assets/ohyun/homepage-12.jpg',
    eyebrow: 'CASE DATA',
    title: '사건의 시작부터 결과까지',
    lead: '형사, 민사, 경제범죄, 가사, 기업법무까지 분야별 경험을 통합해 빠르게 탐색합니다.'
  }
];

export const mainSections: MainSectionConfig[] = [
  ['hero', '메인스킨'],
  ['stats', '오현 성과데이터'],
  ['reviews', '의뢰인 후기'],
  ['lawyers', '구성원'],
  ['fields', '업무분야'],
  ['cases', '업무사례'],
  ['branches', '전국지도'],
  ['consultation', '상담예약'],
  ['faq', '법률지식인'],
  ['legalInfo', '법률정보'],
  ['youtube', '유튜브 링크']
].map(([id, label], order) => ({ id, label, enabled: true, order: order + 1 }));

export const stats = [
  { label: '누적 업무사례', value: '8,253+', href: '/cases' },
  { label: '오현소속 변호사수', value: '74+', href: '/lawyers' },
  { label: '전국 분사무소', value: '16+', href: '/about/location' },
  { label: '분야별 센터', value: '26+', href: '/fields' }
];

export const lawyers: Lawyer[] = [
  lawyer('ko-young-seok', '고영석', '대표변호사', '부장판사 출신, 형사·경제범죄 총괄', ['형사', '경제범죄'], ['부장판사', '대표'], 'lawyer-home-01.png', ['서울대학교 법학과', '부장판사 역임', '법무법인 오현 대표변호사'], 1),
  lawyer('hwang-yun-sung', '황윤성', '대표변호사', '검사장 출신, 조세·경제범죄 대응', ['형사', '조세', '경제범죄'], ['검사장', '조세'], 'lawyer-home-02.png', ['서울대학교 법과대학', '검사장 역임', '국제법무·조세 사건 수행'], 2),
  lawyer('lee-yong', '이용', '대표변호사', '경찰 지휘관 출신, 형사·기업 리스크', ['형사', '기업법무'], ['경찰', '기업'], 'lawyer-home-03.png', ['서울대학교 법학전문대학원', '경찰 지휘관 역임', '중요경제범죄 수사 경험'], 3),
  lawyer('kim-chan-woo', '김찬우', '변호사', '차장검사 출신, 공안·형사 사건 대응', ['형사', '공안'], ['차장검사'], 'lawyer-home-04.png', ['검찰 주요 보직 역임', '형사사건 다수 수행'], 4),
  lawyer('lee-tae-hee', '이태희', '변호사', '법원 경력 기반 민사·가사 대응', ['민사', '이혼·가사'], ['법원'], 'lawyer-home-05.png', ['법원 실무 경험', '민사·가사 분쟁 수행'], 5),
  lawyer('bae-soon-chul', '배순철', '변호사', '군사법원 경력, 군형사·징계', ['군형사·징계', '형사'], ['군사법원'], 'lawyer-home-06.png', ['군사법원 경력', '군형사·징계 사건 수행'], 6),
  lawyer('han-gyu-ho', '한규호', '변호사', '형사전문·수사 초기 대응', ['형사', '성범죄'], ['형사전문'], 'lawyer-home-07.png', ['형사사건 다수 수행', '수사 초기 대응 전담'], 7),
  lawyer('lee-chul-geun', '이철근', '변호사', '부장판사 역임, 민사·행정 분쟁', ['민사', '행정'], ['부장판사'], 'lawyer-home-08.png', ['부장판사 역임', '행정·민사 분쟁 수행'], 8)
];

function lawyer(id: string, name: string, title: string, headline: string, fields: string[], badges: string[], file: string, career: string[], priority: number): Lawyer {
  return { id, name, title, headline, fields, badges, image: `/reference-assets/ohyun/lawyers/${file}`, career, priority };
}

export const cases: Case[] = [
  caseItem('case-001', '구속영장 청구 사건에서 초기 자료 정리로 영장 기각', '수사 초기 진술과 객관 자료를 정리해 구속 필요성을 낮춘 사례입니다.', '영장 기각', '형사', 'criminal', 1),
  caseItem('case-002', '투자사기 고소 사건에서 자금 흐름 재구성으로 불송치', '거래 구조와 자금 이동 경로를 정리해 혐의 범위를 축소했습니다.', '불송치', '경제범죄', 'economic', 2),
  caseItem('case-003', '공사대금 분쟁에서 조정 성립으로 조기 종결', '통신 기록과 정산 자료를 바탕으로 실익 있는 조정을 이끌었습니다.', '조정 성립', '민사', 'civil', 3),
  caseItem('case-004', '재산분할 쟁점에서 기여분을 인정받은 사례', '혼인 기간 중 재산 형성 기여도를 입증해 청구를 인용받았습니다.', '청구 인용', '이혼·가사', 'family'),
  caseItem('case-005', '주주 간 분쟁에서 임시 지위 보전', '계약서와 의사록을 정리해 긴급한 회사 운영 리스크를 막았습니다.', '가처분 인용', '기업법무·M&A', 'corporate'),
  caseItem('case-006', '학교폭력 처분 취소를 위한 절차상 하자 입증', '심의 과정의 절차 위반과 사실관계 오류를 다투었습니다.', '처분 취소', '학교폭력', 'school')
];

function caseItem(id: string, title: string, summary: string, result: string, field: string, siteId: string, pinnedOrder?: number): Case {
  return { id, slug: id, title, summary, result, field, siteId, pinnedOrder, publishedAt: '2026-05-01' };
}

export const insights: Insight[] = [
  { id: 'trend-001', slug: 'warrant-defense', type: '사례분석', title: '영장실질심사 전 가장 먼저 정리해야 할 방어 자료', summary: '구속영장 단계에서 결과를 좌우하는 자료와 진술 정리 기준입니다.', author: '고영석', field: '형사', pinnedOrder: 1, publishedAt: '2026-05-06' },
  { id: 'trend-002', slug: 'fraud-flow', type: '사례분석', title: '사기 사건에서 자금 흐름이 혐의 판단에 미치는 영향', summary: '투자·대여·동업 관계가 섞인 사건에서 자금 흐름을 해석하는 방식입니다.', author: '황윤성', field: '경제범죄', pinnedOrder: 2, publishedAt: '2026-05-04' },
  { id: 'info-001', slug: 'inheritance-evidence', type: '법률정보', title: '상속 분쟁에서 증거 관리가 결과를 바꾸는 지점', summary: '유류분과 상속재산분할에서 미리 확보할 자료를 안내합니다.', author: '이태희', field: '상속', publishedAt: '2026-04-28' },
  { id: 'faq-001', slug: 'police-questioning', type: '법률지식인', title: '경찰 조사를 앞두고 변호사 상담이 필요한 시점', summary: '조사 전 상담에서 확인해야 할 혐의, 자료, 진술 방향을 정리합니다.', author: '이용', field: '형사', publishedAt: '2026-04-22' }
];

export const legalInfos = insights.filter((item) => item.type === '법률정보' || item.type === '사례분석');

export const faqs = [
  { id: 'faq-1', category: '형사', question: '경찰 조사 전 어떤 자료를 준비해야 하나요?', answer: '출석요구서, 고소장, 문자·메신저 기록, 송금 내역처럼 사건 흐름을 보여주는 자료를 우선 정리하면 됩니다.' },
  { id: 'faq-2', category: '민사', question: '소송 전에 내용증명을 꼭 보내야 하나요?', answer: '필수는 아니지만 상대방의 입장과 분쟁 쟁점을 확인하는 데 도움이 됩니다. 사건 성격에 따라 바로 소송이 더 적절할 수 있습니다.' },
  { id: 'faq-3', category: '경제범죄', question: '투자사기 사건은 민사와 형사를 같이 진행하나요?', answer: '피해 회복과 형사 책임 추궁의 목적이 다르므로 자료 상태와 상대방 재산 상황을 함께 검토해 병행 여부를 판단합니다.' },
  { id: 'faq-4', category: '상담', question: '온라인 상담만으로 사건 검토가 가능한가요?', answer: '기초 검토는 가능하지만 선임 여부와 전략 수립은 자료 확인 후 전화 또는 대면 상담을 권장합니다.' }
];

export const reviews: Review[] = [
  { id: 'review-1', title: '처음 상담부터 방향이 명확했습니다', body: '사건의 쟁점과 필요한 자료를 바로 정리해 주셔서 불안이 줄었습니다.', field: '형사', featuredOnMain: true },
  { id: 'review-2', title: '진행 상황 공유가 빨랐습니다', body: '매 단계마다 무엇을 준비해야 하는지 알려주셔서 끝까지 믿고 맡길 수 있었습니다.', field: '민사', featuredOnMain: true },
  { id: 'review-3', title: '복잡한 쟁점을 쉽게 설명해 주셨습니다', body: '경제범죄 사건이라 막막했는데 자금 흐름과 증거를 차근차근 설명해 주셨습니다.', field: '경제범죄', featuredOnMain: true },
  { id: 'review-4', title: '급한 일정에도 바로 대응했습니다', body: '조사를 앞두고 시간이 많지 않았는데 필요한 준비를 빠르게 도와주셨습니다.', field: '형사', featuredOnMain: false }
];

export const branches: Branch[] = [
  { id: 'seoul-main', name: '서울 주사무소', city: '서울', address: '서울특별시 서초중앙로 118, 6층 (KAIS빌딩)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'seoul-branch', name: '서울 분사무소', city: '서울', address: '서울특별시 서초구 서초중앙로22길 42, 4층 (동진빌딩)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'incheon', name: '인천 분사무소', city: '인천', address: '인천광역시 미추홀구 소성로 171, 6층 (로시스빌딩)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'gwangju', name: '광주 분사무소', city: '광주', address: '광주광역시 동구 금남로 248, 4층 (천하빌딩)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'busan', name: '부산 분사무소', city: '부산', address: '부산광역시 연제구 법원로 12, 12층 (로윈타워)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'daegu', name: '대구 분사무소', city: '대구', address: '대구광역시 수성구 동대구로 334, 7층 (한국교직원공제회빌딩)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'daejeon', name: '대전 분사무소', city: '대전', address: '대전시 서구 둔산로 123번길 43, 9층 (PJ빌딩)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'suwon', name: '수원 분사무소', city: '수원', address: '수원시 영통구 광교중앙로248번길 101, 6층 (백현법조프라자)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'uijeongbu', name: '의정부 분사무소', city: '의정부', address: '경기도 의정부 신흥로 251, 4층 (구성타워)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'seongnam', name: '성남 분사무소', city: '성남', address: '경기도 성남시 중원구 산성대로 464, 3층', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'changwon', name: '창원 분사무소', city: '창원', address: '경상남도 창원시 성산구 동산로220번길 31, 5층 (동남빌딩)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'pyeongtaek', name: '평택 분사무소', city: '평택', address: '경기도 평택시 평남로 1047-1, 4층 (청언빌딩)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'cheonan', name: '천안 분사무소', city: '천안', address: '충남 천안시 동남구 청수14로96, 2층 (청당동, 백석문화센터)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'ilsan', name: '일산 분사무소', city: '일산', address: '경기도 고양시 일산동구 장백로 208, 8층 (성암빌딩)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'jeonju', name: '전주 분사무소', city: '전주', address: '전북특별자치도 전주시 덕진구 만성동 1366-9, 2층 (H타워)', phone: '1661-2661', hours: '평일 09:00 - 18:00' },
  { id: 'ulsan', name: '울산 분사무소', city: '울산', address: '울산광역시 남구 삼산로 199, 7층 (아이사랑빌딩)', phone: '1661-2661', hours: '평일 09:00 - 18:00' }
];

export const newsItems = [
  { id: 'news-1', type: '언론보도', title: '법무법인 오현, 형사 대응 실무 세미나 진행', date: '2026.05.02' },
  { id: 'news-2', type: '오현소식', title: '전국 분사무소 상담 프로세스 개편 안내', date: '2026.04.18' },
  { id: 'news-3', type: '인재채용', title: '송무·상담 지원 담당자 상시 채용', date: '2026.04.03' },
  { id: 'news-4', type: '공지', title: '야간 긴급 상담 접수 채널 운영 안내', date: '2026.03.25' }
];

export const navigation = [
  { label: '오현소개', href: '/about', children: [{ label: '소개', href: '/about' }, { label: '오현 강점', href: '/about/strength' }, { label: '오시는 길', href: '/about/location' }, { label: '구성원 소개', href: '/lawyers' }] },
  { label: '업무사례', href: '/cases', children: [{ label: '사례분석', href: '/insights' }, { label: '업무사례', href: '/cases' }] },
  { label: '법률정보', href: '/legal-info', children: [{ label: '법률정보', href: '/legal-info' }, { label: '법률지식인', href: '/faq' }] },
  { label: '업무분야', href: '/fields', children: fields.slice(0, 8).map((field) => ({ label: field.name, href: field.href })) },
  { label: '소식', href: '/news', children: [{ label: '의뢰인 후기', href: '/reviews' }, { label: '언론보도', href: '/news' }, { label: '인재채용', href: '/careers' }] },
  { label: '고객상담', href: '/contact', children: [{ label: '온라인 상담', href: '/contact' }, { label: '전화 상담', href: 'tel:16612661' }, { label: '변호사 추천', href: '/lawyers' }] }
];

export const quickLinks = [
  { label: '온라인상담', href: '/contact' },
  { label: '카톡상담', href: 'https://pf.kakao.com/_xgxoTlK/chat' },
  { label: '네이버톡톡', href: '/contact' },
  { label: '전화상담', href: 'tel:16612661' },
  { label: '변호사추천', href: '/lawyers' }
];

export const staticRoutes = [
  ['about'],
  ['about', 'strength'],
  ['about', 'location'],
  ['search']
] as const;

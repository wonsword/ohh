# 법무법인 오현 허브 사이트 SEO 어드민 반영 가이드

이 문서는 어드민에서 콘텐츠를 작성할 때 허브 사이트 SEO에 반영해야 할 필드와 규칙을 정의합니다.

---

## 1. 페이지별 Title 규칙

| 페이지 | Title 형식 | 예시 |
|---|---|---|
| 홈 | 법무법인 오현 \| 형사·민사·경제범죄 법률상담 | (고정) |
| 변호사 목록 | 구성원 소개 \| 법무법인 오현 | (고정) |
| 변호사 상세 | {이름} {직책} \| 구성원 소개 \| 법무법인 오현 | 고영석 대표변호사 \| 구성원 소개 \| 법무법인 오현 |
| 업무사례 목록 | 업무사례 \| 법무법인 오현 | (고정) |
| 업무사례 상세 | {제목} \| 업무사례 \| 법무법인 오현 | 사기죄 무혐의 \| 업무사례 \| 법무법인 오현 |
| 업무분야 상세 | {분야명} 전문 변호사 \| 법무법인 오현 | 형사 전문 변호사 \| 법무법인 오현 |
| 법률정보 목록 | 법률정보 \| 법무법인 오현 | (고정) |
| 법률지식인(FAQ) | 법률지식인 \| 법무법인 오현 | (고정) |
| 온라인 상담 | 온라인 상담 신청 \| 법무법인 오현 | (고정) |

**규칙:** Next.js layout.tsx의 `template: '%s | 법무법인 오현'` 적용 중. 어드민에서 페이지별 `title` 필드를 `%s` 부분만 입력하면 됩니다.

---

## 2. Meta Description 작성 규칙

- **120–160자** 이내
- 핵심 키워드 + 행동 유도 문구 포함
- 각 페이지마다 **고유한 설명** 작성 (중복 금지)

| 콘텐츠 타입 | 템플릿 |
|---|---|
| 변호사 상세 | `{이름} {직책}의 주요 경력과 담당 분야를 확인하세요. {headline}` |
| 업무사례 상세 | `{summary} 법무법인 오현의 {field} 전문 변호사가 담당한 실제 사례입니다.` |
| 업무분야 상세 | `{분야명} 사건 대응 전략과 오현의 전문 변호사를 확인하세요. {description}` |
| 법률정보 상세 | `{title}. {summary} 법무법인 오현 변호사가 직접 작성한 법률정보입니다.` |

---

## 3. Schema Markup 필드 매핑

### LegalService (홈)
```json
{
  "@type": "LegalService",
  "name": "법무법인 오현",
  "telephone": "1661-2661",
  "url": "https://www.ohyunlaw.com",
  "areaServed": "KR",
  "image": "https://www.ohyunlaw.com/reference-assets/ohyun/common/logo.png"
}
```
**어드민 관리 필드:** 전화번호, 주소, 영업시간

---

### Person (변호사 상세)
```json
{
  "@type": "Person",
  "name": "{이름}",
  "jobTitle": "{직책}",
  "worksFor": { "@type": "LegalService", "name": "법무법인 오현" },
  "knowsAbout": ["{분야1}", "{분야2}"],
  "image": "{프로필 이미지 URL}"
}
```
**어드민 필드:**
- `name` — 변호사 이름 (h1 사용)
- `jobTitle` — 직책 (대표변호사 / 변호사)
- `knowsAbout` — 담당 분야 배열 (최대 5개)
- `image` — 프로필 사진 URL

---

### Article (업무사례 / 법률정보 상세)
```json
{
  "@type": "Article",
  "headline": "{제목}",
  "author": { "@type": "Person", "name": "{담당변호사}" },
  "datePublished": "YYYY-MM-DD",
  "description": "{summary}"
}
```
**어드민 필드:**
- `headline` — 글 제목 (h1)
- `author` — 담당 변호사명
- `datePublished` — 작성일 (ISO 형식)
- `description` — 요약문 (Meta Description과 동일 가능)

---

### FAQPage (법률지식인)
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{질문}",
      "acceptedAnswer": { "@type": "Answer", "text": "{답변}" }
    }
  ]
}
```
**어드민 필드:**
- `question` — 질문 (h2 또는 summary 태그)
- `answer` — 답변 (140자 이내 권장)
- `category` — 분야 (형사 / 민사 / 이혼 등)

---

## 4. h1·h2 작성 규칙

| 태그 | 규칙 | 예시 |
|---|---|---|
| h1 | 페이지당 1개, 핵심 키워드 포함 | `고영석 대표변호사`, `형사 업무사례` |
| h2 | 섹션 헤딩, 롱테일 키워드 포함 | `형사·경제범죄 전문 변호사 소개` |
| h3 | 카드 타이틀, 소항목 | `주요 경력`, `담당 분야` |

**주의:** h1은 어드민 제목 필드 = 페이지 h1로 자동 매핑됩니다. 별도 SEO용 h1 필드를 만들면 안 됩니다.

---

## 5. Canonical URL 규칙

모든 페이지에 `<link rel="canonical">` 적용:

| 페이지 | Canonical URL |
|---|---|
| 홈 | `https://www.ohyunlaw.com` |
| 변호사 목록 | `https://www.ohyunlaw.com/lawyers` |
| 변호사 상세 | `https://www.ohyunlaw.com/lawyers/{id}` |
| 업무사례 목록 | `https://www.ohyunlaw.com/cases` |
| 업무사례 상세 | `https://www.ohyunlaw.com/cases/{slug}` |
| 업무분야 상세 | `https://www.ohyunlaw.com/fields/{slug}` |
| 법률정보 | `https://www.ohyunlaw.com/legal-info` |
| 법률지식인 | `https://www.ohyunlaw.com/faq` |

**규칙:** 쿼리스트링(`?field=xxx`)이 붙는 URL은 canonical에서 제외. 필터링은 클라이언트 사이드 처리.

---

## 6. Open Graph 이미지 규칙

- **권장 크기:** 1200×630px
- **기본 OG 이미지:** `/reference-assets/ohyun/common/og-default.png`
- **변호사 상세:** 프로필 사진 사용 가능
- **업무사례 상세:** 분야별 대표 이미지 또는 기본 OG 이미지

**어드민 필드:** 각 콘텐츠 타입에 `ogImage` 필드 추가 필요. 미입력 시 기본 이미지 사용.

---

## 7. 이미지 SEO 체크리스트

- [ ] `alt` 속성: 이미지 내용 설명 (키워드 포함, 50자 이내)
- [ ] 변호사 프로필: `alt="{이름} {직책} 프로필"`
- [ ] 로고: `alt="법무법인 오현"`
- [ ] 배경 이미지 (CSS): `aria-hidden="true"` 처리

---

## 8. 콘텐츠 관리 체크리스트

어드민에서 콘텐츠 등록 시 필수 확인:

- [ ] SEO Title 입력 (50자 이내)
- [ ] Meta Description 입력 (120–160자)
- [ ] Canonical URL 자동 생성 여부 확인
- [ ] Schema 필드 입력 (변호사: knowsAbout / 사례: author, datePublished)
- [ ] OG Image 업로드 또는 기본값 확인
- [ ] h1 텍스트 = 글 제목 일치 여부 확인
- [ ] 배포 후 [schema.org Validator](https://validator.schema.org/) 검증

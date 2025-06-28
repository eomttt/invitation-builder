This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Kakao Map API Setup

이 프로젝트는 카카오 맵 API를 사용합니다. MapSection 컴포넌트를 사용하기 전에 다음 단계를 따라주세요:

1. [Kakao Developers](https://developers.kakao.com/)에서 애플리케이션을 생성합니다.
2. [Kakao Maps API](https://apis.map.kakao.com/)에서 JavaScript 앱 키를 발급받습니다.
3. `.env.local` 파일을 생성하고 API 키를 설정합니다:

```bash
cp .env.local.example .env.local
```

그 후 `.env.local` 파일에서 다음 값들을 설정하세요:

### 필수 설정

- `NEXT_PUBLIC_KAKAO_MAP_API_KEY`: 카카오 맵 JavaScript 앱 키

### 장소 정보 설정 (선택사항)

- `NEXT_PUBLIC_VENUE_NAME`: 돌잔치 장소명
- `NEXT_PUBLIC_VENUE_ADDRESS`: 장소 주소
- `NEXT_PUBLIC_VENUE_PHONE`: 연락처
- `NEXT_PUBLIC_VENUE_LATITUDE`: 위도
- `NEXT_PUBLIC_VENUE_LONGITUDE`: 경도

환경 변수를 설정하면 배포 없이도 장소 정보를 쉽게 변경할 수 있습니다.

## MapSection Component Usage

MapSection 컴포넌트는 돌잔치 장소를 카카오 맵으로 표시하는 컴포넌트입니다:

```tsx
import { MapSection } from '@/components/common/MapSection';

// 기본 사용법
<MapSection />

// 커스텀 설정
<MapSection
  venueName="우리 아이 돌잔치"
  address="서울특별시 강남구 테헤란로 123"
  phoneNumber="02-1234-5678"
  latitude={37.5665}
  longitude={126.978}
/>
```

### Props

- `venueName`: 장소명 (기본값: '돌잔치 장소')
- `address`: 주소 (기본값: '서울특별시 강남구 테헤란로 123')
- `phoneNumber`: 연락처 (기본값: '02-1234-5678')
- `latitude`: 위도 (기본값: 37.5665)
- `longitude`: 경도 (기본값: 126.978)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

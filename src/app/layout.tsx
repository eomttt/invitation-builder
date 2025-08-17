import './globals.css';

import type { Metadata } from 'next';
import {
  Nanum_Myeongjo,
  Noto_Sans_KR,
  Single_Day,
} from 'next/font/google';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
});

const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-nanum-myeongjo',
});

const singleDay = Single_Day({
  weight: ['400'],
  variable: '--font-single-day',
});


export const metadata: Metadata = {
  title: '엄채이의 첫 생일에 초대합니다',
  description:
    '엄채이의 첫 생일을 축하해 주세요! 함께 모여 즐거운 시간을 보내요.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: '엄채이의 첫 생일에 초대합니다',
    description:
      '엄채이의 첫 생일을 축하해 주세요! 함께 모여 즐거운 시간을 보내요.',
    images: [
      {
        url: 'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_6.JPG',
        width: 1200,
        height: 630,
        alt: '현태와 민선의 결혼식 초대장',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '엄채이의 첫 생일에 초대합니다',
    description:
      '엄채이의 첫 생일을 축하해 주세요! 함께 모여 즐거운 시간을 보내요.',
    images: [
      'https://chaei-picture.s3.ap-northeast-2.amazonaws.com/invitation_6.JPG',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} ${nanumMyeongjo.variable} ${singleDay.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

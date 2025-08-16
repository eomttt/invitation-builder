import './globals.css';
import { Noto_Sans_KR, Nanum_Myeongjo, Single_Day } from 'next/font/google';

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
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-single-day',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} ${nanumMyeongjo.variable} ${singleDay.variable} font-sans`}>
        {children}
      </body>
    </html>
    );
}

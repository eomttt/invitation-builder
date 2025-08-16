'use client';

import { useEffect, useRef, useState } from 'react';

import {
  addMarkerClickListener,
  createKakaoInfoWindow,
  createKakaoMap,
  createKakaoMarker,
  loadKakaoMapScript,
} from '../../lib/kakao-map';

// 브랜드 아이콘 컴포넌트들
const TmapIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const KakaoIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
  </svg>
);

const NaverIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
  </svg>
);

interface MapSectionProps {
  venueName?: string;
  address?: string;
  phoneNumber?: string;
  latitude?: number;
  longitude?: number;
}

const MapSection = ({
  venueName = process.env.NEXT_PUBLIC_VENUE_NAME || '돌잔치 장소',
  address = process.env.NEXT_PUBLIC_VENUE_ADDRESS ||
    '서울특별시 강남구 테헤란로 123',
  latitude = Number(process.env.NEXT_PUBLIC_VENUE_LATITUDE) || 37.5665,
  longitude = Number(process.env.NEXT_PUBLIC_VENUE_LONGITUDE) || 126.978,
}: MapSectionProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return;

      try {
        setMapError(null);
        await loadKakaoMapScript();

        const map = createKakaoMap(mapRef.current, latitude, longitude, 3);
        mapInstanceRef.current = map;

        const marker = createKakaoMarker(latitude, longitude, map);

        const infowindowContent = `
          <div style="padding:10px;min-width:200px;">
            <h3 style="margin:0 0 5px 0;font-size:16px;font-weight:bold;">${venueName}</h3>
            <p style="margin:0;font-size:14px;color:#666;">${address}</p>
          </div>
        `;

        const infowindow = createKakaoInfoWindow(infowindowContent);
        addMarkerClickListener(marker, map, infowindow);

        setIsMapLoaded(true);
      } catch (error) {
        console.error('Failed to initialize map:', error);
        setMapError('지도를 불러오는데 실패했습니다.');
      }
    };

    initializeMap();
  }, [latitude, longitude, venueName, address]);

  const handleTmapNavigation = () => {
    // 티맵 길찾기
    const url = `tmap://route?goalname=${encodeURIComponent(venueName)}&goalx=${longitude}&goaly=${latitude}`;
    const webUrl = `https://tmap.life/route/search?goalname=${encodeURIComponent(venueName)}&goalx=${longitude}&goaly=${latitude}`;

    // 모바일에서는 앱 실행 시도, 실패시 웹으로
    window.open(url, '_blank');
    setTimeout(() => window.open(webUrl, '_blank'), 1000);
  };

  const handleNaverNavigation = () => {
    // 네이버 네비 길찾기
    const url = `nmap://route/public?dlat=${latitude}&dlng=${longitude}&dname=${encodeURIComponent(venueName)}`;
    const webUrl = `https://map.naver.com/v5/directions/-/-/-/transit?c=${longitude},${latitude},15,0,0,0,dh`;

    window.open(url, '_blank');
    setTimeout(() => window.open(webUrl, '_blank'), 1000);
  };

  const handleKakaoNavigation = () => {
    // 카카오 네비 길찾기
    const url = `kakaonavi://navigate?ep=${longitude},${latitude}&ename=${encodeURIComponent(venueName)}`;
    const webUrl = `https://map.kakao.com/link/to/${encodeURIComponent(venueName)},${latitude},${longitude}`;

    window.open(url, '_blank');
    setTimeout(() => window.open(webUrl, '_blank'), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-60 px-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h2
            className="font-bold text-gray-800 mb-4 font-nanum-myeongjo"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
          >
            오시는 길
          </h2>
        </div>
        {/* 지도 섹션 */}
        <div className="mb-8">
          <div className="relative">
            <div
              ref={mapRef}
              className="w-full h-96 rounded-lg shadow-lg bg-gray-100"
              style={{ minHeight: '400px' }}
            />

            {!isMapLoaded && !mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-gray-600">지도를 불러오는 중...</p>
                </div>
              </div>
            )}

            {mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <p className="text-red-500 mb-2">{mapError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    다시 시도
                  </button>
                </div>
              </div>
            )}

            {isMapLoaded && (
              <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
                <p className="text-sm text-gray-600">
                  지도를 클릭하여 확대/축소할 수 있습니다
                </p>
              </div>
            )}
          </div>

          {/* 네비게이션 앱 버튼들 */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={handleTmapNavigation}
              className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <TmapIcon className="w-6 h-6 mr-3" />
              <span className="text-lg">티맵으로 길찾기</span>
            </button>

            <button
              onClick={handleKakaoNavigation}
              className="bg-[#FEE500] hover:bg-[#FDD835] text-black font-medium py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <KakaoIcon className="w-6 h-6 mr-3" />
              <span className="text-lg">카카오네비로 길찾기</span>
            </button>

            <button
              onClick={handleNaverNavigation}
              className="bg-[#03C75A] hover:bg-[#00B050] text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <NaverIcon className="w-6 h-6 mr-3" />
              <span className="text-lg">네이버지도로 길찾기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MapSection };

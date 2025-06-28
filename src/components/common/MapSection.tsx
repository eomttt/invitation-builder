'use client';

import { Navigation, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import {
  addMarkerClickListener,
  createKakaoInfoWindow,
  createKakaoMap,
  createKakaoMarker,
  loadKakaoMapScript,
} from '../../lib/kakao-map';

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
  phoneNumber = process.env.NEXT_PUBLIC_VENUE_PHONE || '02-1234-5678',
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

  const handleNavigation = () => {
    // 네비게이션 앱으로 이동
    const url = `https://map.kakao.com/link/to/${venueName},${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const handlePhoneCall = () => {
    // 전화 걸기
    const phone = phoneNumber.replace(/[^0-9]/g, '');
    const url = `tel:${phone}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center mb-60 px-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">오시는 길</h2>
          <p className="text-lg text-gray-600">
            돌잔치 장소로 오시는 방법을 안내드립니다
          </p>
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

          {/* 길찾기 버튼들 */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleNavigation}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Navigation className="w-5 h-5 mr-2" />
              길찾기
            </button>

            <button
              onClick={handlePhoneCall}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              전화하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MapSection };

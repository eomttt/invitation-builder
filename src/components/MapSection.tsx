'use client';

import { useEffect, useRef, useState } from 'react';

import {
  addMarkerClickListener,
  createKakaoInfoWindow,
  createKakaoMap,
  createKakaoMarker,
  loadKakaoMapScript,
} from '../lib/kakao-map';

// 복사 아이콘 컴포넌트
const CopyIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
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
  const [isCopied, setIsCopied] = useState(false);

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

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
      // 클립보드 API가 지원되지 않는 경우 폴백
      const textArea = document.createElement('textarea');
      textArea.value = address;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
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

          {/* 장소 정보 및 복사 버튼 */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{venueName}</h3>
              <p className="text-gray-600 text-base">{address}</p>
            </div>
            
            <button
              onClick={handleCopyAddress}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                isCopied
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              disabled={isCopied}
            >
              <CopyIcon className="w-5 h-5 mr-2" />
              <span>{isCopied ? '복사됨!' : '주소 복사하기'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MapSection };

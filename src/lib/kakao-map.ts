declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (container: HTMLElement, options: unknown) => unknown;
        Marker: new (options: unknown) => unknown;
        InfoWindow: new (options: unknown) => unknown;
        event: {
          addListener: (
            target: unknown,
            type: string,
            handler: () => void
          ) => void;
        };
      };
    };
  }
}

export const KAKAO_MAP_API_KEY =
  process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || '';

export const loadKakaoMapScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        resolve();
      });
    };
    script.onerror = () => {
      reject(new Error('Failed to load Kakao Map script'));
    };
    document.head.appendChild(script);
  });
};

export const createKakaoMap = (
  container: HTMLElement,
  latitude: number,
  longitude: number,
  level: number = 3
) => {
  if (!window.kakao || !window.kakao.maps) {
    throw new Error('Kakao Map SDK not loaded');
  }

  const options = {
    center: new window.kakao.maps.LatLng(latitude, longitude),
    level: level,
  };

  return new window.kakao.maps.Map(container, options);
};

export const createKakaoMarker = (
  latitude: number,
  longitude: number,
  map: unknown
) => {
  if (!window.kakao || !window.kakao.maps) {
    throw new Error('Kakao Map SDK not loaded');
  }

  const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
  const marker = new window.kakao.maps.Marker({
    position: markerPosition,
  });

  (marker as { setMap: (map: unknown) => void }).setMap(map);
  return marker;
};

export const createKakaoInfoWindow = (content: string) => {
  if (!window.kakao || !window.kakao.maps) {
    throw new Error('Kakao Map SDK not loaded');
  }

  return new window.kakao.maps.InfoWindow({
    content: content,
  });
};

export const addMarkerClickListener = (
  marker: unknown,
  map: unknown,
  infowindow: unknown
) => {
  if (!window.kakao || !window.kakao.maps) {
    throw new Error('Kakao Map SDK not loaded');
  }

  window.kakao.maps.event.addListener(marker, 'click', () => {
    (infowindow as { open: (map: unknown, marker: unknown) => void }).open(
      map,
      marker
    );
  });
};

import { useEffect, useRef, useState } from 'react';

export default function KakaoMap({ address }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [mainMarker, setMainMarker] = useState(null);
  const [placeMarkers, setPlaceMarkers] = useState([]);

  const CATEGORY_EMOJI = {
    편의점: '🏪',
    카페: '☕',
    지하철: '🚇',
    병원: '🏥',
    학교: '🏫',
  };

  const addEmojiMarker = (position, emoji, name) => {
    const container = document.createElement("div");
    container.style.fontSize = "24px";
    container.style.cursor = "pointer";
    container.textContent = emoji;

    const tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.bottom = "28px";
    tooltip.style.left = "50%";
    tooltip.style.transform = "translateX(-50%)";
    tooltip.style.padding = "4px 8px";
    tooltip.style.background = "white";
    tooltip.style.border = "1px solid #ccc";
    tooltip.style.borderRadius = "4px";
    tooltip.style.fontSize = "12px";
    tooltip.style.whiteSpace = "nowrap";
    tooltip.style.display = "none";
    tooltip.style.zIndex = "100";
    tooltip.textContent = name;

    container.appendChild(tooltip);
    container.addEventListener("click", () => {
      tooltip.style.display = tooltip.style.display === "none" ? "block" : "none";
    });

    const overlay = new window.kakao.maps.CustomOverlay({
      position,
      content: container,
      yAnchor: 1,
    });
    overlay.setMap(mapInstance.current);
    return overlay;
  };

  useEffect(() => {
    const loadMap = () => {
      const kakao = window.kakao;
      kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청
          level: 4,
        };
        mapInstance.current = new kakao.maps.Map(container, options);
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadMap();
    } else {
      const script = document.createElement('script');
      script.onload = loadMap;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!address || !mapInstance.current) return;

      try {
        const res = await fetch(
          `http://localhost:8000/search-place-with-surroundings?address=${encodeURIComponent(address)}`
        );
        const data = await res.json();

        if (data.lat && data.lng) {
          const position = new window.kakao.maps.LatLng(data.lat, data.lng);
          mapInstance.current.setCenter(position);

          if (mainMarker) mainMarker.setMap(null);
          placeMarkers.forEach(m => m.setMap(null));
          setPlaceMarkers([]);

          const newMarker = new window.kakao.maps.Marker({
            map: mapInstance.current,
            position,
          });
          setMainMarker(newMarker);

          const newPlaceMarkers = data.places.map((place) => {
            const pos = new window.kakao.maps.LatLng(place.lat, place.lng);
            const emoji = CATEGORY_EMOJI[place.category] || '📍';
            return addEmojiMarker(pos, emoji, place.name);
          });

          setPlaceMarkers(newPlaceMarkers);
        }
      } catch (error) {
        alert("서버와의 통신 중 오류가 발생했습니다.");
        console.error(error);
      }
    };

    fetchData();
  }, [address]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
}
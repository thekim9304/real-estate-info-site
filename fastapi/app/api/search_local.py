from fastapi import APIRouter, Query
import requests
from ..cfgs.config import KAKAO_REST_API_KEY

router = APIRouter()

@router.get("/search-single-place-latlng")
def get_singleplace_latlng(address: str = Query(...)):
    url = "https://dapi.kakao.com/v2/local/search/address.json"
    headers = {"Authorization": f"KakaoAK {KAKAO_REST_API_KEY}"}
    params = {"query": address}

    response = requests.get(url, headers=headers, params=params)
    data = response.json()

    if data["documents"]:
        doc = data["documents"][0]
        return {"lat": float(doc["y"]), "lng": float(doc["x"])}
    else:
        return {"error": "주소를 찾을 수 없습니다."}

@router.get("/search-place-with-surroundings")
def search_place_with_surroundings(address: str = Query(...)):
    # 주소 → 좌표 변환
    geo_url = "https://dapi.kakao.com/v2/local/search/address.json"
    headers = {"Authorization": f"KakaoAK {KAKAO_REST_API_KEY}"}
    geo_res = requests.get(geo_url, headers=headers, params={"query": address})
    geo_data = geo_res.json()

    if not geo_data["documents"]:
        return {"error": "주소를 찾을 수 없습니다."}

    doc = geo_data["documents"][0]
    lat, lng = float(doc["y"]), float(doc["x"])

    # 주변 장소 검색
    CATEGORY_KEYWORDS = {
        "편의점": "CS2",
        "카페": "CE7",
        "지하철": "SW8",
        "병원": "HP8",
        "학교": "SC4",
    }

    place_url = "https://dapi.kakao.com/v2/local/search/category.json"
    places = []

    for category_name, category_code in CATEGORY_KEYWORDS.items():
        params = {
            "category_group_code": category_code,
            "x": lng,
            "y": lat,
            "radius": 1000,
            "size": 10,
        }
        res = requests.get(place_url, headers=headers, params=params)
        items = res.json().get("documents", [])
        for item in items:
            places.append({
                "name": item["place_name"],
                "lat": float(item["y"]),
                "lng": float(item["x"]),
                "category": category_name,
            })

    return {
        "lat": lat,
        "lng": lng,
        "places": places,
    }
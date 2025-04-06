import { useState } from "react";
import dynamic from "next/dynamic";

const KakaoMap = dynamic(() => import("../components/KakaoMap"), { ssr: false });

export default function Home() {
  const [address, setAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        주소 기반 마커 표시 (FastAPI 연동)
      </h1>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="예: 서울 강남구 테헤란로 212"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ padding: "8px", width: "300px", marginRight: "8px" }}
        />
        <button onClick={() => setSubmittedAddress(address)} style={{ padding: "8px 16px" }}>
          검색
        </button>
      </div>
      <KakaoMap address={submittedAddress} />
    </div>
  );
}
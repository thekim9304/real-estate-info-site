import { useState } from "react";
import dynamic from "next/dynamic";

const KakaoMap = dynamic(() => import("../components/KakaoMap"), { ssr: false });

export default function Home() {
  const [address, setAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        빈 페이지
      </h1>
    </div>
  );
}
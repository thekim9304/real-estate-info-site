import { useState } from "react";

export default function Home() {
  const [randomValue, setRandomValue] = useState(null);
  const [logs, setLogs] = useState([]);

  const handleLogClick = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/log-action`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: 1,
        action: "Clicked log button"
      })
    });
    alert("✅ 로그가 저장되었습니다!");
  };

  const handleRandomClick = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/random-number`);
    const data = await res.json();
    setRandomValue(data.number);
  };

  const handleShowLogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs`);
    const data = await res.json();
    setLogs(data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={handleLogClick} style={{ marginRight: "1rem" }}>
        로그 저장
      </button>
      <button onClick={handleRandomClick} style={{ marginRight: "1rem" }}>
        랜덤 숫자 받아오기
      </button>
      <button onClick={handleShowLogs}>
        로그 전체 보기
      </button>

      {randomValue !== null && (
        <p style={{ marginTop: "1rem" }}>🔢 랜덤 숫자: {randomValue}</p>
      )}

      {logs.length > 0 && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3>📋 저장된 로그 목록:</h3>
          <ul>
            {logs.map((log) => (
              <li key={log.id}>
                [User {log.user_id}] {log.action}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
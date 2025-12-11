"use client";

import { useState } from "react";

type BotCheckResult = {
  isBot: boolean | null;
  verified: boolean | null;
  message: string;
};

export default function Home() {
  const [result, setResult] = useState<BotCheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const checkBot = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/check-bot", {
        method: "POST",
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        isBot: null,
        verified: null,
        message: "Failed to check - " + String(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>Are You a Bot?</h1>
      <p className="subtitle">
        Powered by <a href="https://www.kasada.io/" target="_blank" rel="noopener">Kasada</a> via <a href="https://vercel.com/docs/botid" target="_blank" rel="noopener">Vercel BotID</a>
      </p>

      <button onClick={checkBot} disabled={loading} className="check-button">
        {loading ? "Checking..." : "Check Me"}
      </button>

      {result && (
        <div className={`result ${result.isBot === true ? "bot" : result.isBot === false ? "human" : "error"}`}>
          <div className="result-icon">
            {result.isBot === true ? "🤖" : result.isBot === false ? "✅" : "⚠️"}
          </div>
          <div className="result-text">
            {result.isBot === true && <h2>YES - Bot Detected!</h2>}
            {result.isBot === false && <h2>NO - You're Human!</h2>}
            {result.isBot === null && <h2>Unknown</h2>}
            <p>{result.message}</p>
          </div>
        </div>
      )}

      <footer>
        <p>
          This page uses Kasada's bot detection through Vercel's BotID service
          to determine if you're a bot or a real human.
        </p>
      </footer>
    </main>
  );
}

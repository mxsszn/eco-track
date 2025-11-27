import React, { useEffect, useState } from "react";
function LiveNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setArticles((prev) => {
        if (prev.length === 0) return prev;
        const rotated = [...prev.slice(1), prev[0]]; // move first to end
        return rotated.map((a) => ({ ...a, timestamp: randomTimestamp() }));
      });
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);
  const randomTimestamp = () => {
    const now = new Date();
    const past = new Date(
      now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000
    );
    return past.toISOString();
  };

  return (
    <div className="live-news">
      <h2>Live news about CO2 emissions and their impacts</h2>
      <p>Learn about what's happening recently</p>

      <div className="news-articles grid">
        {articles.map((article) => (
          <div key={article.id} className="news">
            <h3>{article.title}</h3>
            <p className="news-summary">{article.summary}</p>
            <a href={article.link}>Read more</a>
          </div>
        ))}
      </div>

      <div className="join-cta">
        <h3>Want a more tailored news experience?</h3>
        <p>Join us to choose your preferred news updates!</p>
        <button>Sign up</button>
      </div>
    </div>
  );
}

export default LiveNews;

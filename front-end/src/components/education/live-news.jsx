import React, { useEffect, useState } from "react";
import LineRevealText from "./text-reveal";
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

  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="live-news">
      <h2 className="width-fix">
        Live news about CO2 emissions and their impacts
      </h2>
      <p className="width-fix">Learn about what's happening recently</p>

      <div className="news-articles grid">
        {articles.slice(0, 6).map((article) => (
          <div key={article.id} className="news">
            <h3>{article.title}</h3>
            <p className="news-summary">{truncate(article.summary, 120)}</p>
            <a href={article.link}>Read more</a>
          </div>
        ))}
      </div>

      <div className="join-cta">
        <h3>Want a more tailored news experience?</h3>
        <p>Pick your preferred news updates!</p>
        <button>Categories</button>
      </div>
      <div className="categories">
        <ul>
          <li className="categories-list-item">WildLife</li>
          <li className="categories-list-item">Economy</li>
          <li className="categories-list-item">Health</li>
          <li className="categories-list-item">Technology</li>
        </ul>
      </div>
      <LineRevealText selector="h2, p" />
    </div>
  );
}

export default LiveNews;

import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080/api/news";

const FALLBACK_ARTICLES = [
  {
    content_id: 1,
    title: "Transport emissions remain a major climate issue",
    context_body:
      "Road transport continues to contribute significantly to global CO₂ emissions. Choosing lower-carbon transport can reduce individual environmental impact.",
  },
  {
    content_id: 2,
    title: "Public transport helps reduce carbon footprints",
    context_body:
      "Using buses, trains, cycling, or walking can reduce emissions compared with private car journeys.",
  },
  {
    content_id: 3,
    title: "Cleaner travel choices support climate action",
    context_body:
      "Small daily travel choices can contribute to wider climate goals by lowering fuel use and emissions.",
  },
];

const ALL_TOPICS = [
  { id: 1, name: "Transport" },
  { id: 2, name: "Energy" },
  { id: 3, name: "Climate" },
  { id: 4, name: "Wildlife" },
  { id: 5, name: "Health" },
  { id: 6, name: "Technology" },
];

function LiveNews() {
  const [articles, setArticles] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId") || 1;

  const loadNews = async () => {
    try {
      const res = await fetch(`${API_BASE}/user/${userId}`);

      if (!res.ok) {
        throw new Error(`News request failed: ${res.status}`);
      }

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setArticles(FALLBACK_ARTICLES);
      } else {
        setArticles(data);
      }

      setError("");
    } catch (err) {
      console.error("LiveNews error:", err);
      setError("Showing sample news while live news is unavailable.");
      setArticles(FALLBACK_ARTICLES);
    }
  };

  useEffect(() => {
    loadNews();
  }, [userId]);

  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      setArticles((prev) => {
        if (prev.length === 0) return prev;
        return [...prev.slice(1), prev[0]];
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [articles.length]);

  const toggleTopic = (topicId) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const savePreferences = async () => {
    try {
      const res = await fetch(`${API_BASE}/user/${userId}/preferences`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedTopics),
      });

      if (!res.ok) {
        throw new Error(`Preference save failed: ${res.status}`);
      }

      await loadNews();
    } catch (err) {
      console.error("Preference error:", err);
      setError("Could not save preferences, but sample news is still shown.");
      setArticles(FALLBACK_ARTICLES);
    } finally {
      setShow(false);
    }
  };

  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="live-news">
      <h2 className="width-fix">
        Live news about CO₂ emissions and their impacts
      </h2>
      <p className="width-fix">Learn about what is happening recently</p>

      {error && <p className="news-error">{error}</p>}

      <div className="news-articles grid">
        {articles.slice(0, 6).map((article, index) => (
          <div key={article.content_id || article.id || index} className="news">
            <h3>{article.title}</h3>
            <p className="news-summary">
              {truncate(article.context_body || article.content || article.description, 120)}
            </p>
          </div>
        ))}
      </div>

      <div className="join-cta">
        <h3>Want a more tailored news experience?</h3>
        <p>Pick your preferred news updates!</p>
        <button type="button" onClick={() => setShow(!show)}>
          Categories
        </button>
      </div>

      {show && (
        <div className="categories">
          <ul>
            {ALL_TOPICS.map((topic) => (
              <li
                key={topic.id}
                className={`categories-list-item ${
                  selectedTopics.includes(topic.id) ? "selected" : ""
                }`}
                onClick={() => toggleTopic(topic.id)}
              >
                {topic.name}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="save-preferences-button"
            onClick={savePreferences}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default LiveNews;
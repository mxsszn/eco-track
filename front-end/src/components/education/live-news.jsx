import React, { useEffect, useState } from "react";

const USER_ID = 1;
const API_BASE = "http://localhost:8080/api/news";

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

  // Fetch personalised news
  useEffect(() => {
    fetch(`${API_BASE}/user/${USER_ID}`)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, [selectedTopics]);

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
        : [...prev, topicId],
    );
  };

  const savePreferences = () => {
    fetch(`${API_BASE}/user/${USER_ID}/preferences`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedTopics),
    })
      .then(() => {
        // Refetch news after saving
        return fetch(`${API_BASE}/user/${USER_ID}`)
          .then((res) => res.json())
          .then((data) => setArticles(data));
      })
      .catch((err) => console.error(err));
    setShow(false);
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
            <p className="news-summary">{truncate(article.content, 120)}</p>
          </div>
        ))}
      </div>

      <div className="join-cta">
        <h3>Want a more tailored news experience?</h3>
        <p>Pick your preferred news updates!</p>
        <button onClick={() => setShow(!show)}>Categories</button>
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
          <button className="save-preferences-button" onClick={savePreferences}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default LiveNews;

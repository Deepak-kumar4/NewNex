import React, { useEffect, useState } from "react";

function NewsList({ category }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const URL = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=in&category=${category}`;

  const DEFAULT_IMAGE =
    "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setArticles(data.results || []);
        } else {
          console.error("API Error:", data);
          setArticles([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setArticles([]);
        setLoading(false);
      });
  }, [category]);

  if (loading)
    return (
      <p className="p-6 text-center text-xl text-gray-500">Loading news...</p>
    );

  if (articles.length === 0)
    return <p className="p-6 text-center text-red-500">No articles found.</p>;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {articles.map((article, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-200 border hover:shadow-2xl flex flex-col"
        >
          <img
            src={article.image_url || DEFAULT_IMAGE}
            alt="News"
            loading="lazy"
            className="w-full h-48 object-cover"
            onError={(e) => (e.target.src = DEFAULT_IMAGE)}
          />
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-lg font-bold mb-1 text-gray-800 line-clamp-2">
              {article.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2 line-clamp-3">
              {article.description}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Published: {article.pubDate ? formatDate(article.pubDate) : "N/A"}
            </p>
            <div className="mt-auto">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Read More →
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsList;

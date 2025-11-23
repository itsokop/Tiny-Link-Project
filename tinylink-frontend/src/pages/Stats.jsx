import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api/linksApi.js";

const Stats = () => {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getLinkStats(code);
        setLink(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [code]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!link) return <p className="p-4">No data found</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Link Stats</h1>
      <div className="mb-2">
        <strong>Code:</strong> {link.code}
      </div>
      <div className="mb-2">
        <strong>Original URL:</strong>{" "}
        <a href={link.original_url} target="_blank" className="text-blue-600">
          {link.originalUrl}
        </a>
      </div>
      <div className="mb-2">
        <strong>Total Clicks:</strong> {link.totalClicks}
      </div>
      <div className="mb-2">
        <strong>Last Clicked:</strong>
        {link.lastClicked}
      </div>
      <div className="mb-2">
        <strong>Created At:</strong>
        {link.createdAt}
      </div>
    </div>
  );
};

export default Stats;

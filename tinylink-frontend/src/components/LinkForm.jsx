import { useState } from "react";

const LinkForm = ({ onCreate }) => {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!url) {
      setError("URL is required");
      return;
    }

    setLoading(true);
    try {
      await onCreate(url, customCode || null);
      setUrl("");
      setCustomCode("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <input
          type="text"
          placeholder="Custom Code (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default LinkForm;

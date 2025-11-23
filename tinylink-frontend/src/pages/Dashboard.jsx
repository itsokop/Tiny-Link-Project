import { useEffect, useState } from "react";
import LinkForm from "../components/LinkForm.jsx";
import LinkTable from "../components/LinkTable.jsx";
import * as api from "../api/linksApi.js";

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const data = await api.getLinks();
      setLinks(data);
    } catch (err) {
      console.error("Failed to fetch links", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleCreate = async (url, customCode) => {
    const newLink = await api.createLink(url, customCode);
    setLinks((prev) => [newLink, ...prev]);
  };

  const handleDelete = async (code) => {
    await api.deleteLink(code);
    setLinks((prev) => prev.filter((l) => l.code !== code));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TinyLink Dashboard</h1>
      <LinkForm onCreate={handleCreate} />
      {loading ? (
        <p>Loading links...</p>
      ) : (
        <LinkTable links={links} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Dashboard;
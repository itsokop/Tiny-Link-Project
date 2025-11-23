import { useNavigate } from "react-router-dom";

const LinkTable = ({ links, onDelete }) => {
  const navigate = useNavigate(); // For programmatic navigation

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="p-2 text-left">Code</th>
          <th className="p-2 text-left">Original URL</th>
          <th className="p-2">Clicks</th>
          <th className="p-2">Last Clicked</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {links.length === 0 ? (
          <tr>
            <td colSpan="5" className="p-2 text-center">
              No links yet
            </td>
          </tr>
        ) : (
          links.map((link) => (
            <tr key={link.code} className="border-b">
              <td className="p-2">
                <a
                  href={`http://localhost:3000/${link.code}`} // Redirect
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {link.code}
                </a>
              </td>
              <td className="p-2 truncate max-w-xs">{link.original_url}</td>
              <td className="p-2 text-center">{link.total_clicks}</td>
              <td className="p-2 text-center">
                {link.last_clicked
                  ? new Date(link.last_clicked).toLocaleString()
                  : "-"}
              </td>
              <td className="p-2 text-center flex gap-2 justify-center">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onDelete(link.code)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => navigate(`/code/${link.code}`)}
                >
                  View Stats
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default LinkTable;

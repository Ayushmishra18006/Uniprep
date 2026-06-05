import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SubjectDetail() {
  const { subject } = useParams();

  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/resources/${subject}`
      );

      console.log(res.data);

      setResources(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredResources = resources.filter(
    (item) => item.type === activeTab
  );

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Subject Resources
      </h1>

      <div className="flex gap-4 mb-6">
        {["videos", "notes", "pyq", "important"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === "videos" && (
        <div className="grid md:grid-cols-2 gap-6">

          {filteredResources.map((video) => (
            <iframe
              key={video._id}
              src="https://www.youtube.com/embed/khKoJUpcXUE"
              title={video.title}
              width="100%"
              height="315"
              allowFullScreen
            ></iframe>
          ))}

        </div>
      )}

      {activeTab !== "videos" && (
        <ul className="space-y-3">

          {filteredResources.map((item) => (
            <li
              key={item._id}
              className="bg-gray-100 p-4 rounded-lg"
            >
              {item.title}
            </li>
          ))}

        </ul>
      )}

    </div>
  );
}

export default SubjectDetail;
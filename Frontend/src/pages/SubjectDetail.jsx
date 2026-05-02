import { useParams } from "react-router-dom";
import { useState } from "react";

function SubjectDetail() {
  const { subject } = useParams();
  const [activeTab, setActiveTab] = useState("videos");

  // Dummy Data (later from backend)
  const data = {
    dbms: {
        videos: [
      "https://www.youtube.com/embed/khKoJUpcXUE",
      "https://www.youtube.com/embed/YRnjGeQbsHQ"
    ],
      notes: ["DBMS Notes PDF", "Normalization Notes"],
      pyq: ["2023 Question Paper", "2022 Question Paper"],
      important: ["Important Topics 1", "Important Topics 2"]
    }
  };

  const subjectData = data[subject] || {};

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {subject}
      </h1>

      {/* Tabs */}
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

      {/* Content */}
      <div>

        {/* VIDEOS */}
        {activeTab === "videos" && (
          <div className="grid md:grid-cols-2 gap-6">
            {subjectData.videos?.map((video, index) => (
          <iframe
  key={index}
  src={video}
  title="YouTube video"
  className="w-full h-64 rounded-xl shadow-md"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
            ))}
          </div>
        )}

        {/* NOTES */}
        {activeTab === "notes" && (
          <ul className="space-y-3">
            {subjectData.notes?.map((note, index) => (
              <li
                key={index}
                className="bg-gray-100 p-4 rounded-lg"
              >
                📄 {note}
              </li>
            ))}
          </ul>
        )}

        {/* PYQ */}
        {activeTab === "pyq" && (
          <ul className="space-y-3">
            {subjectData.pyq?.map((q, index) => (
              <li
                key={index}
                className="bg-gray-100 p-4 rounded-lg"
              >
                📚 {q}
              </li>
            ))}
          </ul>
        )}

        {/* IMPORTANT */}
        {activeTab === "important" && (
          <ul className="space-y-3">
            {subjectData.important?.map((item, index) => (
              <li
                key={index}
                className="bg-gray-100 p-4 rounded-lg"
              >
                ⭐ {item}
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}

export default SubjectDetail;
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import api from "../api/auth.js";

function SubjectDetail() {
  const { subject } = useParams();

  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchResources();
  }, [subject]);

  const markVideoComplete = async (resourceId) => {
    try {
      await api.post(`/progress/${resourceId}`);

      console.log("Progress saved");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchResources = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/resources/${subject}`
      );

      setResources(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredResources = resources.filter((item) => item.type === activeTab);

  useEffect(() => {
    if (activeTab === "videos" && filteredResources.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedVideo(filteredResources[0]);
    }
  }, [activeTab, resources]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{subject}</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {["videos", "notes", "pyq", "important"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* VIDEOS */}
      {activeTab === "videos" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            {selectedVideo ? (
              <>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <ReactPlayer
                    url={selectedVideo.link}
                    controls
                    width="100%"
                    height="500px"
                    onEnded={() => markVideoComplete(selectedVideo._id)}
                  />
                </div>

                <h2 className="text-xl font-semibold mt-4">
                  {selectedVideo.title}
                </h2>

                {selectedVideo.description && (
                  <p className="text-gray-600 mt-2">
                    {selectedVideo.description}
                  </p>
                )}
              </>
            ) : (
              <div className="bg-gray-100 p-8 rounded-xl">
                No videos available.
              </div>
            )}
          </div>

          {/* Playlist */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Playlist</h3>

            <div className="space-y-3">
              {filteredResources.map((video, index) => (
                <div
                  key={video._id}
                  onClick={() => setSelectedVideo(video)}
                  className={`p-4 rounded-lg cursor-pointer border transition ${
                    selectedVideo?._id === video._id
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <p className="font-medium">
                    {index + 1}. {video.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NOTES / PYQ / IMPORTANT */}
      {activeTab !== "videos" && (
        <div className="space-y-4">
          {filteredResources.length > 0 ? (
            filteredResources.map((item) => (
              <a
                key={item._id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition"
              >
                <h3 className="font-semibold">{item.title}</h3>

                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                )}
              </a>
            ))
          ) : (
            <p className="text-gray-500">No resources available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SubjectDetail;

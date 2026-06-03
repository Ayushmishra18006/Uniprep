/* eslint-disable no-unused-vars */
import socket from "../socket.js";
import { useEffect, useState } from "react";
import { getMe } from "../api/auth";
import { getMessages } from "../api/message.js";

const CommunityPage = () => {
  const [dark, setDark] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeChannel, setActiveChannel] = useState("general");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();

        console.log("Current User:", res.data);

        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  // Socket-io
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);

      socket.emit("joinChannel", "general");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  // Test
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      console.log("Received:", msg);

      setMessages((prev) => [
        ...prev,
        {
          user: msg.sender,
          text: msg.text,
          createdAt: msg.createdAt,
        },
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    socket.emit("joinChannel", activeChannel);

    console.log("Joined:", activeChannel);
  }, [activeChannel]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getMessages(activeChannel);

        setMessages(
          res.data.map((msg) => ({
            user: msg.sender || "Unknown",
            text: msg.text,
            createdAt: msg.createdAt,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [activeChannel]);

  // Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "light") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDark(false);
    } else {
      setDark(true);
    }
  }, []);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const sendMessage = () => {
    if (!input.trim() || !currentUser) return;

    socket.emit("sendMessage", {
      sender: currentUser.user.username,
      text: input,
      channel: activeChannel,
    });
    // console.log("Current user = ", currentUser);

    setInput("");
  };

  // Time display fn
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#0f0f1a] text-gray-900 dark:text-white transition-colors duration-300">
      {/* SIDEBAR */}
      <div className="w-64 bg-white dark:bg-[#151528] p-4 space-y-4 border-r border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Community</h2>

        <div className="space-y-2">
          {["general", "coding", "doubt", "random"].map((ch) => (
            <div
              key={ch}
              onClick={() => setActiveChannel(ch)}
              className={`p-2 rounded-lg cursor-pointer transition ${
                activeChannel === ch
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-transparent dark:text-gray-300 dark:hover:bg-[#1f1f3a]"
              }`}
            >
              # {ch}
            </div>
          ))}
        </div>

        <button
          onClick={() => setDark(!dark)}
          className="mt-6 w-full text-sm px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
        >
          {dark ? "Switch to Light ☀️" : "Switch to Dark 🌙"}
        </button>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold bg-white dark:bg-[#0f0f1a]">
          # {activeChannel}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto font-mono font-bold">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="bg-white text-gray-800 dark:bg-[#1f1f3a] dark:text-gray-200 p-3 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-start">
                <span className="font-semibold text-indigo-500">
                  {msg.user}
                </span>

                {msg.createdAt && (
                  <span className="text-xs text-gray-400">
                    {formatTime(msg.createdAt)}
                  </span>
                )}
              </div>

              <p className="text-sm mt-1">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2 bg-white dark:bg-[#0f0f1a]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${activeChannel}`}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 dark:bg-[#1f1f3a] dark:text-white outline-none"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 px-5 rounded-lg text-white transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;

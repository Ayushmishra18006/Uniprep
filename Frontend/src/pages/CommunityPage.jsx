import { useEffect, useState } from "react";

const CommunityPage = () => {
  const [dark, setDark] = useState(true);
  const [messages, setMessages] = useState([
    { user: "Amit", text: "Hey everyone 👋" },
    { user: "Rahul", text: "Welcome to community!" },
  ]);
  const [input, setInput] = useState("");
  const [activeChannel, setActiveChannel] = useState("general");

  // Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") setDark(false);
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
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { user: "You", text: input },
    ]);
    setInput("");
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
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="bg-white text-gray-800 dark:bg-[#1f1f3a] dark:text-gray-200 p-3 rounded-xl shadow-sm"
            >
              <span className="font-semibold text-indigo-500">
                {msg.user}
              </span>
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
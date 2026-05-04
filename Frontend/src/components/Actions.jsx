import { useNavigate } from "react-router-dom";

const Actions = () => {
  const navigate = useNavigate();

  const handleClick = (name) => {
    if (name === "AI Mentor") {
      alert("🚧 Coming Soon!\nStay tuned, this feature is under development.");
    }

    if (name === "Start Learning") {
      navigate("/?scroll=homecard");
    }

    if (name === "Community Chat") {
      navigate("/community");
    }

    if (name === "Contribute") {
      navigate("/contribute");
    }
  };

  const actions = [
    "Start Learning",
    "AI Mentor",
    "Community Chat",
    "Contribute",
  ];

  return (
    <div className="grid md:grid-cols-4 gap-5">
      {actions.map((item) => (
        <div
          key={item}
          onClick={() => handleClick(item)}
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition hover:scale-105"
        >
          <h3 className="font-semibold">{item}</h3>
        </div>
      ))}
    </div>
  );
};

export default Actions;
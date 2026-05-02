import { useState } from "react";
import { useNavigate } from "react-router-dom";

const courseConfig = {
  btech: {
    years: [1, 2, 3, 4],
    branches: ["CSE", "IT", "ECE"]
  },
  bca: {
    years: [1, 2, 3],
    branches: ["General"]
  },
  mca: {
    years: [1, 2],
    branches: ["General"]
  },
  mtech: {
    years: [1, 2],
    branches: ["CSE", "AI"]
  }
};

function YearBranchModal({ course, onClose }) {
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // If no course selected → don't show modal
  if (!course) return null;

  const config = courseConfig[course];

  const handleContinue = () => {
    if (selectedYear && selectedBranch) {
      navigate(
        `/subjects?course=${course}&year=${selectedYear}&branch=${selectedBranch}`
      );
      onClose(); // close modal
    } else {
      alert("Please select both year and branch");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          Select Options
        </h2>

        {/* YEAR */}
        <div>
          <p className="font-medium mb-2">Select Year</p>
          <div className="flex gap-2 flex-wrap">
            {config.years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedYear === year
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Year {year}
              </button>
            ))}
          </div>
        </div>

        {/* BRANCH */}
        <div className="mt-5">
          <p className="font-medium mb-2">Select Branch</p>
          <div className="flex gap-2 flex-wrap">
            {config.branches.map((branch) => (
              <button
                key={branch}
                onClick={() => setSelectedBranch(branch)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedBranch === branch
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {branch}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="text-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={handleContinue}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
}

export default YearBranchModal;
import { useState } from "react";
import YearBranchModal from "./YearBranchModal";

function HomeCard() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const courses = ["BTech", "MTech", "BCA", "MCA"];
  const exams = ["GATE", "CLAT", "UPSC", "CAT"];
  const placements = ["AI/ML", "Web Development", "Data Science", "IoT"];

  return (
    <>
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-14">

          {/* Courses */}
          <Section
            title="Popular Courses"
            items={courses}
            type="course"
            onCardClick={(item) => setSelectedCourse(item.toLowerCase())}
          />

          {/* Exams */}
          <Section
            title="Popular Exams"
            items={exams}
            type="exam"
            onComingSoon={() => setShowComingSoon(true)}
          />

          {/* Placement */}
          <Section
            title="Placement Preparation"
            items={placements}
            type="placement"
            onComingSoon={() => setShowComingSoon(true)}
          />

        </div>
      </section>

      {/* Year + Branch Modal */}
      <YearBranchModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />

      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">

            <h2 className="text-xl font-bold mb-2">
              🚀 Coming Soon
            </h2>

            <p className="text-gray-600 mb-4">
              This feature is under development. Stay tuned!
            </p>

            <button
              onClick={() => setShowComingSoon(false)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              OK
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default HomeCard;


function Section({ title, items, type, onCardClick, onComingSoon }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <Card
            key={index}
            title={item}
            type={type}
            onClick={onCardClick}
            onComingSoon={onComingSoon}
          />
        ))}
      </div>
    </div>
  );
}


function Card({ title, type, onClick, onComingSoon }) {

  const handleClick = () => {
    if (type === "course") {
      onClick(title); // open modal
    } else if (type === "exam" || type === "placement") {
      onComingSoon(); // show popup
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-blue-100 p-8 h-40 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition duration-300 cursor-pointer border border-blue-200 flex items-center justify-center"
    >
      <h3 className="text-xl font-semibold text-blue-800 text-center">
        {title}
      </h3>
    </div>
  );
}
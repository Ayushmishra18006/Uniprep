const ProgressSection = () => {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      
      {/* Overall */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Overall Progress</h2>
        <div className="text-3xl font-bold text-primary">68%</div>
      </div>

      {/* Exam Ready */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Exam Readiness</h2>
        <div className="text-3xl font-bold text-green-500">72%</div>
      </div>

      {/* Subject wise */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Subjects</h2>

        {[
          { name: "DBMS", val: 75 },
          { name: "CN", val: 60 },
          { name: "C", val: 80 },
        ].map((sub) => (
          <div key={sub.name} className="mb-2">
            <div className="flex justify-between text-sm">
              <span>{sub.name}</span>
              <span>{sub.val}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded"
                style={{ width: `${sub.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSection;
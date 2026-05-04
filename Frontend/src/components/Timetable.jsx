const Timetable = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Timetable & Alerts</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>DBMS - 10:00 AM</span>
          <span className="text-blue-500">In 30 min</span>
        </div>

        <div className="flex justify-between">
          <span>CN - 11:00 AM</span>
          <span className="text-green-500">Completed</span>
        </div>
      </div>

      <button className="mt-4 border px-4 py-2 rounded w-full">
        Upload Timetable
      </button>
    </div>
  );
};

export default Timetable;
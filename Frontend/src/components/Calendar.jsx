import { useState } from "react";

function Calendar({ subject, onUpdate }) {
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  const toggleDay = (day) => {
    const key = `${year}-${month}-${day}`;
    const newData = { ...subject.attendance };

    if (!newData[key]) newData[key] = "present";
    else if (newData[key] === "present") newData[key] = "absent";
    else delete newData[key];

    onUpdate(newData);
  };

  const clearMonth = () => {
    if (!window.confirm("Clear this month?")) return;

    const newData = { ...subject.attendance };

    Object.keys(newData).forEach((key) => {
      if (key.startsWith(`${year}-${month}`)) {
        delete newData[key];
      }
    });

    onUpdate(newData);
  };

  const values = Object.values(subject.attendance);
  const present = values.filter((v) => v === "present").length;
  const absent = values.filter((v) => v === "absent").length;
  const total = present + absent;
  const percent = total ? Math.round((present / total) * 100) : 0;

  const styles = {
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <button onClick={() => setDate(new Date(year, month - 1))}>◀</button>

        <h2 className="text-xl font-semibold">
          {date.toLocaleString("default", { month: "long" })} {year}
        </h2>

        <button onClick={() => setDate(new Date(year, month + 1))}>▶</button>
      </div>

      {/* CLEAR MONTH */}
      <div className="flex justify-end">
        <button
          onClick={clearMonth}
          className="text-red-500 text-sm"
        >
          Clear This Month
        </button>
      </div>

      {/* WEEK */}
      <div className="grid grid-cols-7 text-center text-gray-400 text-sm">
        {["S","M","T","W","T","F","S"].map((d,i)=>(
          <div key={i}>{d}</div>
        ))}
      </div>

      {/* DAYS */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((d, i) => {
          if (!d) return <div key={i}></div>;

          const key = `${year}-${month}-${d}`;
          const status = subject.attendance[key];

          return (
            <div
              key={i}
              onClick={() => toggleDay(d)}
              className={`p-3 rounded-xl cursor-pointer ${
                status === "present"
                  ? "bg-green-500 text-white"
                  : status === "absent"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {d}
            </div>
          );
        })}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl text-center ${styles.green}`}>
          <p>Present</p>
          <h2>{present}</h2>
        </div>

        <div className={`p-4 rounded-xl text-center ${styles.red}`}>
          <p>Absent</p>
          <h2>{absent}</h2>
        </div>

        <div className={`p-4 rounded-xl text-center ${styles.indigo}`}>
          <p>Attendance</p>
          <h2>{percent}%</h2>
        </div>
      </div>

      {/* BAR */}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-3 bg-indigo-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

    </div>
  );
}

export default Calendar;
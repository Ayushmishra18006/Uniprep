import { useState } from "react";
import Calendar from "../components/Calendar";

function AttendancePage() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const addSubject = () => {
    if (!newSubject.trim()) return;

    const newObj = {
      id: Date.now(),
      name: newSubject,
      attendance: {},
    };

    setSubjects((prev) => [...prev, newObj]);
    setNewSubject("");
    setSelectedId(newObj.id);
  };

  const deleteSubject = (id) => {
    if (!window.confirm("Delete subject?")) return;

    setSubjects((prev) => prev.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const renameSubject = (id, name) => {
    if (!name.trim()) return;

    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name } : s))
    );
    setEditingId(null);
  };

  const clearSubject = (id) => {
    if (!window.confirm("Clear all attendance?")) return;

    setSubjects((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, attendance: {} } : s
      )
    );
  };

  const updateAttendance = (id, attendance) => {
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, attendance } : s
      )
    );
  };

  const selected = subjects.find((s) => s.id === selectedId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold">Attendance Dashboard</h1>

        {/* ADD */}
        <div className="bg-white p-4 rounded-2xl shadow flex gap-3">
          <input
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Enter subject..."
            className="flex-1 border px-4 py-2 rounded-xl"
          />
          <button
            onClick={addSubject}
            className="bg-indigo-600 text-white px-6 rounded-xl"
          >
            Add
          </button>
        </div>

        {/* SUBJECTS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setSelectedId(sub.id)}
              className={`p-4 rounded-2xl shadow cursor-pointer relative ${
                selectedId === sub.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white"
              }`}
            >
              {/* ACTIONS */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(sub.id);
                  }}
                >
                  ✏️
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSubject(sub.id);
                  }}
                >
                  🧹
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSubject(sub.id);
                  }}
                >
                  ✕
                </button>
              </div>

              {/* NAME */}
              {editingId === sub.id ? (
                <input
                  autoFocus
                  defaultValue={sub.name}
                  onBlur={(e) =>
                    renameSubject(sub.id, e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      renameSubject(sub.id, e.target.value);
                    }
                  }}
                  className="bg-transparent border-b w-full mt-4"
                />
              ) : (
                <h3 className="mt-4 font-semibold">{sub.name}</h3>
              )}
            </div>
          ))}
        </div>

        {/* CALENDAR */}
        {selected && (
          <Calendar
            subject={selected}
            onUpdate={(att) =>
              updateAttendance(selected.id, att)
            }
          />
        )}
      </div>
    </div>
  );
}

export default AttendancePage;
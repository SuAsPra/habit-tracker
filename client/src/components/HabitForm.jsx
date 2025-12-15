import React, { useState } from "react";
import Input from "../components/layout/Input";

function HabitForm() {
  const [habitName, setHabitName] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [frequency, setFrequency] = useState("Daily");
  const [selectedDays, setSelectedDays] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitName.trim()) {
      alert("Please enter a habit name!");
      return;
    }

    const newHabit = {
      id: Date.now(),
      title: habitName,
      freq: {
        mode: frequency,
        days: selectedDays,
        n: selectedDays.length,
        startDate,
      },
    };

    console.log("Habit added:", newHabit);
    // TODO: send to parent state or API
    setHabitName("");
    setStartDate(new Date().toISOString().split("T")[0]);
    setFrequency("Daily");
    setSelectedDays([]);
  };

  const handleDayToggle = (day) => {
    if (frequency === "Weekly") {
      setSelectedDays([day]);
    } else {
      setSelectedDays((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <Input
        label="Habit Name"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="Morning Run"
      />

      <Input
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <div className="flex flex-col">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Frequency</label>
        <select
          value={frequency}
          onChange={(e) => {
            setFrequency(e.target.value);
            setSelectedDays([]);
          }}
          className="w-full p-3 rounded-xl bg-slate-700 text-white border-2 border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-left shadow-md"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Custom">Custom</option>
        </select>
      </div>

      {(frequency === "Weekly" || frequency === "Custom") && (
        <div className="flex flex-wrap gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleDayToggle(index)}
              className={`px-3 py-1 rounded-lg border-2 ${
                selectedDays.includes(index)
                  ? "bg-sky-500 text-white border-sky-700"
                  : "bg-slate-700 text-white border-sky-700"
              } transition`}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-colors"
      >
        + Add Habit
      </button>
    </form>
  );
}

export default HabitForm;

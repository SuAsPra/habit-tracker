import React, { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../components/layout/Input";
import Loading from "../components/layout/loading";

export default function AddHabit() {
  const [loading, setLoading] = useState(true);

  const { setHabits } = useOutletContext();
  const [habitName, setHabitName] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [frequency, setFrequency] = useState("Daily");
  const [selectedDays, setSelectedDays] = useState([]);
  const [isHabitAdded, setIsHabitAdded] = useState(false);

  const navigate = useNavigate();

  // 🔄 Mock fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // ⏳ Loading screen
  if (loading) {
    return <Loading text="Loading Add Habit..." />;
  }

  // ---------- Helpers ----------
  const toLocalDate = (yyyyMmDd) => {
    const [y, m, d] = yyyyMmDd.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const start = toLocalDate(startDate);
  const today = new Date();

  const daysBetween = (a, b) =>
    Math.round(
      (new Date(a.getFullYear(), a.getMonth(), a.getDate()) -
        new Date(b.getFullYear(), b.getMonth(), b.getDate())) /
        86400000
    );

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const [selectedYear, selectedMonth] = startDate.split("-").map(Number);

  const daysInMonth = Array.from(
    { length: getDaysInMonth(selectedYear, selectedMonth - 1) },
    (_, i) => {
      const date = new Date(selectedYear, selectedMonth - 1, i + 1);
      const diff = daysBetween(date, start);

      const isHabitDay =
        diff >= 0 &&
        (frequency === "Daily" ||
          (frequency !== "Daily" &&
            selectedDays.includes(date.getDay())));

      return {
        day: i + 1,
        isHabitDay,
      };
    }
  );

  // ---------- Actions ----------
  const handleAddHabit = () => {
    if (!habitName.trim()) {
      toast.error("Please enter a habit name!");
      return;
    }

    const newHabit = {
      id: Date.now(),
      title: habitName,
      freq: {
        mode: frequency,
        days: selectedDays,
        startDate,
      },
      progress: [],
    };

    setHabits((prev) => [...prev, newHabit]);

    toast.success("Habit saved successfully!");
    setIsHabitAdded(true);

    setTimeout(() => navigate("/"), 1000);
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

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-5xl mx-auto bg-slate-800 rounded-2xl p-8 border border-sky-800">
        <h1 className="text-4xl font-bold text-sky-300 mb-8 text-center">
          Add New Habit
        </h1>

        <div className="grid sm:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <Input
              label="Habit Name"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
            />

            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <div>
              <label className="text-sky-200 font-semibold">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => {
                  setFrequency(e.target.value);
                  setSelectedDays([]);
                }}
                className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Custom</option>
              </select>
            </div>

            {(frequency === "Weekly" || frequency === "Custom") && (
              <div className="flex gap-2 flex-wrap">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (d, i) => (
                    <button
                      key={i}
                      onClick={() => handleDayToggle(i)}
                      className={`px-3 py-1 rounded ${
                        selectedDays.includes(i)
                          ? "bg-sky-500"
                          : "bg-slate-700"
                      }`}
                    >
                      {d}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((d) => (
              <div
                key={d.day}
                className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                  d.isHabitDay
                    ? "bg-sky-400/30 border-sky-500"
                    : "border-gray-600"
                }`}
              >
                {d.day}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-10">
          <Link to="/">
            <button className="bg-gray-600 px-6 py-2 rounded-xl">
              Cancel
            </button>
          </Link>
          <button
            onClick={handleAddHabit}
            className="bg-sky-500 px-6 py-2 rounded-xl"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

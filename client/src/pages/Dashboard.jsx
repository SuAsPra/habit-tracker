import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import Header from "../components/layout/Header";
import HabitList from "../components/HabitList";
import Calendar from "../components/Calendar";
import Loading from "../components/layout/loading";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { habits, setHabits } = useOutletContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading text="Loading Dashboard..." />;
  }

  return (
    <>
      <Header username="Aditya" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] min-h-0">
        <div className="overflow-y-auto custom-scrollbar">
          <HabitList habits={habits} setHabits={setHabits} />
        </div>

        <div className="overflow-y-auto">
          <Calendar habits={habits} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

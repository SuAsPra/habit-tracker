import { Link } from 'react-router-dom';

function Header({ username }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-slate-900 shadow-md border-b border-slate-800">
      <h1 className="text-xl sm:text-2xl font-semibold text-sky-300 truncate">
        Hello, {username} 👋
      </h1>
      <Link to="/add">
        <button className="px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg bg-sky-500 text-slate-900 font-medium text-sm sm:text-base shadow-sm hover:bg-sky-600 hover:shadow-md transition-colors duration-200">
          + Add Habit
        </button>
      </Link>
    </header>
  );
}

export default Header;

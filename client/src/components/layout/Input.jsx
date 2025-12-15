import React from "react"   ;

const Input = ({ label, value, onChange, placeholder, type = "text" }) => {
  return (
    <div>
      <label className="block text-lg sm:text-xl font-semibold text-sky-200 mb-2 text-left tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 rounded-xl bg-slate-700 text-white border-2 border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-left shadow-md"
      />
    </div>
  );
};

export default Input;

import React from "react";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <p className="text-sky-300 text-xl font-semibold animate-pulse">
        {text}
      </p>
    </div>
  );
}

import { useState } from "react";

export const Tooltip = ({ children, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute bg-slate-500 text-white text-sm rounded py-1 px-2 z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
          {text}
        </div>
      )}
    </div>
  );
};

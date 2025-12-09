import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdowns = ({ label, icon: IconComponent }) => {
  const [onHovered, setOnHovered] = useState(false);
  return (
    <div
      className="flex flex-row items-center justify-between hover:bg-whiteBG transition-colors cursor-pointer p-2"
      onMouseOver={() => setOnHovered(true)}
      onMouseOut={() => setOnHovered(false)}
    >
      <div className="flex flex-row gap-2 items-center">
        {IconComponent && (
          <IconComponent size={14} className="text-textMuted" />
        )}
        <h3 className="text-textMuted">{label}</h3>
      </div>
      {onHovered && <FaChevronDown size={12} className="text-textMuted" />}
    </div>
  );
};

export default Dropdowns;

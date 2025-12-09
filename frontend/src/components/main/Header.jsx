import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const [search, setSearch] = useState();
  return (
    <div className="flex flex-row justify-between border-b border-grayBG py-2">
      <h3 className="font-bold text-text text-xl">
        Sales Management System
      </h3>
      <div className="flex flex-row py-1 px-2 bg-grayBG border gap-2 items-center border-border w-[30vw] rounded-md">
        <FaSearch className="text-textMuted" size={14} />
        <input
          placeholder="Name, Phone No."
          value={search}
          className="text-text placeholder:text-textMuted text-md flex-1 outline-0 focus:outline-0"
          onChange={(e) => setSearch(e.value)}
        />
      </div>
    </div>
  );
};

export default Header;

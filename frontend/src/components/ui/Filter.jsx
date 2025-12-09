import { FaChevronDown } from "react-icons/fa";
const Filter = ({ label }) => {
  return (
    <div className="flex flex-row items-center gap-4 bg-grayBG px-2 py-1 cursor-pointer rounded">
      <h3 className="text-textMuted text-sm">{label}</h3>
      <FaChevronDown size={12} className="text-textMuted" />
    </div>
  );
};

export default Filter;

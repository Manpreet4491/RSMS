import Filter from "../ui/Filter";
import { FaChevronDown, FaRetweet } from "react-icons/fa";
import {AiOutlineReload} from 'react-icons/ai'
import { filtersData } from "../../Data";

const FilterSection = () => {
  return (
    <div className="flex flex-row items-center justify-between" >
      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-4 p-2 bg-grayBG cursor-pointer">
          <AiOutlineReload size={14} className="text-textMuted" />
        </div>
        {filtersData.map((item,index) => {
          return <Filter label={item.label} key={index} />;
        })}
      </div>
      <div className="flex flex-row items-center gap-4 px-4 py-1 bg-grayBG cursor-pointer rounded">
        <h3 className="text-sm text-textMuted">Sort By: Customer name (A-Z)</h3>
        <FaChevronDown size={12} className="text-textMuted" />
      </div>
    </div>
  );
};

export default FilterSection;

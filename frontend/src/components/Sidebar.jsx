import Avatar from "./sidebar/Avatar";
import Dropdowns from "./sidebar/Dropdowns";
import { DropDownData } from "../Data";
const Sidebar = () => {
  return (
    <div className="w-[12vw] h-full flex flex-col bg-grayBG px-4 gap-4">
      {/* Avatar */}
      <Avatar />
      {/* Dropdowns */}
      <div className="flex flex-col gap-4">
        {DropDownData.map((item, index) => {
          return <Dropdowns label={item.label} icon={item.icon} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;

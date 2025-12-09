import StatContainer from "../ui/StatContainer";
import { StatData } from "../../Data";

const StatSection = () => {
  return (
    <div className="flex flex-row gap-4">
      {StatData.map((item, index) => {
        return (
          <StatContainer
            label={item.label}
            labelSecondary={item.secondaryLabel}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default StatSection;

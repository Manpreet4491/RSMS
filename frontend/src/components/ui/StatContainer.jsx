import {AiOutlineInfoCircle} from 'react-icons/ai'

const StatContainer = ({ label, labelSecondary }) => {
  return (
    <div className="border border-border bg-whiteBG flex flex-col px-4 py-1 gap-2 rounded-md">
      <div className="flex flex-row gap-2 items-center">
        <h3 className="text-sm">{label}</h3>
        <AiOutlineInfoCircle size={14} className="text-textMuted cursor-pointer" />
      </div>
      <h3 className="font-bold text-text">{labelSecondary}</h3>
    </div>
  );
};

export default StatContainer;

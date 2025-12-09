import { FaChevronDown, FaUser } from "react-icons/fa";
const Avatar = () => {
  return (
    <div className="border-border border px-3 py-1 flex flex-row items-center gap-4 bg-whiteBG">
      <FaUser size={24} className="text-textMuted" />
      <div className="flex flex-col flex-1">
        <h5 className="font-bold text-text">Vault</h5>
        <h5 className="text-textMuted">Anurag Yadav</h5>
      </div>
      <FaChevronDown size={12} className="text-textMuted" />
    </div>
  );
};

export default Avatar;

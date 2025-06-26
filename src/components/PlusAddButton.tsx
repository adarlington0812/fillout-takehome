'use client';

import PlusIcon from "./icons/PlusIcon";

interface PlusAddButtonProps {
  onClick: () => void;
}

const PlusAddButton: React.FC<PlusAddButtonProps> = ({ onClick }) => (
  <div className="relative flex items-center group">
    <div className="w-10 border-dashed border-t-2 border-gray-300"></div>
    <button
      type="button"
      className="absolute left-1/2 -translate-x-1/2 p-1 bg-white rounded-full border border-gray-300 opacity-0 group-hover:opacity-100 transition"
      onClick={onClick}
    >
      <PlusIcon size={8} />
    </button>
  </div>
);

export default PlusAddButton;

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PageIcon from "./PageIcon";
import VerticalDotIcon from "./icons/VerticalDotIcon";
import { Position } from "./types";

interface SortableNavigationItemProps {
  id: string;
  activePage: string;
  setActivePage: (id: string) => void;
  onSettingsMenu: (id: string, position: Position) => void;
  isOverlay?: boolean;
}

const SortableNavigationItem: React.FC<SortableNavigationItemProps> = ({
  id,
  activePage,
  setActivePage,
  onSettingsMenu,
  isOverlay = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = !isOverlay
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : 0,
        boxShadow: isDragging ? '0 0 0 1px #2F72E2' : 'none',
        borderColor: isDragging ? '#2F72E2' : undefined,
      }
    : {
        opacity: 0.7,
      };

  const isActive = activePage === id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group flex items-center px-4 py-2 border rounded-medium cursor-pointer transition-colors duration-150
        ${
          isActive
            ? 'border-gray-300 bg-white'
            : 'bg-gray-200 text-gray-800'
        }
        hover:bg-gray-300`}
      onClick={() => setActivePage(id)}
      {...(!isOverlay ? { ...attributes, ...listeners } : {})}
    >
      <div className="mr-3">
        <PageIcon id={id} color={isActive ? "#F59D0E" : "#8C93A1"} />
      </div>
      <span className={`text-sm font-medium ${isActive ? 'black' : 'text-slateBlue'}`}>{id}</span>
      <button
        type="button"
        className="ml-4 invisible group-hover:visible text-gray-500"
        onClick={(e) => {
          e.stopPropagation();
          const rect = e.currentTarget.getBoundingClientRect();
          onSettingsMenu(id, { x: rect.left + rect.width / 2, y: rect.bottom });
        }}
      >
        <VerticalDotIcon />
      </button>
    </div>
  );
};

export default SortableNavigationItem;

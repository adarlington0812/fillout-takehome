'use client';

import { useEffect, useRef } from "react";
import { ACTIONS } from "./constants";
import SettingsMenuIcon from "./SettingsMenuIcon";
import { Position } from "./types";

interface SettingsMenuProps {
  position: Position;
  itemId: string;
  onClose: () => void;
  onAction: (action: string, itemId: string) => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ position, itemId, onAction, onClose }) => {
  const contextRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (contextRef.current && !contextRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={contextRef}
      className="absolute z-50 w-56 bg-white border border-lightGray rounded-medium shadow-lg"
      style={{ top: position.y + 8, left: position.x }}
    >
      <div className="p-6 py-2 font-medium border-b bg-softWhite">Settings</div>
      <ul className="text-sm">
        {ACTIONS.map((action) => (
          <li key={action.id}>
            {action.id === 'delete' && (
              <div className="mx-6 border-t border-gray-200" />
            )}
            <div
              className={`flex items-center p-6 hover:bg-gray-100 cursor-pointer ${
                action.id === 'delete' ? 'text-red-500' : ''
              }`}
              onClick={() => onAction(action.id, itemId)}
            >
              <div className="mr-4">
                <SettingsMenuIcon id={action.id} />
              </div>
              {action.label}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SettingsMenu;

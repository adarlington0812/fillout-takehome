'use client';

import CopyIcon from "./icons/CopyIcon";
import DeleteIcon from "./icons/DeleteIcon";
import DuplicateIcon from "./icons/DuplicateIcon";
import RenameIcon from "./icons/RenameIcon";
import SetFirstIcon from "./icons/SetFirstIcon";

interface SettingsMenuIconProps {
  id: string;
}

const SettingsMenuIcon: React.FC<SettingsMenuIconProps> = ({ id }) => {
  switch (id) {
    case 'setFirst':
      return <SetFirstIcon />;
    case 'rename':
      return <RenameIcon />;
    case 'copy':
      return <CopyIcon />;
    case 'duplicate':
      return <DuplicateIcon />;
    case 'delete':
      return <DeleteIcon />;
    default:
      return <DeleteIcon />;
  }
};

export default SettingsMenuIcon;

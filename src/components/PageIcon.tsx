'use client';

import EndingIcon from "./icons/EndingIcon";
import InfoIcon from "./icons/InfoIcon";
import OtherIcon from "./icons/OtherIcon";

interface PageIconProps {
  id: string;
  color: string;
}

const PageIcon: React.FC<PageIconProps> = ({ id, color }) => {
  switch (id) {
    case 'Info':
      return <InfoIcon color={color} />;
    case 'Ending':
      return <EndingIcon color={color} />;
    default:
      return <OtherIcon color={color} />;
  }
};

export default PageIcon;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../SideNavigation/classNames";
import { NavigationIcons } from "../SideNavigation/NavIcon";
import { MobileNavIcon } from "./MobileNavIcon";

interface Props {
  url: string;
  title: string;
  icon: NavigationIcons;
}
export const MobileNavItem: React.FC<Props> = ({
  url,
  icon,
  title,
}) => {
  const location = useLocation();
  let current = location.pathname;
  return (
    <div>
      <Link
        to={url}
        className="w-full block py-5 px-2 text-center dark:text-gray-200 text-black-900 transition duration-300"
      >
        <MobileNavIcon url={url} iconType={icon} />
        {title}
      </Link>
    </div>
  );
};

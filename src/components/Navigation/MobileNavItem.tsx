import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
  const history = useHistory();
  const { setCurrentUser } = useAuth();
  const handleClick = () => {
    if (url !== "/logout") {
      history.push(url);
    } else {
      if (window.confirm("Are you sure you want to logout?")) {
        setCurrentUser(null);
        localStorage.removeItem("token");
        history.push("/signup");
      }
    }
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="w-full block py-5 px-2 text-center dark:text-gray-200 text-black-900 transition duration-300"
      >
        <MobileNavIcon url={url} iconType={icon} />
        {title}
      </button>
    </div>
  );
};

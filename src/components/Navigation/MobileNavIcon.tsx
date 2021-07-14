import {
  HomeIcon,
  FireIcon,
  UserGroupIcon,
  UserCircleIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
import React from "react";
import { useLocation } from "react-router-dom";
import { NavigationIcons } from "../SideNavigation/NavIcon";

type Props = React.FC<{
  iconType: NavigationIcons;
  url: string;
}>;

export const MobileNavIcon: Props = ({ iconType }) => {
  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  };
  const location = useLocation();
  const url = location.pathname;
  switch (iconType) {
    case "Home":
      return (
        <HomeIcon
          className={classNames(
            url === "/"
              ? "dark:text-lightGreen-400 text-rose-500"
              : "text-gray-500 dark:text-gray-50",
            "w-6 h-6 mb-2 mx-auto hover:text-rose-500"
          )}
          aria-hidden="true"
        />
      );
    case "Trending":
      return (
        <FireIcon
          className={classNames(
            url === "/trending"
              ? "dark:text-lightGreen-400 text-rose-500"
              : "text-gray-500 dark:text-gray-50",
            "w-6 h-6 mb-2 mx-auto hover:text-rose-500"
          )}
          aria-hidden="true"
        />
      );

    case "Users":
      return (
        <UserGroupIcon
          className={classNames(
            url === "/users"
              ? "dark:text-lightGreen-400 text-rose-500"
              : "text-gray-500 dark:text-gray-50",
            "w-6 h-6 mb-2 mx-auto hover:text-rose-500"
          )}
          aria-hidden="true"
        />
      );

    case "Profile":
      return (
        <UserCircleIcon
          className={classNames(
            url === "/profile"
              ? "dark:text-lightGreen-400 text-rose-500"
              : "text-gray-500 dark:text-gray-50",
            "w-6 h-6 mb-2 mx-auto hover:text-rose-500"
          )}
          aria-hidden="true"
        />
      );

    case "Logout":
      return (
        <LogoutIcon
          className={classNames(
            "text-gray-400 group-hover:text-gray-500 dark:text-gray-50 dark:group-hover:text-gray-50",
            "w-6 h-6 mb-2 mx-auto"
          )}
          aria-hidden="true"
        />
      );

    default:
      return <div>Default Case</div>;
  }
};

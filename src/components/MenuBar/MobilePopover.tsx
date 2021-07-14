import { Popover } from "@headlessui/react";
import {
  FireIcon,
  HomeIcon,
  LogoutIcon,
  MenuIcon,
  UserCircleIcon,
  UserGroupIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/solid";
import { MobileNavItem } from "../Navigation/MobileNavItem";
import { NavIcon } from "../SideNavigation/NavIcon";
import { MobileMenu } from "./MobileMenu";

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};
export const MyPopover = () => {
  return (
    <nav className="fixed bottom-0 inset-x-0 dark:bg-dracula-600 bg-gray-200 px-4 flex justify-between text-sm uppercase z-10 lg:hidden">
      <MobileNavItem url="/" icon="Home" title="Home" />
      <MobileNavItem
        url="/trending"
        icon="Trending"
        title="Trending"
      />
      <MobileNavItem url="/users" icon="Users" title="Users" />
      <MobileNavItem url="/logout" icon="Logout" title="Logout" />
    </nav>
  );
};

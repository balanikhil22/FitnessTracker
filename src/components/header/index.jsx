import { useState, useRef } from "react";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";

const Header = () => {
  const role = localStorage.getItem("userRole");

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="hidden sm:block"></div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <li>{role === "user" && <DropdownNotification />}</li>
          </ul>

          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className=" navbar bg-base-100 shadow-sm">
        <div className="flex-1 nav-left">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex gap-2 nav-right">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

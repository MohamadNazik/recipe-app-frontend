import React from "react";
import logo from "../assets/logo.png";
import logout_icon from "../assets/logout_icon.png";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ currentPage }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="bg-white flex h-[5rem] w-full items-center overflow-hidden px-40 justify-between">
      <img src={logo} alt="Logo" className="w-[8rem]" />
      <div className="flex gap-12">
        <Link to="/home">
          <p
            className={`text-lg ${
              currentPage === "home" ? "font-bold" : "font - normal"
            }`}
          >
            Home
          </p>
        </Link>
        <Link to="/favourites">
          <p
            className={`text-lg ${
              currentPage === "fav" ? "font-bold" : "font - normal"
            }`}
          >
            Favourites
          </p>
        </Link>
      </div>
      <img
        src={logout_icon}
        alt="icon"
        className="w-[2.5rem] cursor-pointer"
        onClick={() => logout()}
      />
    </div>
  );
}

export default NavBar;

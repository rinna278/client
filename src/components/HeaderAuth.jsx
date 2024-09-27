import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const HeaderAuth = () => {
  return (
    <div className="flex justify-between items-center px-24 py-5 gap-20  border-b-2">
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>

      <div className="flex py-3 px-5 gap-1 bg-#F6F6F6 rounded-lg ">
        <CiSearch className="w-6 h-6 text-#807D7E cursor-pointer" />
        <input
          type="text"
          placeholder="Search"
          className="bg-#F6F6F6 outline-none"
        />
      </div>

      <div className="flex gap-3">
        <Link
          to={"/signin"}
          className={`text-white border-#8A33FD bg-#8A33FD border-2 font-medium text-lg  px-10 py-2 rounded-lg`}
        >
          Login
        </Link>
        <Link
          to={"/signup"}
          className={`text-#8A33FD border-2 font-medium text-lg  px-10 py-2 rounded-lg`}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default HeaderAuth;

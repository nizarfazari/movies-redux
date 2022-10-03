import React from "react";
import "./navbar.css";

const Navbars = () => {
  return (
    <nav className="flex justify-between containers">
      <div className="logo">MovieList</div>
      <div className="nav-search">
        <input className="py-2 px-5 rounded-3xl w-80 " type="text" placeholder="What do you want to watch?" />
      </div>
      <div className="nav-buttons flex gap-x-2">
        <button className="button-login rounded-3xl px-6 py-2">Login</button>
        <button className="button-register rounded-3xl px-6 py-2">Register</button>
      </div>
    </nav>
  );
};

export default Navbars;

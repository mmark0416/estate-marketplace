import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpenActive, setIsOpenActive] = useState(false);
  const toggleClass = () => {
    setIsOpenActive((prev) => !prev);
  };

  return (
    <header>
      <div className="flex justify-between items-center bg-slate-200 shadow-md max-w-6xl mx-auto p-3 h-16 w-full fixed">
        <Link to={"/"}>
          <h1 className="flex flex-wrap font-bold text-sm sm:text-xl">
            <span className="text-slate-500">MJM</span>
            <span className="text-slate-500">Estate</span>
          </h1>
        </Link>
        <form className="flex  items-center bg-slate-100 p-3 rounded-lg">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="hidden space-x-6 sm:flex">
          <Link to={"/"}>
            <li className="text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className="text-slate-700 hover:underline">About</li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <div>
                <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} referrerPolicy="no-referrer" alt="profile" />
              </div>
            ) : (
              <li className="text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
        <button
          className={`hamburger focus:outline-none sm:hidden ${
            isOpenActive ? " open" : ""
          }`}
          onClick={toggleClass}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
        <div
          className={`absolute items-center right-6 left-6 top-20 text-center sm:hidden bg-slate-200 ${
            isOpenActive ? "" : "hidden"
          }`}
        >
          <ul className="font-bold text-black">
            <Link to={"/"}>
              <li
                onClick={toggleClass}
                className="px-6 py-2 border-b border-slate-700"
              >
                Home
              </li>
            </Link>
            <Link to={"/about"}>
              <li
                onClick={toggleClass}
                className="px-6 py-2 border-b border-slate-700"
              >
                About
              </li>
            </Link>
            <Link to={"/sign-in"}>
              {currentUser ? (
                <li onClick={toggleClass} className="px-6 py-2">
                  Profile
                </li>
              ) : (
                <li onClick={toggleClass} className="px-6 py-2">
                  Sign in
                </li>
              )}
            </Link>
          </ul>
        </div>
      </div>
      <div className="h-16"></div>
    </header>
  );
}

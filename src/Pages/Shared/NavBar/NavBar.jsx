import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/dark-logo-img.png";
import { useContext, useEffect, useState } from "react";

import { FaUser, FaMoon, FaSun } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Redirect to the home page
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/instructors">Instructors</Link>
      </li>
      <li>
        <Link to="/classes">Classes</Link>
      </li>

      {user?.email ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button onClick={handleLogOut}>Log out</button>
          </li>
          <li className="nav-item-user">
            <span className="tooltip">
              {user.photoURL ? (
                <img
                  className="rounded-full w-8 mx-2"
                  src={user.photoURL}
                  alt=""
                  title={user.displayName}
                />
              ) : (
                <FaUser className="rounded-full w-12 mx-2" />
              )}
            </span>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar lg:px-24 fixed top-0 z-50 bg-gray-100 mb-8 h-20">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-bold"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold text-gray-600">{navItems}</ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-outline btn-ghost">
          <span className="font-bold">Enroll</span>
        </button>
        <button
          className="theme-toggle m-3 text-gray-600"
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Light Mode" : "Dark Mode"}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default NavBar;

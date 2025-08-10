import React, { useEffect, useRef, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthConrext/AuthCotext";
import { CgLogOut } from "react-icons/cg";

const Navbar = () => {
  const [state, setState] = useState(false);
  const [showEmail, setShowEmail] = useState(false); // Email টগল এর জন্য স্টেট
  const navRef = useRef();
  const { user, SigninOut } = useContext(AuthContext);

  // Theme setup
  const themes = [
    "bg-black",
    "bg-purple-700",
    "bg-rose-700",
    "bg-emerald-700",
    "bg-white",
  ];
  const [themeIndex, setThemeIndex] = useState(() => {
    const saved = localStorage.getItem("themeIndex");
    return saved ? Number(saved) : 0;
  });

  const currentTheme = themes[themeIndex];

  useEffect(() => {
    const body = document.body;
    const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"];

    if (state) body.classList.add(...customBodyStyle);
    else body.classList.remove(...customBodyStyle);

    const customStyle = ["sticky-nav", "fixed", "border-b"];
    const handleScroll = () => {
      if (window.scrollY > 80) {
        navRef.current.classList.add(...customStyle);
      } else {
        navRef.current.classList.remove(...customStyle);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state]);

  useEffect(() => {
    document.body.classList.remove(...themes);
    document.body.classList.add(currentTheme);
    localStorage.setItem("themeIndex", themeIndex);
  }, [themeIndex]);

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const handleSignOut = () => {
    SigninOut()
      .then(() => console.log("User signed out successfully"))
      .catch((error) => console.log("Sign out error:", error));
  };

  const toggleEmail = () => {
    setShowEmail(!showEmail);
  };

  const navigation = [
    { title: "Home", path: "/" },
    { title: "My Product", path: "/product" },
    { title: "All Artifacts", path: "/AllArtifacts" },
    { title: "Add Artifacts", path: "/AddArtifacts" },
    { title: "My Artifacts", path: "/MyArtifacts" },
  ];

  return (
    <nav
      ref={navRef}
      className={`w-full top-0 z-20 border-b border-amber-300 ${currentTheme}`}
    >
      <div className="items-center px-4 max-w-screen-xl mx-auto md:px-8 lg:flex">
        {/* Logo and Hamburger */}
        <div className="flex items-center justify-between py-3 lg:py-4 lg:block w-full lg:w-auto">
          <div className="flex items-center space-x-2">
            <img
              src="https://i.ibb.co/ynzvkkT7/AT-Co0-K9-ER.png"
              className="h-13 w-13 rounded-full border-2 border-amber-400"
              alt="Artifacts Logo"
            />
            <div
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-colors duration-300 border-amber-300 btn active:bg-lime-300 active:text-black active:rounded-r-4xl text-amber-300 bg-black cursor-pointer`}
            >
              Artifacts
            </div>
          </div>

          {/* Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setState(!state)}
              className="text-amber-300 border  border-amber-300 p-2 rounded-md focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={state ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navbar content: Mobile responsive */}
        <div
          className={`flex-1 flex-col-reverse lg:flex-row-reverse lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${
            state ? "flex h-screen pb-20 overflow-auto pr-4" : "hidden"
          }`}
        >
          {/* Right Side: User Info / Auth Buttons */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-4 mt-6 lg:mt-0 relative">
            {user ? (
              <>
                <div
                  className="flex items-center gap-3 cursor-pointer relative"
                  onClick={toggleEmail}
                >
                  <img
                    src={user?.photoURL || "https://i.ibb.co/default-image.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-yellow-400"
                  />
                  {showEmail && (
                    <div className="absolute top-full mt-2 right-0 bg-gray-800 text-white px-3 py-2 rounded shadow-lg whitespace-nowrap z-50">
                      {user?.email || "No email available"}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSignOut}
                  className="btn bg-black border-amber-400 text-amber-300 hover:bg-gray-950 active:bg-lime-300 active:text-black active:rounded-r-4xl"
                >
                  <CgLogOut /> Logout
                </button>
              </>
            ) : (
              <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `py-3 px-4 text-center btn border-amber-300 rounded-md active:bg-lime-300 active:text-black active:rounded-r-4xl text-amber-300 bg-black shadow block lg:inline 
                      ${isActive ? "border-b-blue-500" : " border-amber-300"}`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `py-3 px-4 text-center btn border-amber-300 text-amber-300 active:bg-lime-300 active:rounded-r-4xl active:text-black bg-black rounded-md shadow block lg:inline  
                      ${isActive ? "border-b-blue-500" : " border-amber-300"}`
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex-1">
            <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
              {navigation.map((item, idx) => (
                <li
                  key={idx}
                  className="border-amber-300 btn active:bg-lime-300 active:text-black active:rounded-r-4xl text-amber-300 bg-black"
                >
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

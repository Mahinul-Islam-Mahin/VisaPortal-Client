import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { FaSun, FaMoon } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const NavBar = () => {
  const { user, signOutUser, Toast, setLoading, theme, toggleTheme } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenuDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  const toggleProfileDropdown = () => {
    if (window.innerWidth <= 640) {
      setIsMenuOpen(false);
      return;
    }
    setIsProfileOpen(prev => !prev);
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Toast("Logged Out Successfully", "warning");
        navigate("/");
      })
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scroll ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' : 
      'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">VisaPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/all-visas" className="nav-link">All Visas</NavLink>
            {user && (
              <>
                <NavLink to="/add-visa" className="nav-link">Add Visa</NavLink>
                <NavLink to="/my-visa" className="nav-link">My Visas</NavLink>
                <NavLink to="/my-applications" className="nav-link">Applications</NavLink>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <FaMoon className="text-gray-800 text-xl" />
              ) : (
                <FaSun className="text-yellow-400 text-xl" />
              )}
            </button>

            {/* Auth Buttons / Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/500"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-primary"
                  />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 glass-effect">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.displayName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary hover:text-primary-dark transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenuDropdown}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <NavLink to="/" className="nav-link" onClick={toggleMenuDropdown}>Home</NavLink>
              <NavLink to="/all-visas" className="nav-link" onClick={toggleMenuDropdown}>All Visas</NavLink>
              {user && (
                <>
                  <NavLink to="/add-visa" className="nav-link" onClick={toggleMenuDropdown}>Add Visa</NavLink>
                  <NavLink to="/my-visa" className="nav-link" onClick={toggleMenuDropdown}>My Visas</NavLink>
                  <NavLink to="/my-applications" className="nav-link" onClick={toggleMenuDropdown}>Applications</NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

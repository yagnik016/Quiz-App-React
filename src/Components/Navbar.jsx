import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "./Alert"; // Import the Alert component
import LoadingBar from "react-top-loading-bar"; // Import the LoadingBar component
import DarkModeToggle from "./DarkModeToggle"; // Import the DarkModeToggle component

function Navbar() {
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const location = useLocation();

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Store the dark mode setting in localStorage.
    localStorage.setItem("darkMode", newDarkMode);

    // Toggle the dark mode by changing CSS classes or styles.
    document.body.classList.toggle("dark-mode");
  };

  // Function to close the alert
  const closeAlert = () => {
    setAlert(null);
  };

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userFullName");
    setTimeout(() => {
      navigate("/login");
      setLoading(false);
      setAlert({ type: "success", message: "Logged out successfully" });
    }, 1000);
  };

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        closeAlert();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  useEffect(() => {
    // Set dark mode on initial load.
    if (darkMode) {
      document.body.classList.add("dark-mode");
    }
  }, [darkMode]);
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg ${
          darkMode ? "navbar-dark" : "navbar-default"
        } fixed-top`}
      >
        <Link
          className={`nav-link ${
            location.pathname === "/" ? "active" : ""
          } navbar-brand`}
          to="/"
        >
          GreenWebLab-Quiz
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="#navbarSupportedContent"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/quiz" ? "active" : ""
                }`}
                to="/quiz"
              >
                Quiz
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {userToken ? (
              <div>
                <Link className="btn btn-primary mx-2" to="/my-profile">
                  My-Profile
                </Link>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout{" "}
                  <img
                    src="/Quiz-Images/power-off.svg"
                    width={20}
                    className="ms-1"
                    alt=""
                  />
                </button>
              </div>
            ) : (
              <div>
                <Link className="btn btn-primary mx-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-success" to="/signup">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center">
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </nav>
      <LoadingBar color="#f11946" progress={loading ? 80 : 100} />
      <div
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          textAlign: "center",
        }}
      >
        {alert && <Alert type={alert.type} message={alert.message} />}
      </div>
    </>
  );
}

export default Navbar;

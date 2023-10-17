import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Alert from './Alert'; // Import the Alert component
import LoadingBar from 'react-top-loading-bar'; // Import the LoadingBar component

function Navbar() {
  const userToken = localStorage.getItem('userToken');
  const navigate = useNavigate();
  const location = useLocation();

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  // Function to close the alert
  const closeAlert = () => {
    setAlert(null);
  };

  const handleLogout = () => {
    setLoading(true); // Start loading
    localStorage.removeItem('userToken');
    localStorage.removeItem('userFullName');
    // Delay the redirection by a few seconds (e.g., 1 seconds).
    setTimeout(() => {
      navigate('/login');
      setLoading(false); // Stop loading
      // Show a success alert when logging out
      setAlert({ type: 'success', message: 'Logged out successfully' });
    }, 1000); // 1000 milliseconds (1 seconds)
  };

  // Use effect to close the alert after it's displayed
  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        closeAlert();
      }, 3000); // 3000 milliseconds (3 seconds)

      return () => clearTimeout(timeout);
    }
  }, [alert]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link
            className={`nav-link ${location.pathname === '/' ? 'active' : ''} navbar-brand`}
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
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                  to="/about"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/quiz' ? 'active' : ''}`}
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
                    Logout <img src="/Quiz-Images/power-off.svg" width={20} className="ms-1" alt="" />
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
        </div>
      </nav>
      <LoadingBar
        color="#f11946"
        progress={loading ? 80 : 100} // Adjust the progress value as needed
      />
      <div style={{ position: 'absolute', top: '0', width: '100%', textAlign: 'center' }}>
        {alert && <Alert type={alert.type} message={alert.message} />}
      </div>
    </>
  );
}

export default Navbar;

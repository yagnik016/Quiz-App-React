import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import LoadingBar from 'react-top-loading-bar'; // Import the LoadingBar component

const Login = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false); // Add loading state
  const [progress, setProgress] = useState(0); // State for the loading bar
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [buttonStyle, setButtonStyle] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      // If the user is already logged in, navigate to the login page with a message.
      navigate('/logout');
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setLoginError('Please fill in both fields');
        return;
      }
      setLoading(true); // Start loading

      const response = await axios.post(
        'https://www.api.greenweblab.com/v1/user/login',
        {
          username,
          password,
        }
      );
      setProgress(60); // Update progress during loading
      const userToken = response.data.data;
      setProgress(100); // Set progress to 100 when loading is complete
      localStorage.setItem('userToken', userToken);

      // Handle success, e.g., display a success message.
      setLoginSuccess(true);
      setLoginError('');

      // Delay the redirection by a few seconds (e.g., 1 seconds).
      setTimeout(() => {
        setLoading(false); // Stop loading
        navigate('/');
      }, 1000); // 1000 milliseconds (1 seconds)
    } catch (error) {
      // Handle errors, e.g., display an error message to the user.
      console.error('Login Failed', error);
      setLoginSuccess(false);
      setProgress(100);
      setLoginError('Login failed. Please check your credentials.');
      setLoading(false); // Stop loading in case of an error
    }
  };

  const handleButtonHover = () => {
    if (!username || !password) {
      // Generate a random position for the button
      const newX = Math.random() * 800;
      const newY = Math.random() * 500;
      setButtonStyle({
        transform: `translate(-${newX}px, -${newY}px )`,
        transition: 'transform 0.3s ease',
      });
    }
  };

  return (
    <div className='login'>
      <div style={{ position: 'absolute', top: '0', width: '100%', textAlign: 'center' }}>
        {loginSuccess && (
          <Alert type="success" message="Login Successful!" />
        )}

        {loginError && (
          <Alert type="danger" message={loginError} />
        )}
      </div>
      <div
        style={{
          background: '#b55800',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h2>Login</h2>

        <form>
          <div style={{ margin: '15px 0' }}>
            <input
              type="email"
              placeholder="Email"
              value={username}
              onChange={handleEmailChange}
              style={{ padding: '10px', width: '100%' }}
            />
          </div>
          <div style={{ margin: '15px 0' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              style={{ padding: '10px', width: '100%' }}
            />
          </div>
          <div style={{ margin: '15px 0' }}>
            <button
              type="button"
              onClick={() => {
                handleLogin();
                setLoginSuccess(false); // Reset success alert after click
                setLoginError(''); // Reset error alert after click
              }}
              onMouseEnter={handleButtonHover}
              style={{
                padding: '10px 20px',
                backgroundColor: '#000',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                ...buttonStyle,
              }}
            >
              Login
            </button>
          </div>
        </form>
        <p style={{ margin: '15px 0', color: '#000' }}>
          Do not have an account? <Link to="/signup">Register here</Link>
        </p>
      </div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)} // Reset progress when loading is finished
      />
    </div>
  );
};

export default Login;

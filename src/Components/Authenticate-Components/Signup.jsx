import { useState } from "react";
import axios from "axios";
import Alert from "../Alert";
import LoadingBar from "react-top-loading-bar"; // Import the LoadingBar component

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [buttonStyle, setButtonStyle] = useState({});
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false); // Add loading state
  const [progress, setProgress] = useState(0); // State for the loading bar
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "https://www.api.greenweblab.com/v1/user/signup",
        {
          name,
          email,
          password,
        }
      );
      setProgress(99.9999);

      // Handle success, e.g., display a success message or redirect to login.
      console.log("Signup Successful", response.data);
      setSignupSuccess(true);
      setSignupError("");
      setTimeout(() => {
        setLoading(false); // Stop loading
        setProgress(100); // Reset the progress
      }, 1000);
    } catch (error) {
      // Handle errors, e.g., display an error message to the user.
      console.error("Signup Failed", error);
      setSignupSuccess(false);
      setProgress(100);
      setSignupError(
        "Signup failed. Please check your information and try again."
      );
    }
  };

  const handleButtonHover = () => {
    if (!name || !email || !password) {
      // Generate random position for the button
      const newX = Math.random() * 10 - 5;
      const newY = Math.random() * 10 - 5;
      setButtonStyle({
        transform: `translate(${newX}px, ${newY}px)`,
        transition: "transform 0.3s ease",
      });
    }
  };

  return (
    <div className="signup">
      <div
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          textAlign: "center",
        }}
      >
        {signupSuccess && <Alert type="success" message="Signup Successful!" />}

        {signupError && <Alert type="danger" message={signupError} />}
      </div>

      <div
        style={{
          background: "#bdb9",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#0073e6", marginBottom: "20px" }}>Sign Up</h2>

        <form>
          <div style={{ margin: "15px 0" }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>
          <div style={{ margin: "15px 0" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>
          <div style={{ margin: "15px 0" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>
          <div style={{ margin: "15px 0" }}>
            <button
              type="button"
              onClick={() => {
                handleSignup();
                setSignupSuccess(false); // Reset success alert after click
                setSignupError(""); // Reset error alert after click
              }}
              onMouseEnter={handleButtonHover}
              style={{
                padding: "10px 20px",
                backgroundColor: "#0073e6",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s, transform 0.3s",
                ...buttonStyle,
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)} // Reset progress when loading is finished
      />
    </div>
  );
};

export default Signup;

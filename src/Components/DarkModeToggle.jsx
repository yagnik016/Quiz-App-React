import PropTypes from "prop-types"; // Import PropTypes
import Switch from "react-switch";

function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <>
      <span
        className="mx-2 fs-5 mb-1"
        style={{ color: darkMode ? "white" : "black" }}
      >
        Dark Mode
      </span>
      <div className="dark-mode-toggle">
        <Switch
          onChange={toggleDarkMode}
          checked={darkMode}
          onColor="#f11946"
          offColor="#ccc"
          checkedIcon={false}
          uncheckedIcon={false}
        />
      </div>
    </>
  );
}

DarkModeToggle.propTypes = {
  darkMode: PropTypes.bool.isRequired, // Validate darkMode as a required boolean
  toggleDarkMode: PropTypes.func.isRequired, // Validate toggleDarkMode as a required function
};

export default DarkModeToggle;

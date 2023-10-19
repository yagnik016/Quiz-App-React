import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const NextButton = ({ onClick, disabled, displayResultTrue }) => {
  const [buttonText, setButtonText] = useState(
    displayResultTrue ? "Show Result" : "Next"
  );

  useEffect(() => {
    if (displayResultTrue) {
      setButtonText("Show Result");
    } else {
      setButtonText("Next");
    }
  }, [displayResultTrue]);

  const handleClick = () => {
    if (buttonText === "Show Result") {
      setButtonText("Next");
    }
    onClick();
  };

  return (
    <button
      type="button"
      className="btn btn-dark"
      onClick={handleClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  displayResultTrue: PropTypes.bool.isRequired,
};

export default NextButton;

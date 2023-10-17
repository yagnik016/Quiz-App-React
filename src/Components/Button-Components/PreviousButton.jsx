import PropTypes from "prop-types";

const PreviousButton = ({ onClick, disabled }) => {
  return (
    <button
      className="btn btn-danger"
      onClick={onClick}
      disabled={disabled}
    >
      Previous
    </button>
  );
};

PreviousButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default PreviousButton;

import PropTypes from "prop-types";
const SubmitButton = ({ onClick, disabled }) => {
    return (
      <div className="text-center">
        <button className="btn btn-dark" onClick={onClick} disabled={disabled}>
          Submit Quiz
        </button>
      </div>
    );
  };
  
  SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };
  
  export default SubmitButton;
  
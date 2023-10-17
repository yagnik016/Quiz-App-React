import PropTypes from "prop-types";

function NavigationComponent(props) {
  const { allowPrevious, isLastQuestion, handlePrevClick, handleSubmitQuiz, handleNextClick } = props;

  return (
    <div className="my-3 d-flex justify-content-between align-items-center">
      {allowPrevious ? (
        <button onClick={handlePrevClick} className="btn btn-danger">
          Previous
        </button>
      ):<button disabled={true} onClick={handlePrevClick} className="btn btn-danger">
      Previous
    </button>}
      {isLastQuestion ? (
        <button onClick={handleSubmitQuiz} className="btn btn-success">
          Submit Quiz
        </button>
      ) : (
        <button onClick={handleNextClick} className="btn btn-primary">
          Next
        </button>
      )}
    </div>
  );
}

NavigationComponent.propTypes = {
  allowPrevious: PropTypes.number.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  handleSubmitQuiz: PropTypes.func.isRequired,
};

export default NavigationComponent;

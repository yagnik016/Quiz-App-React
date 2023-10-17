import PropTypes from "prop-types";

function QuizHeader(props) {
  const { quizTitle, timeRemaining, quizSubmitted } = props;

  return (
    <div>
      <h2 className="mb-5">{quizTitle}</h2>
      <div className="timer-container">
        Time Remaining: {quizSubmitted ? 0 : timeRemaining} seconds
      </div>
    </div>
  );
}

QuizHeader.propTypes = {
  quizTitle: PropTypes.string.isRequired,
  timeRemaining: PropTypes.number.isRequired,
  quizSubmitted: PropTypes.bool.isRequired,
};

export default QuizHeader;

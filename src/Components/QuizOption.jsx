import PropTypes from "prop-types";

const QuizOption = ({
  option,
  isOptionSelected,
  isCorrect,
  onChange,
  questionId,
  questionType,
  submissionSuccess,
  optionsLocked,
  displayResult,
}) => {
  const optionStyle = displayResult
    ? isOptionSelected
      ? isCorrect
        ? { backgroundColor: "green" }
        : { backgroundColor: "red" }
      : isCorrect
      ? { backgroundColor: "green" }
      : {}
    : {};

  return (
    <div className="quiz-option" style={optionStyle}>
      <input
        type={questionType === "Single Select" ? "radio" : "checkbox"}
        name={`question-${questionId}`}
        value={option.id}
        defaultChecked={isOptionSelected}
        onChange={onChange}
        disabled={submissionSuccess || optionsLocked}
      />
      <span style={optionStyle}>{option.option_text}</span>
    </div>
  );
};

QuizOption.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.number.isRequired,
    option_text: PropTypes.string.isRequired,
  }).isRequired,
  isOptionSelected: PropTypes.bool,
  isCorrect: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
  questionType: PropTypes.string.isRequired,
  submissionSuccess: PropTypes.bool.isRequired,
  optionsLocked: PropTypes.bool.isRequired,
  displayResult: PropTypes.bool.isRequired,
};

export default QuizOption;

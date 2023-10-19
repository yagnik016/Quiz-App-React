import PropTypes from "prop-types";

const QuestionResult = ({ question, selectedOption, isOptionCorrect }) => {
  return (
    <h5>
      Question Result:{" "}
      {isOptionCorrect(question.quizQuestionBank.id, selectedOption)
        ? "Correct"
        : "Incorrect"}
    </h5>
  );
};

QuestionResult.propTypes = {
  question: PropTypes.object.isRequired,
  selectedOption: PropTypes.number,
  isOptionCorrect: PropTypes.func.isRequired,
};

export default QuestionResult;

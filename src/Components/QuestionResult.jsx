import PropTypes from "prop-types";

const QuestionResult = ({ question, selectedOption, isOptionCorrect }) => {
  return (
    <p>
      Question Result: {isOptionCorrect(question.quizQuestionBank.id, selectedOption) ? "Correct" : "Incorrect"}
    </p>
  );
};

QuestionResult.propTypes = {
  question: PropTypes.object.isRequired,
  selectedOption: PropTypes.number,
  isOptionCorrect: PropTypes.func.isRequired,
};

export default QuestionResult;

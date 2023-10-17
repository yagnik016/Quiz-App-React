import PropTypes from "prop-types";

function QuestionComponent(props) {
  const {
    currentQuestion,
    selectedOptions,
    showAnswers,
    correctAnswerIds,
    currentQuestionIndex,
    handleOptionChange,
    quizScore,
  } = props;

  return (
    <div>
      <h3>Quiz Question {currentQuestionIndex + 1}</h3>
      <p>{currentQuestion.title}</p>
      {currentQuestion.quizQuestionOptionRandom.map((option,index) => (
        <div
          key={option.id}
          style={{
            border: "2px solid #ccc",
            padding: "10px",
            margin: "5px 0",
            backgroundColor:
              showAnswers && correctAnswerIds.includes(option.id)
                ? "green" // Correct answer background color
                : showAnswers &&
                  selectedOptions[currentQuestionIndex]?.includes(index)
                ? "red" // Incorrect answer background color
                : "transparent",
            borderColor:
              showAnswers &&
              selectedOptions[currentQuestionIndex]?.includes(index)
                ? "#007bff"
                : "#000",
          }}
        >
          {currentQuestion.quizQuestionType.title === "Single Select" ? (
            <input
              type="radio"
              name={`question-${currentQuestion.id}`}
              checked={selectedOptions[currentQuestionIndex]?.[0] === index}
              onChange={() => handleOptionChange(currentQuestionIndex, index)}
              disabled={quizScore !== null}
            />
          ) : (
            <input
              type="checkbox"
              name={`question-${currentQuestion.id}`}
              checked={selectedOptions[currentQuestionIndex]?.includes(index)}
              onChange={() => handleOptionChange(currentQuestionIndex, index)}
              disabled={quizScore !== null}
            />
          )}
          {option.option_text}
          {showAnswers && correctAnswerIds.includes(option.id) && (
            <span style={{ marginLeft: "10px", color: "green" }}>
              Correct Answer
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

QuestionComponent.propTypes = {
  currentQuestion: PropTypes.object.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  showAnswers: PropTypes.bool.isRequired,
  correctAnswerIds: PropTypes.array.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  quizScore: PropTypes.number,
};

export default QuestionComponent;

import PropTypes from "prop-types";

function AnswerComponent(props) {
  const { currentQuestion, showAnswers,  } = props;

  return (
    <div>
      
      {showAnswers && (
        <div>
          <h4>Explanation:</h4>
          <p>{currentQuestion.quizQuestionExplanation}</p>
        </div>
      )}
    </div>
  );
}

AnswerComponent.propTypes = {
  currentQuestion: PropTypes.object.isRequired,
  showAnswers: PropTypes.bool.isRequired,
  correctAnswerIds: PropTypes.array.isRequired,
};

export default AnswerComponent;

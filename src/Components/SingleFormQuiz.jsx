import PropTypes from "prop-types";
import QuestionResult from "./QuestionResult";
import QuizOption from "./QuizOption";
import SubmitButton from "./Button-Components/SubmitButton";

const SingleFormQuiz = ({
  questionData,
  selectedOptions,
  isOptionCorrect,
  handleOptionChange,
  submissionSuccess,
  optionsLocked,
  displayResult,
  handleSubmitQuiz,
}) => {
  const isLastQuestion = questionData.isLastQuestion;

  return (
    <div key={questionData.quizQuestionBank.id} className="mb-4">
      <h3>
        {`Question ${questionData.index + 1}: ${
          questionData.quizQuestionBank.title
        }`}
      </h3>
      {questionData.quizQuestionBank.description && (
        <p>Description: {questionData.quizQuestionBank.description}</p>
      )}
      {questionData.quizQuestionBank.quizQuestionOptionRandom.map((option) => (
        <QuizOption
          key={option.id}
          option={option}
          isOptionSelected={selectedOptions[
            questionData.quizQuestionBank.id
          ]?.includes(option.id)}
          isCorrect={isOptionCorrect(
            questionData.quizQuestionBank.id,
            option.id
          )}
          onChange={() =>
            handleOptionChange(
              questionData.quizQuestionBank.id,
              option.id,
              questionData.quizQuestionBank.quizQuestionType.title
            )
          }
          questionId={questionData.quizQuestionBank.id}
          questionType={questionData.quizQuestionBank.quizQuestionType.title}
          submissionSuccess={submissionSuccess}
          optionsLocked={optionsLocked}
          displayResult={displayResult}
        />
      ))}
      {displayResult && (
        <QuestionResult
          questionData={questionData}
          selectedOption={
            selectedOptions[questionData.quizQuestionBank.id]?.[0]
          }
          isOptionCorrect={isOptionCorrect}
        />
      )}
      {isLastQuestion && (
        <div className="text-center">
          <SubmitButton
            onClick={handleSubmitQuiz}
            disabled={submissionSuccess}
          />
        </div>
      )}
    </div>
  );
};

SingleFormQuiz.propTypes = {
  questionData: PropTypes.shape({
    index: PropTypes.number.isRequired,
    quizQuestionBank: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      quizQuestionOptionRandom: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          option_text: PropTypes.string.isRequired,
        })
      ).isRequired,
      quizQuestionType: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    isLastQuestion: PropTypes.func,
  }).isRequired,
  selectedOptions: PropTypes.object.isRequired,
  isOptionCorrect: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  submissionSuccess: PropTypes.bool.isRequired,
  optionsLocked: PropTypes.bool.isRequired,
  displayResult: PropTypes.bool.isRequired,
  handleSubmitQuiz: PropTypes.func.isRequired,
};

export default SingleFormQuiz;

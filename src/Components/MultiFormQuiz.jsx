import { useState } from "react";
import PropTypes from "prop-types";
import SubmitButton from "./Button-Components/SubmitButton";
import NextButton from "./Button-Components/NextButton";
import PreviousButton from "./Button-Components/PreviousButton";
import QuestionResult from "./QuestionResult";
import QuizOption from "./QuizOption";

const MultipleFormQuiz = ({
  quizData,
  currentQuestionIndex,
  selectedOptions,
  isOptionCorrect,
  handleOptionChange,
  submissionSuccess,
  optionsLocked,
  displayResult,
  displayResultTrue,
  handlePreviousQuestion,
  handleNextQuestion,
  allowPrevious,
  handleSubmitQuiz,
  isLastQuestion,
  showResult,
}) => {
  const [resultShown, setResultShown] = useState(false);

  return (
    <form>
      {quizData &&
        quizData.questions &&
        quizData.questions[currentQuestionIndex] && (
          <div
            key={quizData.questions[currentQuestionIndex].quizQuestionBank.id}
            className="mb-4"
          >
            <h3>
              {`Question ${currentQuestionIndex + 1}: ${quizData.questions[currentQuestionIndex].quizQuestionBank.title}`}
            </h3>
            <p>
              Description:{" "}
              {
                quizData.questions[currentQuestionIndex].quizQuestionBank.description
              }
            </p>

            {quizData.questions[currentQuestionIndex].quizQuestionBank.quizQuestionOptionRandom.map((option) => (
              <QuizOption
                key={option.id}
                option={option}
                isOptionSelected={selectedOptions[quizData.questions[currentQuestionIndex].quizQuestionBank.id]?.includes(option.id)}
                isCorrect={isOptionCorrect(quizData.questions[currentQuestionIndex].quizQuestionBank.id, option.id)}
                onChange={() => handleOptionChange(quizData.questions[currentQuestionIndex].quizQuestionBank.id, option.id, quizData.questions[currentQuestionIndex].quizQuestionBank.quizQuestionType.title)}
                questionId={quizData.questions[currentQuestionIndex].quizQuestionBank.id}
                questionType={quizData.questions[currentQuestionIndex].quizQuestionBank.quizQuestionType.title}
                submissionSuccess={submissionSuccess}
                optionsLocked={optionsLocked}
                displayResult={displayResult}
              />
            ))}
            {displayResult && (
              <QuestionResult
                question={quizData.questions[currentQuestionIndex]}
                selectedOption={selectedOptions[quizData.questions[currentQuestionIndex].quizQuestionBank.id]?.[0]}
                isOptionCorrect={isOptionCorrect}
              />
            )}
            <div className="text-center d-flex justify-content-between">
              <PreviousButton
                onClick={handlePreviousQuestion}
                disabled={submissionSuccess || currentQuestionIndex === 0 || !allowPrevious}
              />
              {isLastQuestion() ? (
                displayResultTrue ? (
                  resultShown ? (
                    <SubmitButton onClick={handleSubmitQuiz} disabled={submissionSuccess} />
                  ) : (
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => {
                        showResult();
                        setResultShown(true);
                      }}
                    >
                      Show Result
                    </button>
                  )
                ) : (
                  <SubmitButton onClick={handleSubmitQuiz} disabled={submissionSuccess} />
                )
              ) : (
                <NextButton
                  displayResultTrue={displayResultTrue}
                  onClick={handleNextQuestion}
                  disabled={submissionSuccess || currentQuestionIndex === quizData.questions.length - 1}
                />
              )}
            </div>
          </div>
        )}
    </form>
  );
};

MultipleFormQuiz.propTypes = {
  quizData: PropTypes.object.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  selectedOptions: PropTypes.object.isRequired,
  isOptionCorrect: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  submissionSuccess: PropTypes.bool.isRequired,
  optionsLocked: PropTypes.bool.isRequired,
  displayResult: PropTypes.bool.isRequired,
  handlePreviousQuestion: PropTypes.func.isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  allowPrevious: PropTypes.bool.isRequired,
  handleSubmitQuiz: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.func.isRequired,
  displayResultTrue: PropTypes.bool.isRequired,
  showResult: PropTypes.func.isRequired,
};

export default MultipleFormQuiz;

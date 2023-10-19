import PropTypes from "prop-types";
import QuestionResult from "./QuestionResult";

const QuizResult = ({
  quizResult,
  quizData,
  selectedOptions,
  isOptionCorrect,
}) => {
  const quizDescription = quizData?.quizQuestionBank?.description;
  return (
    <div>
      <h1 className="mb-5" style={{ textAlign: "center" }}>
        Quiz Result
      </h1>
      {quizResult ? (
        <div>
          <h1 className="text-center mb-5">
            Correct Answers: {quizResult.result.correct_count} out of{" "}
            {quizData?.quiz.no_of_question}
          </h1>
          <div>
            {quizData.questions.map((question, index) => (
              <div key={question.quizQuestionBank.id} className="mb-4">
                <h3>{`Question ${index + 1}: ${
                  question.quizQuestionBank.title
                }`}</h3>
                {quizDescription && (
                  <h5>Quiz Description: {quizDescription}</h5>
                )}
                <QuestionResult
                  question={question}
                  selectedOption={
                    selectedOptions[question.quizQuestionBank.id]?.[0]
                  }
                  isOptionCorrect={isOptionCorrect}
                />
                {question.quizQuestionBank.explanation && (
                  <h5>Explanation: {question.quizQuestionBank.explanation}</h5>
                )}
                {question.quizQuestionBank.quizQuestionOptionRandom.map(
                  (option) => {
                    const isOptionSelected = selectedOptions[
                      question.quizQuestionBank.id
                    ]?.includes(option.id);
                    const isCorrect = isOptionCorrect(
                      question.quizQuestionBank.id,
                      option.id
                    );
                    const optionStyle = {
                      backgroundColor: isCorrect
                        ? "green"
                        : isOptionSelected
                        ? "red"
                        : "transparent",
                      padding: "5px",
                    };

                    return (
                      <div
                        key={option.id}
                        className="quiz-option"
                        style={optionStyle}
                      >
                        <input
                          type={
                            question.quizQuestionBank.quizQuestionType.title ===
                            "Single Select"
                              ? "radio"
                              : "checkbox"
                          }
                          name={`question-${question.quizQuestionBank.id}`}
                          value={option.id}
                          checked={isOptionSelected}
                          disabled={true}
                        />
                        <span>{option.option_text}</span>
                      </div>
                    );
                  }
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center">Loading quiz Result...</h1>
      )}
    </div>
  );
};

QuizResult.propTypes = {
  quizResult: PropTypes.object,
  quizData: PropTypes.object,
  selectedOptions: PropTypes.object,
  isOptionCorrect: PropTypes.func.isRequired,
};

export default QuizResult;

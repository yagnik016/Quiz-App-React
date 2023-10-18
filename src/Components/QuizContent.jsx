import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ThankYouMessage from "./ThankYouMessage";
import QuizResult from "./QuizResult";
import SingleFormQuiz from "./SingleFormQuiz";
import MultipleFormQuiz from "./MultiFormQuiz";
import QuizHeader from "./QuizHeader";
import SubmitButton from "./Button-Components/SubmitButton";
import Spinner from "./Spinner";
import LoadingBar from "react-top-loading-bar";

const QuizContent = () => {
  const [quizData, setQuizData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  // eslint-disable-next-line
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [allowPrevious, setAllowPrevious] = useState(true);
  const [displayResult, setDisplayResult] = useState(false);
  const [optionsLocked, setOptionsLocked] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [singleForm, setSingleForm] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    parseInt(localStorage.getItem("currentQuestionIndex"), 10) || 0
  );
  const [timer, setTimer] = useState(() => {});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [progress, setProgress] = useState(0);


  const [remainingTime, setRemainingTime] = useState(
    parseInt(localStorage.getItem("remainingTime"), 10) || timer
  );
  const { quizId } = useParams();
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.api.greenweblab.com/v1/quiz/quiz-view?id=${quizId}`,
          { headers }
        );
        setProgress(60); // Update progress during loading

        const quizDataFromApi = response.data.data;
        setAllowPrevious(quizDataFromApi.quiz.allow_previous === 1);

        setQuizData(quizDataFromApi);
        setSingleForm(quizDataFromApi.quiz.single_form);

        const storedSelectedOptions = localStorage.getItem("selectedOptions");

        if (storedSelectedOptions) {
          setSelectedOptions(JSON.parse(storedSelectedOptions));
        }
        const quizTime = quizDataFromApi.quiz.quiz_time;
        setTimer(quizTime);
        if (
          quizDataFromApi.quiz.time_per_question === 1 &&
          quizDataFromApi.quiz.single_form === 1
        ) {
          // Calculate the total quiz time by multiplying the number of questions by the allotted time for each question
          const totalQuizTime = quizDataFromApi.questions.length * quizTime;
          setRemainingTime(remainingTime ? remainingTime : totalQuizTime);
          localStorage.setItem("remainingTime", totalQuizTime);
        } else {
          const storedRemainingTime = parseInt(
            localStorage.getItem("remainingTime"),
            10
          );
          setRemainingTime(
            storedRemainingTime && storedRemainingTime > 0
              ? storedRemainingTime
              : quizTime
          );
        }
        setLoading(false); // Mark loading as complete
        setProgress(100); // Update progress during loading


      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Mark loading as complete
        setProgress(100); // Update progress during loading


      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "currentQuestionIndex",
      currentQuestionIndex.toString()
    );
  }, [currentQuestionIndex]);

  const handleAutoSubmitQuiz = () => {
    if (singleForm === 1) {
      handleSubmitQuiz();
    } else {
      if (isLastQuestion()) {
        // If it's the last question, submit the quiz
        handleSubmitQuiz();
      } else {
        // Otherwise, move to the next question
        handleNextQuestion();
        const nextQuestionTime = quizData?.quiz.quiz_time;
        setTimer(nextQuestionTime);
        // Store the remaining time in localStorage
        localStorage.setItem("remainingTime", nextQuestionTime);
        setRemainingTime(nextQuestionTime);
      }
    }
  };

  useEffect(() => {
    let interval;

    if (remainingTime > 0 && !quizSubmitted) {
      interval = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
        // Store the remaining time in localStorage
        localStorage.setItem("remainingTime", remainingTime - 1);
      }, 1000);
    } else {
      clearInterval(interval); // Stop the timer
      localStorage.removeItem("remainingTime"); // Remove remaining time from local storage
      if (remainingTime === 0) {
        // Call the auto-submit function only if remainingTime is 0
        handleAutoSubmitQuiz();
      }
    }

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [
    remainingTime,
    optionsLocked,
    currentQuestionIndex,
    quizData,
    quizSubmitted,
  ]);

  const isOptionCorrect = (questionId, optionId) => {
    const question = quizData?.questions.find(
      (q) => q.quizQuestionBank.id === questionId
    );

    if (!question || !question.answered) {
      return false;
    }

    const selectedQuestionOptions = selectedOptions[questionId];
    if (!selectedQuestionOptions) {
      return false;
    }
    const correctOptionIds = JSON.parse(
      question.answered.quiz_question_option_correct_id || "[]"
    );

    return correctOptionIds.includes(optionId);
  };

  const handleOptionChange = (questionId, optionId, questionType) => {
    const newSelectedOptions = { ...selectedOptions };

    if (questionType === "Single Select") {
      newSelectedOptions[questionId] = [optionId];
    } else {
      if (!newSelectedOptions[questionId]) {
        newSelectedOptions[questionId] = [];
      }

      const optionIndex = newSelectedOptions[questionId].indexOf(optionId);

      if (optionIndex === -1) {
        newSelectedOptions[questionId].push(optionId);
      } else {
        newSelectedOptions[questionId].splice(optionIndex, 1);
      }
    }
    localStorage.setItem("selectedOptions", JSON.stringify(newSelectedOptions));
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    const displayResultTrue = quizData?.quiz.display_result === 1;
    if (currentQuestionIndex < quizData?.questions.length - 1) {
      if (displayResultTrue && !displayResult) {
        setDisplayResult(true);
        setOptionsLocked(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setDisplayResult(false);
        setOptionsLocked(false);
        setRemainingTime(timer); // Reset the timer for the next question
      }
    }
  };

  const handlePreviousQuestion = (e) => {
    e.preventDefault();
    if (allowPrevious && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      const requestData = {
        id: quizId,
        final_submit: 1,
        answered: Object.entries(selectedOptions).map(
          ([questionId, optionIds]) => ({
            question_id: parseInt(questionId, 10),
            option_id: optionIds,
          })
        ),
      };

      const response = await axios.post(
        "https://www.api.greenweblab.com/v1/quiz/take",
        requestData,
        { headers }
      );

      if (response.data.status) {
        setSubmissionSuccess(true);
        setSubmissionError(null);
        setQuizResult(response.data.data);
        setShowThankYouMessage(true);
        setShowQuizResult(false);
        setQuizSubmitted(true);
      } else {
        setSubmissionError(response.data.message);
        setSubmissionSuccess(false);
      }
      handleClearStorage();
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setSubmissionError("An error occurred while submitting the quiz.");
      setSubmissionSuccess(false);
    }
  };

  const isLastQuestion = () => {
    return currentQuestionIndex === quizData?.questions.length - 1;
  };

  const handleClearStorage = () => {
    localStorage.removeItem("selectedOptions");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("remainingTime");
  };
  const resetQuiz = () => {
    setShowThankYouMessage(false);
    setShowQuizResult(false);
    setSubmissionSuccess(false);
    setSelectedOptions({});
    setCurrentQuestionIndex(0); // Set the current question index to 0
    setRemainingTime(timer); // Reset the timer to its initial value
    setQuizSubmitted(false); // Reset quiz submission status

    // Clear local storage
    handleClearStorage();
    // Add any additional state variables that need to be reset to their initial values here
  };

  const renderContent = () => {
    const isRedTimer = remainingTime <= 5; // Check if remaining time is 5 seconds or less
    const displayResultTrue = quizData?.quiz.display_result === 1;

    if (!userToken) {
      return (
        <div>
          <h1 className="text-center mt-5">
            Please log in to Proceed Further.
          </h1>
          <Link
            className=" btn btn-warning mt-3"
            to="/login"
            style={{ marginLeft: "45%" }}
          >
            Go to Login
          </Link>
        </div>
      );
    }
    const showResult = () => {
      setDisplayResult(true);
      setOptionsLocked(true);
    };

    if (showThankYouMessage) {
      return (
        <ThankYouMessage
          quizData={quizData}
          onShowQuizResult={() => {
            setShowThankYouMessage(false);
            setShowQuizResult(true);
          }}
          onTakeQuizAgain={resetQuiz} // Call resetQuiz when the user clicks "Take Quiz Again"
        />
      );
    } else if (showQuizResult) {
      return (
        <QuizResult
          quizResult={quizResult}
          quizData={quizData}
          selectedOptions={selectedOptions}
          isOptionCorrect={isOptionCorrect}
        />
      );
    } else if (quizData) {
      return (
        <div>
          {/* Use the QuizHeader component here */}
          <QuizHeader
            title={quizData.quiz.title}
            remainingTime={remainingTime}
            isRedTimer={isRedTimer}
          />
          {singleForm === 1 ? (
            <form>
              {quizData.questions.map((question, index) => (
                <SingleFormQuiz
                  key={question.quizQuestionBank.id}
                  questionData={{
                    index,
                    quizQuestionBank: question.quizQuestionBank,
                  }}
                  selectedOptions={selectedOptions}
                  isOptionCorrect={isOptionCorrect}
                  handleOptionChange={handleOptionChange}
                  submissionSuccess={submissionSuccess}
                  optionsLocked={optionsLocked}
                  displayResult={displayResult}
                  handlePreviousQuestion={handlePreviousQuestion}
                  handleNextQuestion={handleNextQuestion}
                  allowPrevious={allowPrevious}
                  handleSubmitQuiz={handleSubmitQuiz}
                />
              ))}
              <div className="text-center">
                <SubmitButton
                  onClick={handleSubmitQuiz}
                  disabled={submissionSuccess}
                />
              </div>
            </form>
          ) : (
            <MultipleFormQuiz
              showResult={showResult}
              quizData={quizData}
              currentQuestionIndex={currentQuestionIndex}
              selectedOptions={selectedOptions}
              isOptionCorrect={isOptionCorrect}
              handleOptionChange={handleOptionChange}
              submissionSuccess={submissionSuccess}
              optionsLocked={optionsLocked}
              displayResult={displayResult}
              displayResultTrue={displayResultTrue}
              handlePreviousQuestion={handlePreviousQuestion}
              handleNextQuestion={handleNextQuestion}
              allowPrevious={allowPrevious}
              handleSubmitQuiz={handleSubmitQuiz}
              isLastQuestion={isLastQuestion}
            />
          )}
        </div>
      );
    } else {
      return (
        <div className="container">
          <Spinner />
        </div> // Display the Loader while loading
      );
    }
  };

 
  return (
    <div className="container" style={{ marginTop: '140px', marginLeft: '300px' }}>
      <LoadingBar
        color="#f11946"
        progress={progress}
      />
      {loading ? (
        <Spinner /> // Display the Loader while loading
      ) : (
        renderContent()
      )}
    </div>
  );
};

export default QuizContent;
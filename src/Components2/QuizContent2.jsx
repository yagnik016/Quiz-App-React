import { useState, useEffect } from "react";
import QuizHeader from "./QuizHeader";
import QuestionComponent from "./QuestionComponent";
import AnswerComponent from "./AnswerComponent";
import NavigationComponent from "./NavigationComponent";
import ResultComponent from "./ResultComponent";
import LoadingComponent from "./LoadingComponent";
import axios from "axios";

function QuizQuestions2() {
  const apiURL = "https://www.api.greenweblab.com/v1/quiz";
  const authToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjQyYzQ2Y2U2YjA3MGY4MCJ9.eyJzdWIiOiI0MmM0NmNlNmIwNzBmODAiLCJpc3MiOiIiLCJhdWQiOiIiLCJpYXQiOjE2OTQxNzI1MzAsImV4cCI6MTcwMjgxMjUzMCwianRpIjoiNmViNDFjMWE4MGIyZjNhIiwiaWQiOjUsInVzZXJuYW1lIjoiZnNmc2RmQGdtYWlsLmNvbSIsIm5hbWUiOiJLYXZvbG8gIn0.dnkxAX28uUFd7YUeqKiYB1HMLP_dfW0FY2AUzIHY0qg";

  const [state, setState] = useState({
    quizData: null,
    currentQuestionIndex: 0,
    selectedOptions: [],
    quizScore: null,
    quizSubmitted: false,
  });
  const [showAnswers, setShowAnswers] = useState(false); // State to control showing correct/incorrect answers
  const [timeRemaining, setTimeRemaining] = useState(null); // Initialize the timeRemaining state
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set()); // Initialize a set to keep track of answered questions
  const [quizData2, setquizData2] = useState(null);
  const [selectedOptions2, setselectedOptions2] = useState({});
  const [submissionError2, setsubmissionError2] = useState(null);
  const [submissionSuccess2, setsubmissionSuccess2] = useState(false);
  const [quizResult2, setquizResult2] = useState(null);
  const [timeRemaining2, settimeRemaining2] = useState(null);


  useEffect(() => {
    const bearerToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjE4NzNlNTc5OTBhYzg0MyJ9.eyJzdWIiOiIxODczZTU3OTkwYWM4NDMiLCJpc3MiOiIiLCJhdWQiOiIiLCJpYXQiOjE2OTU4ODM0NDMsImV4cCI6MTcwNDUyMzQ0MywianRpIjoiOGQ2MThjN2Q1OWZhOTBkIiwiaWQiOjEzNywidXNlcm5hbWUiOiJ5MTYxNkBnbWFpbC5jb20iLCJuYW1lIjoiWWFnbmlrICJ9.KOfNlKoWq4vyob7hQLTuWuNK7DNUKxv6nCOZ_-XLxW4";
    const quizId = 12;

    const headers = {
      Authorization: `Bearer ${bearerToken}`,
    };

    const fetchData2 = async () => {
      try {
        const storedStartTime = localStorage.getItem("quizStartTime");

        if (!storedStartTime) {
          // Set the quiz start time only if it's not already stored
          localStorage.setItem("quizStartTime", Date.now());
        }
        const response = await axios.get(
          `https://www.api.greenweblab.com/v1/quiz/quiz-view?id=${quizId}`,
          { headers }
        );
        
        const quizData2FromApi = response.data.data;
        // Check if a question should be random
        const shouldRandomizeQuestion =
          quizData2FromApi.quiz.random_question === 1;
        // Check if an option should be random
        const shouldRandomizeOption =
          quizData2FromApi.quiz.random_option === 1;

        // If random question is enabled, shuffle the questions
        if (shouldRandomizeQuestion) {
          quizData2FromApi.questions = shuffleArray2(quizData2FromApi.questions);
        }

        // If random option is enabled, shuffle the options for each question
        if (shouldRandomizeOption) {
          quizData2FromApi.questions.forEach((question) => {
            question.quizQuestionBank.quizQuestionOption = shuffleArray2(
              question.quizQuestionBank.quizQuestionOption
            );
          });
        }

        setquizData2(quizData2FromApi);
        const storedselectedOptions2 = localStorage.getItem("selectedOptions2");

        if (storedselectedOptions2) {
          setselectedOptions2(JSON.parse(storedselectedOptions2));
        }

        // Set the initial time remaining from the quiz data 
        settimeRemaining2(quizData2FromApi.quiz.quiz_time);
        if (storedStartTime) {
          const currentTime = Date.now();
          const elapsedMilliseconds =
            currentTime - parseInt(storedStartTime, 10);
          const initialtimeRemaining2 =
            quizData2FromApi.quiz.quiz_time -
            Math.floor(elapsedMilliseconds / 1000);

          // Ensure the time remaining is not negative
          if (initialtimeRemaining2 > 0) {
            settimeRemaining2(initialtimeRemaining2);
          } else {
            settimeRemaining2(0);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData2();
  }, []);
  const shuffleArray2 = (array) => {
    const shuffledArray2 = [...array];
    for (let i = shuffledArray2.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray2[i], shuffledArray2[j]] = [
        shuffledArray2[j],
        shuffledArray2[i],
      ];
    }
    return shuffledArray2;
  };

  useEffect(() => {
    async function fetchQuizData() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };

        const response = await axios.get(`${apiURL}/quiz-view?id=12`, config);

        const savedSelections = localStorage.getItem("userSelections") || "[]";
        const selectedOptions = JSON.parse(savedSelections);
        const storedStartTime = localStorage.getItem("quizStartTime");
        if (!storedStartTime) {
          // Set the quiz start time only if it's not already stored
          localStorage.setItem("quizStartTime", Date.now());
        }
        const storedQuestionIndex = localStorage.getItem(
          "currentQuestionIndex"
        );
        const initialQuestionIndex = storedQuestionIndex
          ? parseInt(storedQuestionIndex)
          : 0;

        // Check if the "random_question" attribute is set to 1, and shuffle questions accordingly
        let shuffledQuestions = response.data.data.questions;
        if (response.data.data.quiz.random_question === 1) {
          shuffledQuestions = shuffleArray(response.data.data.questions);
        }

        // Check if the "random_option" attribute is set to 1, and shuffle options accordingly for each question
        if (response.data.data.quiz.random_option === 1) {
          shuffledQuestions = shuffledQuestions.map((question) => ({
            ...question,
            quizQuestionBank: {
              ...question.quizQuestionBank,
              quizQuestionOptionRandom: shuffleArray(
                question.quizQuestionBank.quizQuestionOptionRandom
              ),
            },
          }));
        }
        const quizData2FromApi = response.data.data;

        setquizData2(quizData2FromApi);

        setState({
          ...state,
          quizData: {
            ...response.data.data,
            questions: shuffledQuestions,
          },
          selectedOptions: selectedOptions.length
            ? selectedOptions
            : Array(response.data.data.questions.length).fill([]),
          currentQuestionIndex: initialQuestionIndex,
          quizSubmitted: false, // Initialize quizSubmitted here
        });

        const storedTimeRemaining = localStorage.getItem("timeRemaining");
        const initialTimeRemaining = storedTimeRemaining
          ? parseInt(storedTimeRemaining)
          : response.data.data.quiz.quiz_time;

        setTimeRemaining(initialTimeRemaining);
        settimeRemaining2(quizData2FromApi.quiz.quiz_time);
        if (storedStartTime) {
          const currentTime = Date.now();
          const elapsedMilliseconds =
            currentTime - parseInt(storedStartTime, 10);
          const initialtimeRemaining2 =
            quizData2FromApi.quiz.quiz_time -
            Math.floor(elapsedMilliseconds / 1000);

          // Ensure the time remaining is not negative
          if (initialtimeRemaining2 > 0) {
            settimeRemaining2(initialtimeRemaining2);
          } else {
            settimeRemaining2(0);
          }
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }

    

    // Helper function to shuffle an array (Fisher-Yates shuffle)
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    fetchQuizData();
    // eslint-disable-next-line
  }, []);

  // ...
  

    const handleSubmitQuiz2 = async (e) => {
  if(e){
        e.preventDefault();
  
  }
      try {
        const bearerToken =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6ImE1NTQzMDg4MjYwNjdjMSJ9.eyJzdWIiOiJhNTU0MzA4ODI2MDY3YzEiLCJpc3MiOiIiLCJhdWQiOiIiLCJpYXQiOjE2OTUzNjY3NjIsImV4cCI6MTcwNDAwNjc2MiwianRpIjoiODA0NGRkNjY1OWEzZmU0IiwiaWQiOjEzMSwidXNlcm5hbWUiOiJ5MTE2NEBnbWFpbC5jb20iLCJuYW1lIjoiWWFnbmlrICJ9.dOZj25o2iSOKfHnJeWye7Q04W0xFZys2gv7QVhirfyY";
        const quizId = 12;
  
        const headers = {
          Authorization: `Bearer ${bearerToken}`,
        };
  
        const requestData = {
          id: quizId,
          answered: Object.entries(selectedOptions2).map(
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
          setsubmissionSuccess2(true);
          setsubmissionError2(null);
          setquizResult2(response.data.data);
        } else {
          setsubmissionError2(response.data.message);
          setsubmissionSuccess2(false);
        }
        localStorage.removeItem("selectedOptions2");
        localStorage.removeItem("quizStartTime");
  
      } catch (error) {
        console.log(submissionError2);
        console.error("Error submitting quiz:", error);
        setsubmissionError2("An error occurred while submitting the quiz.");
        setsubmissionSuccess2(false);
      }
    };
  
 useEffect(() => {
  let intervalId2;

  if (timeRemaining2 > 0) {
    intervalId2 = setInterval(() => {
      settimeRemaining2((prevTime) => prevTime - 1);
    }, 1000);
  } else if (timeRemaining2 === 0 && !submissionSuccess2) {
    // Timer has reached 0 and submission is not successful, automatically submit the quiz
    handleSubmitQuiz2();
  }

  return () => {
    if (intervalId2) {
      clearInterval(intervalId2);
    }
  };
  // eslint-disable-next-line
}, [timeRemaining2, submissionSuccess2]);


  useEffect(() => {
    let intervalId;

    if (!state.quizSubmitted && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
        // Save the updated timeRemaining in localStorage
        localStorage.setItem("timeRemaining", timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // Automatically move to the next question when the timer reaches 0
      handleNextClick();
    }

    // Clear the interval when moving to the next question
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
    // eslint-disable-next-line
  }, [state.quizSubmitted, timeRemaining]);

  const saveToLocalStorage = () => {
    localStorage.setItem("currentQuestionIndex", state.currentQuestionIndex);
    localStorage.setItem(
      "userSelections",
      JSON.stringify(state.selectedOptions)
    );
  };

  const handleNextClick = () => {
    const { currentQuestionIndex, quizData } = state;

    if (!state.quizSubmitted) {
      if (quizData.quiz.display_result === 1 && !showAnswers) {
        setShowAnswers(true);
        setAnsweredQuestions(
          (prev) => new Set([...prev, currentQuestionIndex])
        );
      } else {
        const nextQuestionIndex = currentQuestionIndex + 1;

        saveToLocalStorage();
        setTimeRemaining(quizData.quiz.quiz_time);

        if (nextQuestionIndex === quizData.questions.length) {
          handleSubmitQuiz();
        } else {
          setState({
            ...state,
            currentQuestionIndex: nextQuestionIndex,
          });
          setShowAnswers(false);
        }
      }
    }
  };

  const handlePrevClick = () => {
    const { currentQuestionIndex } = state;
    if (currentQuestionIndex > 0) {
      const prevQuestionIndex = currentQuestionIndex - 1;
      localStorage.setItem("currentQuestionIndex", prevQuestionIndex);
      setState({
        ...state,
        currentQuestionIndex: prevQuestionIndex,
      });
    }
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    if (answeredQuestions.has(questionIndex)) {
      return;
    }

    const updatedSelectedOptions = [...state.selectedOptions];
    updatedSelectedOptions[questionIndex] =
      updatedSelectedOptions[questionIndex] || [];
    const currentSelectedOptions = updatedSelectedOptions[questionIndex];

    if (
      quizData.questions[questionIndex].quizQuestionBank.quizQuestionType
        .title === "Single Select"
    ) {
      updatedSelectedOptions[questionIndex] = [optionIndex];
    } else {
      if (currentSelectedOptions.includes(optionIndex)) {
        updatedSelectedOptions[questionIndex] = currentSelectedOptions.filter(
          (index) => index !== optionIndex
        );
      } else {
        updatedSelectedOptions[questionIndex] = [
          ...currentSelectedOptions,
          optionIndex,
        ];
      }
    }

    setState({
      ...state,
      selectedOptions: updatedSelectedOptions,
    });
  };

  const handleSubmitQuiz = async () => {
    try {
      const { quizData, selectedOptions,  } = state;

      const selectedOptionIds = selectedOptions.map(
        (optionIndexes, questionIndex) =>
          optionIndexes.map(
            (optionIndex) =>
              quizData.questions[questionIndex].quizQuestionBank
                .quizQuestionOptionRandom[optionIndex].id
          )
      );

      const payload = {
        id: quizData.quiz.id,
        answered: selectedOptionIds.map((optionIds, questionIndex) => ({
          question_id: quizData.questions[questionIndex].quizQuestionBank.id,
          option_id: optionIds,
        })),
      };

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.post(`${apiURL}/take`, payload, config);
      localStorage.removeItem("userSelections");
      localStorage.removeItem("currentQuestionIndex");
      localStorage.removeItem("timeRemaining");

      setState({
        ...state,
        quizScore: response.data.data.result.correct_count,
        quizSubmitted: true,
      });
      setShowAnswers(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const { quizData, currentQuestionIndex, selectedOptions, quizScore } = state;

  if (!quizData) {
    return <LoadingComponent />;
  }

  if (
    currentQuestionIndex < 0 ||
    currentQuestionIndex >= quizData.questions.length
  ) {
    return <div>No current question found</div>;
  }

  const currentQuestion =
    quizData.questions[currentQuestionIndex].quizQuestionBank;
    const correctAnswerIdsJSON =
    quizData.questions[currentQuestionIndex]?.answered
    ?.quiz_question_option_correct_id;
  const correctAnswerIds = correctAnswerIdsJSON
    ? JSON.parse(correctAnswerIdsJSON)
    : [];

    const isOptionCorrect = (questionId, optionId) => {
      const question = quizData2?.questions.find(
        (q) => q.quizQuestionBank.id === questionId
      );
      if (!question) return false;
  
      const selectedQuestionOptions = selectedOptions2[questionId];
      if (!selectedQuestionOptions) return false;
  
      const correctOptionIds = JSON.parse(
        question.answered.quiz_question_option_correct_id
      );
      return correctOptionIds.includes(optionId);
    };
  
    const handleOptionChange2 = (questionId, optionId, questionType) => {
      // Create a copy of the selectedOptions2 state
      const newselectedOptions2 = { ...selectedOptions2 };
    
      // If the question type is "Single Select," remove any previous selections for this question
      if (questionType === "Single Select") {
        newselectedOptions2[questionId] = [optionId];
      } else {
        // If the question type is "Multi Select," toggle the selection of the clicked option
        if (!newselectedOptions2[questionId]) {
          newselectedOptions2[questionId] = [];
        }
    
        const optionIndex = newselectedOptions2[questionId].indexOf(optionId);
    
        if (optionIndex === -1) {
          // If the option is not selected, add it to the selected options
          newselectedOptions2[questionId].push(optionId);
        } else {
          // If the option is already selected, remove it
          newselectedOptions2[questionId].splice(optionIndex, 1);
        }
      }
      localStorage.setItem("selectedOptions2", JSON.stringify(newselectedOptions2));
  
      // Update the selectedOptions2 state with the new selections
      setselectedOptions2(newselectedOptions2);
    };
    
  

  if (state.quizData && state.quizData.quiz.single_form === 1) {
    return (
      <div className="container mt-5">
        {submissionSuccess2 ? (
          <div>
            <h1 className="mb-5" style={{ textAlign: "center" }}>
              Quiz Result
            </h1>
            {quizResult2 ? (
              <div>
                <p>
                  Correct Answers: {quizResult2.result.correct_count} out of{" "}
                  {quizData2?.quiz.no_of_question}
                </p>
                <div>
                  {quizData2.questions.map((question) => (
                    <div key={question.quizQuestionBank.id} className="mb-4">
                      <h3>{question.quizQuestionBank.title}</h3>
                      <p>
                        Question Result:{" "}
                        {isOptionCorrect(
                          question.quizQuestionBank.id,
                          selectedOptions2[question.quizQuestionBank.id]?.[0]
                        )
                          ? "Correct"
                          : "Incorrect"}
                      </p>
                      {question.quizQuestionBank.quizQuestionOptionRandom.map(
                        (option) => {
                          const isOptionSelected = selectedOptions2[
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
              <p>Loading quiz result...</p>
            )}
          </div>
        ) : quizData2 ? (
          <div className="mx-3">
            <h1 className="mb-5" style={{ textAlign: "center" }}>
              {quizData2.quiz.title}
            </h1>
            <div className="timer-container">Time Remaining: {timeRemaining2} seconds</div>
  
            <form>
            {quizData2 && quizData2.questions.map((question) => (
                <div key={question.quizQuestionBank.id} className="mb-4">
                  <h3>{question.quizQuestionBank.title}</h3>
                  {question.quizQuestionBank.quizQuestionOptionRandom.map((option) => {
                    const isOptionSelected = selectedOptions2[
                      question.quizQuestionBank.id
                    ]?.includes(option.id);
                    const isCorrect = isOptionCorrect(
                      question.quizQuestionBank.id,
                      option.id
                    );
                    const optionStyle = submissionSuccess2
                      ? isOptionSelected
                        ? isCorrect
                          ? { backgroundColor: "green" }
                          : { backgroundColor: "red" }
                        : isCorrect
                        ? { backgroundColor: "green" }
                        : {}
                      : {};
  
                    return (
                      <div key={option.id} className="quiz-option">
                        <input
                          type={
                            question.quizQuestionBank.quizQuestionType.title ===
                            "Single Select"
                              ? "radio"
                              : "checkbox"
                          }
                          name={`question-${question.quizQuestionBank.id}`}
                          value={option.id}
                          defaultChecked={isOptionSelected}
                          onChange={() =>
                            handleOptionChange2(
                              question.quizQuestionBank.id,
                              option.id,
                              question.quizQuestionBank.quizQuestionType.title
                            )
                          }
                          disabled={submissionSuccess2}
                        />
                        <span style={optionStyle}>{option.option_text}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="text-center">
                <button
                  className="btn btn-dark"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmitQuiz2(e);
                  }}
                  disabled={submissionSuccess2}
                >
                  Submit Quiz
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p>Loading quiz data...</p>
        )}
      </div>
    );
  }
  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

  return (
    <div className="container my-5">
      <QuizHeader
        quizTitle={quizData.quiz.title}
        timeRemaining={state.quizSubmitted ? 0 : timeRemaining}
        quizSubmitted={state.quizSubmitted}
      />

      <QuestionComponent
        currentQuestion={currentQuestion}
        selectedOptions={selectedOptions}
        showAnswers={showAnswers}
        correctAnswerIds={correctAnswerIds}
        currentQuestionIndex={currentQuestionIndex}
        handleOptionChange={handleOptionChange}
        quizScore={quizScore}
      />
      <AnswerComponent
        currentQuestion={currentQuestion}
        showAnswers={showAnswers}
        correctAnswerIds={correctAnswerIds}
      />
       <NavigationComponent
        allowPrevious={quizData.quiz.allow_previous}
        isLastQuestion={isLastQuestion}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
        handleSubmitQuiz={handleSubmitQuiz}
      />

      {quizScore !== null && <ResultComponent quizScore={quizScore} />}
    </div>
  );
}

export default QuizQuestions2;
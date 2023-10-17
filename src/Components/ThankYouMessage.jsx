import PropTypes from "prop-types";

const ThankYouMessage = ({ onShowQuizResult, onTakeQuizAgain,quizData }) => {
  const displayResultEnd = quizData?.quiz?.display_result_end;


  return (
    <div>
      <h1 className="mb-5" style={{ textAlign: "center" }}>
        Quiz Submitted Successfully
        <br />
        <br />
        Thank You!
      </h1>
      <div className="text-center">
        {displayResultEnd === 1 ? (
           <button
           className="btn btn-success mx-5"
           onClick={onShowQuizResult}
         >
           Show Quiz Result
         </button>
        ):
        <button
        style={{ display: "none" }}
          className="btn btn-success mx-5"
          onClick={onShowQuizResult}
        >
          Show Quiz Result
        </button>}
        <button className="btn btn-dark ml-2" onClick={onTakeQuizAgain}>
          Take Quiz Again
        </button>
      </div>
    </div>
  );
};

ThankYouMessage.propTypes = {
    quizData: PropTypes.object,
  onShowQuizResult: PropTypes.func.isRequired,
  onTakeQuizAgain: PropTypes.func.isRequired,
};

export default ThankYouMessage;

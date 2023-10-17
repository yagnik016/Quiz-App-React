import PropTypes from "prop-types";

function QuizCard({ quizItem, navigateToQuizDetails }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card border-dark card-gradient">
        <div className="card-gradient">
          <img
            src={quizItem.imageUrl}
            className="card-img-top"
            alt="Quiz Category Image"
          />
          <div className="card-body">
            <h2 className="card-title text-center mt-2">{quizItem.title}</h2>
            <button
              onClick={() => navigateToQuizDetails(quizItem.title)}
              className="btn btn-dark"
              style={{ marginLeft: "120px", marginTop: "15px" }}
            >
              Go to this Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

QuizCard.propTypes = {
  quizItem: PropTypes.object.isRequired,
  navigateToQuizDetails: PropTypes.func.isRequired,
};

export default QuizCard;

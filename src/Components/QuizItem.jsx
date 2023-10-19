import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function QuizItem({ quizItem }) {
  // Your QuizItem component code here

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
            <h4 className="card-title">{quizItem.title}</h4>
            <h6> Created At:- {quizItem.created_at}</h6>
            <h6> Updated At:- {quizItem.updated_at}</h6>
            <h6> Published At:- {quizItem.published_at}</h6>
            <h6> No of Questions:- {quizItem.no_of_question}</h6>
            <h6> Correct Answer Score:- +{quizItem.question_score}</h6>
            <h6> Wrong Answer Score:- -{quizItem.wrong_score_subtract}</h6>
            <h5> Quiz Time:- {quizItem.quiz_time} Seconds (per question)</h5>

            <Link
              to={`/take-quiz/${quizItem.id}`}
              className="btn btn-warning"
              style={{ marginLeft: "120px", marginTop: "15px" }}
            >
              Take This Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add prop validations
QuizItem.propTypes = {
  quizItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    published_at: PropTypes.string.isRequired,
    no_of_question: PropTypes.number.isRequired,
    question_score: PropTypes.number.isRequired,
    wrong_score_subtract: PropTypes.number.isRequired,
    quiz_time: PropTypes.number,
  }).isRequired,
};

export default QuizItem;

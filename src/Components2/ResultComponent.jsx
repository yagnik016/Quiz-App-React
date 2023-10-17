import PropTypes from "prop-types";

function ResultComponent(props) {
  const { quizScore } = props;

  return (
    <div className="mt-3">
      <h3>Your Quiz Score: {quizScore}</h3>
    </div>
  );
}

ResultComponent.propTypes = {
  quizScore: PropTypes.number,
};

export default ResultComponent;

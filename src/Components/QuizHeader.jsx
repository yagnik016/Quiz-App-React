import PropTypes from "prop-types";

const QuizHeader = ({ title, remainingTime, isRedTimer }) => {
  const formatTime = (seconds) => {
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      const remainingSeconds = seconds % 3600;
      const minutes = Math.floor(remainingSeconds / 60);
      const secs = remainingSeconds % 60;
      return `${hours} hour${hours > 1 ? "s" : ""}, ${minutes} minute${
        minutes > 1 ? "s" : ""
      }, ${secs} second${secs > 1 ? "s" : ""}`;
    } else if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes} minute${minutes > 1 ? "s" : ""}, ${secs} second${
        secs > 1 ? "s" : ""
      }`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  };

  return (
    <div className="mx-3">
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <div className="text-center">
        <div className="text-center">
          <h2
            style={{
              color: isRedTimer ? "red" : "#000",
              margin: "30px",
              fontSize: "50px",
            }}
          >
            Time Remaining: {formatTime(remainingTime)}
          </h2>
        </div>
      </div>
    </div>
  );
};

QuizHeader.propTypes = {
  title: PropTypes.string.isRequired,
  remainingTime: PropTypes.number,
  isRedTimer: PropTypes.bool.isRequired,
};

export default QuizHeader;

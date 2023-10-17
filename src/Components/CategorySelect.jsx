import PropTypes from "prop-types";

function CategorySelect({ quizData, selectedCategory, handleCategorySelect }) {
  return (
<div className="btn-group" role="group" aria-label="Categories" style={{ display: "none" }}>
      {quizData.length === 0 ? (
        <p>No Categories Found</p>
      ) : (
        quizData.map((quizItem) => (
          <button
            key={quizItem.id}
            type="button"
            className={`btn ${
              selectedCategory === quizItem?.quizCategory?.title
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => handleCategorySelect(quizItem?.quizCategory?.title)}
          >
            {quizItem?.quizCategory?.title}
          </button>
        ))
      )}
    </div>
  );
}

CategorySelect.propTypes = {
  quizData: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  handleCategorySelect: PropTypes.func.isRequired,
};

export default CategorySelect;

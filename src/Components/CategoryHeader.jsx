import PropTypes from "prop-types";

function CategoryHeader({ selectedCategory }) {
  return (
    <h1 className="text-center mb-3">Quizzes in Category: {selectedCategory}</h1>
  );
}

// Add prop validation
CategoryHeader.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default CategoryHeader;

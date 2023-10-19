import PropTypes from "prop-types";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar"; // Import LoadingBar

function SearchBar({ searchQuery, setSearchQuery }) {
  // State to control loading bar visibility
  const [loadingBarVisible, setLoadingBarVisible] = useState(false);

  // Function to handle input changes and show the loading bar
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Show the loading bar whenever the input changes
    setLoadingBarVisible(true);

    // Simulate a delay to give the loading bar time to appear
    setTimeout(() => {
      setLoadingBarVisible(false);
    }, 1000); // You can adjust the delay time as needed
  };

  return (
    <div className="col-md-12 mb-3 ">
      <input
        type="text"
        className="form-control searchBar"
        placeholder="Search quizzes..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <LoadingBar
        color="#f11946"
        progress={loadingBarVisible ? 99.99 : 100} // Show loading bar (30) or hide (100)
        waitingTime={300}
      />
    </div>
  );
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;

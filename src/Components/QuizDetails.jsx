import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import QuizItem from "./QuizItem";
import CategoryHeader from "./CategoryHeader";
import NoResults from "./NoResults";
import Spinner from "./Spinner";
import LoadingBar from "react-top-loading-bar";

export default function QuizDetails() {
  const [quizzes, setQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const selectedCategory = new URLSearchParams(location.search).get("category");
  const [noResults, setNoResults] = useState(false); // Add state for no results
  const userToken = localStorage.getItem("userToken");
  const [loading, setLoading] = useState(true); // Add loading state
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch data from the API using async/await
    async function fetchData() {
      try {
        if (!userToken) {
          // If the user is not logged in, set noResults state to true
          setNoResults(true);
          setLoading(false); // Mark loading as complete

          return;
        }

        const response = await axios.get(
          `https://www.api.greenweblab.com/v1/quiz/quiz-search?expand=quizQuestion&quizCategory.title=${encodeURIComponent(
            selectedCategory
          )}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setProgress(60); // Update progress during loading

        const filteredQuizzes = response.data.data.items.filter(
          (quizItem) =>
            quizItem.quizCategory.title === selectedCategory &&
            quizItem.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredQuizzes.length === 0) {
          // Set noResults state to true when no results are found
          setNoResults(true);
        } else {
          setNoResults(false); // Reset noResults state when results are found
        }

        setQuizzes(filteredQuizzes);
        setLoading(false); // Mark loading as complete
        setProgress(100); // Set progress to 100 when loading is complete
      } catch (error) {
        console.error("Error fetching data:", error);
        setProgress(100); // Set progress to 100 when loading is complete
      }
    }

    if (selectedCategory) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [selectedCategory, searchQuery, userToken]);

  return (
    <div className="container mt-5">
      <CategoryHeader selectedCategory={selectedCategory} />
      <div className="mb-3">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="row">
        <LoadingBar color="#f11946" progress={progress} />
        {loading ? (
          <Spinner />
        ) : noResults ? (
          <div className="col-12">
            {userToken ? (
              <NoResults />
            ) : (
              <div>
                <h1 className="text-center mt-5">
                  Please log in to Proceed Further.
                </h1>
                <Link
                  className="btn btn-warning mt-3"
                  to="/login"
                  style={{ marginLeft: "45%" }}
                >
                  Go to Login
                </Link>
              </div>
            )}
          </div>
        ) : (
          quizzes.map((quizItem) => (
            <QuizItem key={quizItem.id} quizItem={quizItem} />
          ))
        )}
      </div>
    </div>
  );
}

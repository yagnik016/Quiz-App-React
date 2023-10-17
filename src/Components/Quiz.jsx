import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App";
import CategorySelect from "./CategorySelect";
import QuizCard from "./QuizCard";
import SearchBar from "./SearchBar";
import NoResults from "./NoResults";
import Spinner from "./Spinner";
import LoadingBar from "react-top-loading-bar"; // Import LoadingBar


export default function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [progress, setProgress] = useState(0); // State for the loading bar

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const userToken =
        localStorage.getItem('userToken');
        const response = await axios.get(
          "https://www.api.greenweblab.com/v1/quiz/quiz-category",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setProgress(60); // Update progress during loading

     // Update progress during loading


        setQuizData(response.data.data.items);
        setFilteredData(response.data.data.items);
        setLoading(false); // Mark loading as complete
        setProgress(100); // Set progress to 100 when loading is complete

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Mark loading as complete even in case of an error
        setProgress(100); // Set progress to 100 when loading is complete

      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = quizData.filter((quizItem) =>
      quizItem.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, quizData]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const filtered = quizData.filter(
      (quizItem) => quizItem?.quizCategory?.title === category
    );
    setFilteredData(filtered);
  };

  const navigateToQuizDetails = (category) => {
    navigate(`/quiz-details?category=${encodeURIComponent(category)}`);
  };

 
  return (
    <>
    <LoadingBar
        color="#f11946" // Customize the loading bar color
        progress={progress} // Pass the progress state to the LoadingBar component
      />
    <div className="container" style={{ marginTop: '60px' }}>
      {loading ? (
        <>
        <Spinner />
        </> // Display the Loader while loading
      ) : (
        <div>
          <div className="row">
            <div className="col-md-12 mb-3">
              <h1 style={{ textAlign: 'center' }}>Select a Category:</h1>
              <CategorySelect
                quizData={quizData}
                selectedCategory={selectedCategory}
                handleCategorySelect={handleCategorySelect}
              />
            </div>
          </div>
          <div className="row">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="row">
            {filteredData.length === 0 ? (
              <div className="col-12">
                {quizData.length > 0 && <NoResults />}
              </div>
            ) : (
              filteredData.map((quizItem) => (
                <QuizCard
                  key={quizItem.id}
                  quizItem={quizItem}
                  navigateToQuizDetails={navigateToQuizDetails}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
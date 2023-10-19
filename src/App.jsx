import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Quiz from "./Components/Quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizDetails from "./Components/QuizDetails";
import Login from "./Components/Authenticate-Components/Login";
import AboutUs from "./Components/AboutUs";
import Signup from "./Components/Authenticate-Components/Signup";
import Navbar from "./Components/Navbar";
import QuizContent from "./Components/QuizContent";
import QuizContent2 from "./Components2/QuizContent2";
import HomePage from "./Components/HomePage";
import Logout from "./Components/Authenticate-Components/Logout";
import UserProfile from "./Components/UserProfile";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/my-profile" element={<UserProfile />} />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/quiz-details" element={<QuizDetails />} />
          <Route exact path="/take-quiz/:quizId" element={<QuizContent />} />
          <Route exact path="/quiz/questions/m2" element={<QuizContent2 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

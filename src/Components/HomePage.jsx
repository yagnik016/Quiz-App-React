import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import LoadingBar from "react-top-loading-bar"; // Import LoadingBar


function HomePage() {


  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Function to decode the token and extract the user's name
    function decodeToken() {
      // Check if user token is available in local storage
      const userToken = localStorage.getItem('userToken');

      if (userToken) {
        // Decode the user token using jwt-decode
        try {
          const decodedToken = jwt_decode(userToken);

          // Extract the user's name from the decoded token
          if (decodedToken && decodedToken.name) {
            return decodedToken.name;
          }
        } catch (error) {
          // Handle any errors when decoding the token
          console.error('Error decoding the token:', error);
        }
      }

      return null; // Return null if token is not available or not valid
    }

    // Call the decodeToken function and set the userName state
    const decodedName = decodeToken();

    if (decodedName) {
      setUserName(decodedName);
    }
  }, []);



  return (
    <div className={`home-page container`} style={{ marginTop: '300px', marginLeft: '300px' }}>
      <LoadingBar
        color="#f11946"
        progress={100} // Set progress to 100 to hide the loading bar
      />
      <header>
        <h1 className="h123">
        Welcome {userName && <span style={{ color: 'blue', fontWeight: 'bold',backdropFilter: 'blur(500px)' }} > {userName}</span>} to the GreenWebLab-Quiz
        </h1>
      </header>
      <main>
        <section className="quiz-description">
          <h1>Test your knowledge</h1>
          <h3>Are you ready to challenge yourself ? Take our quiz and see how much you know!</h3>
        </section>
        <section className="quiz-start">
          <Link to="/quiz">
            <button className="start-button">Start Quiz Journey</button>
          </Link>
        </section>
      </main>

    </div>
  );
}

export default HomePage;

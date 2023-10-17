import LoadingBar from "react-top-loading-bar";

function AboutUs() {
  return (
    <div className="about-us container">
    <LoadingBar
      color="#f11946"
      progress={100} // Set progress to 100 to hide the loading bar
    />
    <h1>Welcome to GreenWebLab-Quiz</h1>
      <section className="mission-vision">
        <h2>Our Mission</h2>
        <p>
          At GreenWebLab-Quiz, our mission is to make learning fun and engaging through interactive quizzes. We believe in the power of knowledge and aim to provide a platform that inspires curiosity and lifelong learning.
        </p>
        
        <h2>Our Vision</h2>
        <p>
          Our vision is to become a global leader in online education by offering a diverse range of high-quality quizzes that cater to learners of all ages and backgrounds. We strive to create a community of curious minds and passionate learners.
        </p>
      </section>

      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-member">
          <img src="team_member1.jpg" alt="John Doe" />
          <h3>John Doe</h3>
          <p>Founder & CEO</p>
        </div>

        <div className="team-member">
          <img src="team_member2.jpg" alt="Jane Smith" />
          <h3>Jane Smith</h3>
          <p>Content Developer</p>
        </div>
        
        {/* Add more team members as needed */}
      </section>

      <section className="our-story">
        <h2>Our Story</h2>
        <p>
      GreenWebLab-Quiz was founded in 2023 with a simple idea: to create a platform that makes learning enjoyable and accessible to everyone. Since then, we have grown from a small startup to a thriving educational community, serving millions of users worldwide.
        </p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li>Thousands of quizzes on various topics.</li>
          <li>User-friendly interface for a seamless learning experience.</li>
          <li>Instant feedback and performance tracking.</li>
          <li>Create and share your quizzes with our community.</li>
          <li>Mobile-responsive design for learning on the go.</li>
        </ul>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>GreenWebLab-Quiz has transformed my learning experience. The quizzes are not only informative but also incredibly fun!</p>
          <p>- Emma, Student</p>
        </div>
        
        <div className="testimonial">
          <p>I use GreenWebLab-Quiz to prepare for exams, and it has significantly improved my grades. Highly recommended!</p>
          <p>- Michael, Teacher</p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;

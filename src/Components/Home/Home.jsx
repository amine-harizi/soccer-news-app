import { Link } from "react-router-dom";
import LogoLink from "../LogoLink";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-page">
      <header className="header">
       <LogoLink/>
        <nav className="nav-container">
          <Link to="/news">Watch</Link>
          <Link to="/standings">Stadings</Link>
        </nav>
      </header>
      <div className="hero-section">
        <h1>
          Wanna enjoy some of the latest football videos?
        </h1>
        <h2>We've got the best videos for you.</h2>
          <Link to='/news'>Watch now!</Link>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fillOpacity="1"
            d="M0,224L40,218.7C80,213,160,203,240,213.3C320,224,400,256,480,234.7C560,213,640,139,720,106.7C800,75,880,85,960,117.3C1040,149,1120,203,1200,192C1280,181,1360,107,1400,69.3L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Home;

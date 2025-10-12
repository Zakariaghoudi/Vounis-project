import "../App.css";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="section-home">
        <h1 className="home-title">
          Connect, Create, Contribute :
          <br />
          Volunteer For Your Society
        </h1>
        <span className="home-description">
          Discover the opportunities near you
          <br />
          And become a vital part of the local scene.
        </span>
        <div className="links-home">
          <Link className="link-support" to={"/contact"}>
            Support us
          </Link>
          <Link className="link-discover" to={"/discover"}>
            Discover our opportunities
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;

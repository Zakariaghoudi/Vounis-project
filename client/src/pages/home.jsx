import "../App.css";
import "../styles/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-hero">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Connect. Create. Contribute.</h1>
          <p className="hero-sub">
            Volunteer for your community — find meaningful opportunities near
            you.
          </p>
          <div className="hero-ctas">
            <Link to="/discover" className="btn primary">
              Discover Opportunities
            </Link>
            <Link to="/contact" className="btn ghost">
              Contact / Support
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden>
          <div className="visual-card">
            <div className="tag">Local • Impact</div>
            <h3>Make a real difference — start today</h3>
            <p>
              Join hosts and volunteers building projects and events near you.
            </p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h4>Easy to Join</h4>
          <p>Sign up in minutes and apply to opportunities with one click.</p>
        </div>
        <div className="feature">
          <h4>Local Impact</h4>
          <p>Find causes and hosts in your neighborhood that need help.</p>
        </div>
        <div className="feature">
          <h4>Trusted Hosts</h4>
          <p>Verified organizers and transparent event details.</p>
        </div>
      </section>

      <section className="about">
        <div className="about-card">
          <h2>Who we are</h2>
          <p>
            We are a community-driven platform connecting volunteers with local
            hosts running social and cultural projects. Our mission is to make
            it easy for people to contribute their time and skills where they
            matter most.
          </p>
          <ul>
            <li>Discover projects by location and skill.</li>
            <li>Apply with one click and track your applications.</li>
            <li>Hosts manage opportunities and review applicants.</li>
          </ul>
        </div>
        <img
          src="https://friendsoflumspond.org/blog/23-10-26_hero.jpg"
          className="about-image"
        />
      </section>

      <section className="agents">
        <h2 className="section-title">Meet our Agents</h2>
        <p className="section-sub">
          The people who organize and run the opportunities — experienced and
          local.
        </p>
        <div className="agents-grid">
          <article className="agent-card">
            <img
              className="agent-photo"
              src="https://static.vecteezy.com/system/resources/previews/052/162/762/non_2x/a-man-with-a-beard-and-mustache-avatar-in-a-flat-style-free-vector.jpg"
            />

            <div className="agent-info">
              <h3 className="agent-name">Flen 1</h3>
              <div className="agent-meta">Host • Community Organizer</div>
              <div className="agent-exp">8 years experience</div>
              <p className="agent-bio">
                Passionate about youth projects and local events. Agent1
                coordinates volunteers and builds long-term community programs.
              </p>
            </div>
          </article>

          <article className="agent-card">
            <img
              className="agent-photo"
              src="https://static.vecteezy.com/system/resources/previews/052/162/762/non_2x/a-man-with-a-beard-and-mustache-avatar-in-a-flat-style-free-vector.jpg"
            />
            <div className="agent-info">
              <h3 className="agent-name">Flen 2</h3>
              <div className="agent-meta">Host • Event Manager</div>
              <div className="agent-exp">5 years experience</div>
              <p className="agent-bio">
                Agent2 oversees logistics for cultural events and coordinates
                with local partners to maximize impact.
              </p>
            </div>
          </article>

          <article className="agent-card">
            <img
              className="agent-photo"
              src="https://static.vecteezy.com/system/resources/previews/052/162/762/non_2x/a-man-with-a-beard-and-mustache-avatar-in-a-flat-style-free-vector.jpg"
            />
            <div className="agent-info">
              <h3 className="agent-name">Flen 3</h3>
              <div className="agent-meta">Volunteer Lead</div>
              <div className="agent-exp">6 years experience</div>
              <p className="agent-bio">
                Agent3 matches volunteers to projects, mentors new volunteers, and
                runs onboarding workshops.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Home;

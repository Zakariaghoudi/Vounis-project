


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="footer-title">Vounis</h4>
          <p>Simple steps to connect and collaborate.</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Explore</h4>
          <a href="/how-it-work" className="footer-link">How It Works</a>
          <a href="/discover" className="footer-link">Discover</a>
          <a href="/contact" className="footer-link">Contact Us</a>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Legal</h4>
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <a href="/terms-of-service" className="footer-link">Terms of Service</a>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Connect</h4>
          <div className="social-icons">
            {/*  social media icons/links */}
            <a href="https://facebook.com/ghoudi8" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i> 
            </a>
            <a href="https://linkedin.com/in/zakariaghoudi" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://instagram.com/ghoudizakaria" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} Vounis. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
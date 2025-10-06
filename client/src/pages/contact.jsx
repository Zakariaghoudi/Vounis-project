import { Link } from "react-router-dom";
import "../styles/contact.css";

import {
  Send,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  User,
  Zap,
} from "lucide-react";

// The main component for the page
const App = () => {
  return (
    <>
      <div className="contact-container">
        <div className="content-wrapper">
          {/* Header Section - Title and Description */}
          <header className="header-contact">
          <h1 className="header-title">Contact Us</h1>
            <p className="header-description">
              We are here to answer all your inquiries, whether you are
              interested in joining or have a question about our services.
            </p>
          </header>

          {/* Main Content Section: Contact Info + Form */}
          <main className="main-grid">
            {/* Left Column: Quick Contact Information */}
            <div className="info-section">
              <h2 className="info-header">Contact Information</h2>
               <div className="info-card">
               <Mail 
               size={60}
              />
                <h4>vounis@gmail.com</h4>
              <Phone
                size={60}
              />
              <h4>+216 70 000 000</h4>

              <MapPin size={60} color="#048335ff"
                  />
                <h4>Gabes, Tunis</h4>
                </div>
              {/* Social Media Icons */}
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <Facebook size={24} />
                </a>
                <a href="#" className="social-icon">
                  <Twitter size={24} />
                </a>
                <a href="#" className="social-icon">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="form-card">
              <h2 className="form-title">Send Us a Message</h2>
              <form className="form-body">
                {/* Name and Email fields in one row */}
                <div className="input-group-row">
                  <div>
                    <label htmlFor="name" className="input-label">
                      <User size={16} /> Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="input-label">
                      <Mail size={16} /> Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label htmlFor="subject" className="input-label">
                    <Zap size={16} /> Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="input-field"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="message" className="input-label">
                    <MessageCircle size={16} /> Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="textarea-field"
                  ></textarea>
                </div>

                {/* Submission button */}
                <button type="submit" className="submit-btn">
                  Send Message <Send size={20} />
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;

import "../styles/contact.css";
import emailjs from "@emailjs/browser";
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
import { useState } from "react";

// The main component for the page
const App = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SERVICE_ID = "service_b2wr0kc";
  const TEMPLATE_ID = "template_xriz68d";
  const PUBLIC_KEY = "fvuR9NGdqOAY0iCJw";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    // basic required fields
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in name, email and message.");
      return;
    }

    setIsSubmitting(true);

    const templateParams = { ...form };

    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      console.log("SUCCESS!", response.status, response.text);
      alert("Message sent — thank you!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.log("FAILED...", err);
      alert("Failed to send the message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="content-wrapper">
        <header className="header-contact">
          <h1 className="header-title">Contact Us</h1>
          <p className="header-description">
            We are here to answer all your inquiries, whether you are interested
            in joining or have a question about our services.
          </p>
        </header>

        <main className="main-grid">
          <div className="info-section">
            <h2 className="info-header">Contact Information</h2>
            <div className="info-card">
              <Mail color=" #6cbea1" size={50} />
              <h4>vounis.center@gmail.com</h4>
              <Phone color=" #6cbea1" size={50} />
              <h4>+216 70 000 000</h4>

              <MapPin size={50} color=" #6cbea1" />
              <h4>Gabes, Tunis</h4>
            </div>
            {/* Social Media Icons */}
            <div className="social-icons">
              <a href="#" className="social-icon">
                <Facebook size={24} color=" #6cbea1" />
              </a>
              <a href="#" className="social-icon">
                <Twitter size={24} color=" #6cbea1" />
              </a>
              <a href="#" className="social-icon">
                <Linkedin size={24} color=" #6cbea1" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="form-card">
            <h2 className="form-title">Send Us a Message</h2>
            <form className="form-body" onSubmit={handleSubmit}>
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
                    value={form.name}
                    onChange={handleChange}
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
                    value={form.email}
                    onChange={handleChange}
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
                  value={form.subject}
                  onChange={handleChange}
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
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="textarea-field"
                ></textarea>
              </div>

              {/* Submission button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}{" "}
                <Send size={20} />
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

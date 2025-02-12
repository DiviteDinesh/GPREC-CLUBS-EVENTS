import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import "../App.css";
  const Footer = () => {
  // FAQ Expand/Collapse State
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I join a club?",
      answer: "Visit the club's page and click on 'Join' to register.",
    },
    {
      question: "Where can I find event details?",
      answer: "Check the 'Events' section for upcoming and past events.",
    },
    {
      question: "How do I contact the administration?",
      answer: "Use the 'Contact Us' section below for details.",
    },
    {
      question: "How can I access learning resources?",
      answer: "Our 'Useful Links' section contains all learning resources.",
    },
  ];

  return (
    <footer className="footer text-md-start " id="contact">
      <div className="container footer-container bg-">
        <hr />
        <br />

        <div className="row">
          <div className="col-12 col-md-3 social-links">
            <h5 className="ml">Follow Us</h5>
            <div
              className="d-flex justify-content-start gap-3 align-items-center pb-2 "
              style={{ marginTop: "20px" }}
            >
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Contact Us - 20% */}
          <div className="col-12 col-md-4 contact-info">
            <h5>Contact Us</h5>
            <p>
              <FaPhone /> +91 98765 43210
            </p>
            <p>
              <FaEnvelope /> support@gprec.edu
            </p>
            <p>G. Pulla Reddy Engineering College, Kurnool</p>
          </div>

          {/* FAQs - 50% */}
          <div className="col-12 col-md-4 faqs">
            <h5>FAQs</h5>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  backgroundColor: "#f9f9f99a",
                }}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  style={{
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    width: "100%",
                    padding: "0",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {faq.question}{" "}
                  {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openFAQ === index && (
                  <p
                    className="faq-answer"
                    style={{ marginTop: "10px", color: "#555" }}
                    >
                    {faq.answer}
                  </p>
                )}
                <br />
              </div>
            ))}
          </div>
        </div>
        <br />
        <h3 className="fw-bold text-center text-info-emphasis">Made by Divite Dinesh (229X1A33A4) </h3>

      </div>
    </footer>
  );
};

export default Footer;

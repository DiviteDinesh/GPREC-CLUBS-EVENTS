import { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Ensure styles are correctly defined
const testimonialsData = [
  {
    id: 1,
    name: "Divite Dinesh",
    text: "Being part of the CodeChef GPREC Chapter transformed my coding skills! The mentorship, weekly contests, and problem-solving sessions helped me excel in CodeChef and Codeforces. The club's collaborative environment makes it the best place to learn and grow as a developer.",
    image: "/dinesh.jpg",
    linkedin: "https://www.linkedin.com/in/divitedinesh",
  },
  {
    id: 2,
    name: "Kabeer Ahmed",
    text: "IEEE Student Branch at GPREC has been a game-changer! The technical workshops, AI projects, and industry expert sessions provided real-world exposure. The club's strong network and hands-on learning approach have helped me gain valuable experience beyond textbooks.",
    image: "/kabeer.png",
    linkedin: "https://www.linkedin.com/in/kabeerahmed",
  },
  {
    id: 3,
    name: "Sai Kiran",
    text: "The Training & Placement Club gave me a clear roadmap for my career. Mock interviews, resume-building, and mentorship helped me secure an internship. It’s more than a club—it’s a support system that prepares students for placements, higher education, and industry success.",
    image: "/sai.png",
    linkedin: "https://www.linkedin.com/in/saikiran",
  },
  {
    id: 4,
    name: "Prof. Vishnu Vardhan Reddy",
    text: "This platform has streamlined event management for clubs at GPREC. AI integration and real-time updates make event tracking seamless. The dedication of students in building this innovative project showcases their technical skills and passion for problem-solving.",
    image: "/vishnu.png",
    linkedin: "https://www.linkedin.com/in/vishnuvardhanreddy",
  }
];


const LinkedInSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
  </svg>
);

const TestimonialCard = ({ testimonial }) => (
  <div className="testimonial-card card p-4 m-2 text-center">
    <div className="profile-container d-flex flex-column align-items-center">
      <img src={testimonial.image} alt={testimonial.name} className="testimonial-img rounded-circle" />
      <h4 className="testimonial-name">{testimonial.name}</h4>
      <a href={testimonial.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
        <LinkedInSVG />
      </a>
    </div>
    <p className="testimonial-text h-100 d-flex align-content-center justify-content-center">{testimonial.text}</p>
  </div>
);

const Testimonials = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollStep = 1;
    const interval = setInterval(() => {
      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollStep;
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials">
      <h2 className="fs-xxl bg-light m-0 text-center bg-transparent fw-bold py-3 pb-5">Testimonials</h2>
      <div className="testimonials-container" ref={scrollRef}>
        <div className="testimonial-track d-flex flex-nowrap">
          {[...testimonialsData, ...testimonialsData].map(
            (testimonial, index) => (
              <div key={index} className="testimonial-child">
                <TestimonialCard testimonial={testimonial} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

import PropTypes from "prop-types";

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
  }).isRequired,
};

export default Testimonials;

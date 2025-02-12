import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure this file exists for styling

const UpcomingEventCard = ({ eventId, title, date, description, image, isPastEvent }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4" onClick={handleCardClick}>
      <div className={`card event-card shadow-lg h-100 ${isPastEvent ? "past-event" : ""}`}>
        <div className="card-img-container">
          <img
            src={image}
            className="card-img-top"
            alt={title}
            style={{ objectFit: "cover", height: "200px" }}
          />
          {!isPastEvent && <div className="card-img-overlay"></div>}
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="text-muted mb-2">
            <i className="bi bi-calendar-event"></i>
            {date}
          </p>
          <p className="card-text">{description}</p>
          <button className={`btn btn-outline-info mt-3`}>
            {"View Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

UpcomingEventCard.propTypes = {
  eventId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isPastEvent: PropTypes.bool, // Add this prop to differentiate past events
};

UpcomingEventCard.defaultProps = {
  isPastEvent: false, // Default to false (upcoming event)
};

export default UpcomingEventCard;
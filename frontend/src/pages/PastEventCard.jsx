import { useNavigate } from "react-router-dom";

const PastEventCard = ({ eventId, title, date, description, image }) => {
  const navigate = useNavigate();

  // Handle the click event
  const handleCardClick = () => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="col-md-4" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="card mb-4 shadow-sm">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <small className="text-muted">{new Date(date).toLocaleDateString()}</small>
        </div>
      </div>
    </div>
  );
};
import PropTypes from "prop-types";

PastEventCard.propTypes = {
    eventId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};
export default PastEventCard;

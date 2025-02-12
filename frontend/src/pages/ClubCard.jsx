import PropTypes from "prop-types";
import "../App.css"; // Import custom CSS for animations

const ClubCard = ({ name, description, image }) => {
  return (
    <div className="club-card-container p-2">
      <div className="club-card">
        {/* Image with Overlay Effect */}
        <div className="club-card-image">
          <img src={image} alt={name} className="club-card-img" />
          <div className="overlay"></div>
        </div>

        {/* Card Body with Content */}
        <div className="club-card-body">
          <h3 className="club-title">{name}</h3>
          <p className="club-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

ClubCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ClubCard;
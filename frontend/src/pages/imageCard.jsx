import PropTypes from "prop-types";

const ImageCard = ({ image }) => {
  return (
    <img
      src={image}
      className="card-img-top rounded-5"
      style={{ height: "200px", width: "200px" }}
      alt={image}
    />
  );
};
ImageCard.propTypes = {
  image: PropTypes.string.isRequired,
};
export default ImageCard;

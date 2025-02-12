import { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Gallery.css"; // Custom CSS for animations & modal

const Gallery = ({ club }) => {
  const [selectedImage, setSelectedImage] = useState(null); // Track clicked image
  if (!club || !club.images || club.images.length === 0) {
    return <p className="text-center text-muted">No images available.</p>;
  }

  return (
    <section className="gallery-section py-5">
      <div className="container">
        <div className="row g-3">
          {club.images.map((image, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="gallery-item">
                <img
                  src={image}
                  alt={`Gallery ${index}`}
                  className="img-fluid gallery-img"
                  onClick={() => setSelectedImage(image)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div className="modal fade show d-block" tabIndex="-1" onClick={() => setSelectedImage(null)}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <img src={selectedImage} alt="Enlarged View" className="img-fluid rounded" />
              </div>
              <button className="btn-close position-absolute top-0 end-0 m-3" onClick={() => setSelectedImage(null)}></button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

Gallery.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Gallery;

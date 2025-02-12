import { useState } from "react";
import PropTypes from "prop-types";

const UploadImages = ({ clubId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]); // Stores only newly uploaded images

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/clubs/${clubId}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setImageUrls(result.uploadedImages); // Store only newly uploaded images
        alert("Upload successful!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <div className="col-md-6">
        <div className="card p-4 shadow-lg">
          <h3 className="text-center text-info">Upload Images</h3>
          <div className="mb-3">
            <label className="form-label">Select Images</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <button className="btn btn-success w-100" onClick={handleUpload}>
            Upload Images
          </button>
          {imageUrls.length > 0 && (
            <div className="text-center mt-3">
              <h5>Recently Uploaded Images:</h5>
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Uploaded ${index}`} className="img-fluid m-2" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
UploadImages.propTypes = {
  clubId: PropTypes.string.isRequired,
};
export default UploadImages;

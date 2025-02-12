import PropTypes from "prop-types";

const UserClubForm = ({ clubInfo, handleChange, handleSubmit, clubId }) => {
  return (
    <div className="row text-start">
      <div className="col-md-6">
        {clubInfo ? (
          <div className="card p-4 shadow-lg">
            <h3 className="text-center text-secondary">Club Details</h3>
            <p>
              <strong>Club Name:</strong> {clubInfo.name}
            </p>
            <p>
              <strong>Description:</strong> {clubInfo.description}
            </p>
            <p>
              <strong>Themes:</strong> {clubInfo.themes.join(", ")}
            </p>
            <p>
              <strong>Events & Activities:</strong>
            </p>
            <ul>
              {clubInfo.eventsActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
            <p>
              <strong>Membership Details:</strong> {clubInfo.membershipDetails}
            </p>
            <p>
              <strong>Leadership Contact:</strong> {clubInfo.leadershipContact}
            </p>
          </div>
        ) : (
          <p>Loading club details...</p>
        )}
      </div>
      <div className="col-md-6">
        <div className="card p-4 shadow-lg">
          <h3 className="text-center text-success">Update Profile</h3>
          <form onSubmit={handleSubmit}>
            {/* Club ID is passed via props and not shown in the form */}
            <input type="hidden" name="clubId" value={clubId} />

            <div className="mb-3">
              <label className="form-label">Club Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                defaultValue={clubInfo?.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                defaultValue={clubInfo?.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Themes</label>
              <input
                type="text"
                className="form-control"
                name="themes"
                defaultValue={clubInfo?.themes.join(", ")}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const updatedValue = value.split(",").map((item) => item.trim());
                  handleChange({ target: { name, value: updatedValue } });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Events & Activities</label>
              <input
                type="text"
                className="form-control"
                name="eventsActivities"
                defaultValue={clubInfo?.eventsActivities.join(", ")}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const updatedValue = value.split(",").map((item) => item.trim());
                  handleChange({ target: { name, value: updatedValue } });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Membership Details</label>
              <textarea
                className="form-control"
                name="membershipDetails"
                defaultValue={clubInfo?.membershipDetails}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Leadership Contact</label>
              <input
                type="text"
                className="form-control"
                name="leadershipContact"
                defaultValue={clubInfo?.leadershipContact}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

UserClubForm.propTypes = {
  clubInfo: PropTypes.shape({
    clubId: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    themes: PropTypes.arrayOf(PropTypes.string),
    eventsActivities: PropTypes.arrayOf(PropTypes.string),
    membershipDetails: PropTypes.string,
    leadershipContact: PropTypes.string,
  }),
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  clubId: PropTypes.string.isRequired, // Now clubId is passed as a prop
};

export default UserClubForm;

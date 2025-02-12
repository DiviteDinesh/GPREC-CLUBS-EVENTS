import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <section className="d-flex align-items-center justify-content-center text-center position-relative m-0 p-0">
      <div
        id="home"
        className="d-flex align-items-center justify-content-center text-center bg-light position-relative m-0 p-0 container-fluid"
        style={{
          minHeight: "90vh", // Full viewport height
        }}
      >
        <div className="container d-flex justify-content-center align-content-center">
          <div className="row align-items-center justify-content-center w-100">
            {/* Right Section: Heading and Content */}
            <div className="col-12 col-md-8 col-lg-6 text-md-start text-center">
              <h2 className="fw-bold text-black">
                Welcome to Our College!
              </h2>
              <p className="text-gray mt-4 fs-6 fs-md-5 fw-medium">
                We are a vibrant community of students, faculty, and staff from diverse
                backgrounds and cultures. We are committed to fostering a welcoming
                environment for all. <hr /> 
                Explore the vibrant clubs and engaging forms to foster creativity,
                collaboration, and community. Join us in making your college
                journey meaningful and exciting.
              </p>
              <div className="mt-4 p-3 rounded-2">
                
              </div>
              <h3 className="text-success mt-4">
                Unleash Your Potential, Together We Achieve!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

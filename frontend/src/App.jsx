import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import EventInfo from "./pages/EventInfo";
import Footer from "./components/Footer";
import Testimonials from "./pages/Testimonials";
import ClubDetail from "./pages/ClubDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserAction from "./pages/UserAction";
import AdminPanel from "./pages/AdminPanel";
import CollegeBot from "./pages/CollegeBot";
import EventList from "./pages/EventList";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main style={{background:" linear-gradient(20deg,#49cffc1f, #eae2b7)"}}>
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<><Home /><Clubs /><Events /><Testimonials /></>} />

            {/* Dynamic Routes for Club and Event Details */}
            <Route path="/clubs/:id" element={<><ClubDetail /></>} />
            <Route path="/event/:id" element={<EventInfo />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/user-action" element={<UserAction />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/events-all" element={<EventList />} />
          </Routes >
        </main>
        <CollegeBot/>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

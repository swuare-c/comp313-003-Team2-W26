import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Footer from "../components/Footer";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Determine greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const logoutAndRedirect = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="bg-body-tertiary min-vh-100 min-vw-100 d-flex flex-column text-body">
      {/* NAVBAR */}
      <Navbar bg="body" className="shadow-sm py-2">
        <Container>
          <Navbar.Brand 
            className="fw-semibold text-primary fs-4" 
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/app")}
          >
            Listening Companion
          </Navbar.Brand>

          <Nav className="ms-auto align-items-center">
            <NavDropdown
              title={
                <span className="text-secondary small">
                  {user?.displayName || user?.email || "Account"}
                </span>
              }
              id="profile-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={() => navigate("/settings")}>
                <i className="bi bi-person-circle me-2"></i>Settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/history")}>
                <i className="bi bi-clock-history me-2"></i>History
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/tutorial")}>
                <i className="bi bi-info-circle me-2"></i>Tutorial
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/resources")}>
                <i className="bi bi-heart-pulse me-2"></i>Support Resources
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutAndRedirect} className="text-danger">
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* PAGE CONTENT */}
      <div className="flex-grow-1 d-flex align-items-center py-5">
        <Container style={{ maxWidth: "900px" }}>
          <div className="text-center mb-5">
            <h1 className="fw-bold display-5 mb-2">
              {greeting}, {user?.displayName || "friend"}.
            </h1>
            <p className="text-secondary fs-5">
              This is your quiet space. Whenever you're ready, I'm here to listen.
            </p>
          </div>

          <Row className="g-4">
            {/* MAIN ACTION: START CHAT */}
            <Col md={12}>
              <Card 
                className="border-0 shadow-sm p-4 text-center bg-primary text-white" 
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => navigate("/chat")}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Card.Body>
                  <div className="display-4 mb-3">
                    <i className="bi bi-chat-heart"></i>
                  </div>
                  <h2 className="fw-bold">Share what’s on your mind</h2>
                  <p className="opacity-75 mb-4 px-lg-5">
                    Describe how you're feeling or what you're thinking about lately. 
                    The companion will gently reflect your thoughts back to support your clarity.
                  </p>
                  <Button variant="light" size="lg" className="px-5 fw-semibold text-primary">
                    Start Reflecting
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* SECONDARY ACTIONS */}
            <Col md={6}>
              <Card
                className="border-0 shadow-sm h-100 py-3 bg-body"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/history")}
              >
                <Card.Body className="d-flex align-items-center">
                  <div className="bg-primary-subtle text-primary rounded-circle p-3 me-3">
                    <i className="bi bi-journal-text fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-body">Chat History</h5>
                    <p className="text-secondary small mb-0">Review your past insights and growth.</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card
                className="border-0 shadow-sm h-100 py-3 bg-body"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/settings")}
              >
                <Card.Body className="d-flex align-items-center">
                  <div className="bg-secondary-subtle text-secondary rounded-circle p-3 me-3">
                    <i className="bi bi-sliders fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-body">Settings</h5>
                    <p className="text-secondary small mb-0">Personalize your experience and theme.</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="text-center mt-5">
            <p className="text-secondary fst-italic small">
              "Putting your feelings into words helps you understand yourself better."
            </p>
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
}

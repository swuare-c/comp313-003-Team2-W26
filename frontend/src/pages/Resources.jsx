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

export default function Resources() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

          <Nav className="ms-auto align-items-center gap-2">
            <NavDropdown 
              title={
                <span className="text-secondary small">
                  {user?.displayName || user?.email || "Account"}
                </span>
              } 
              id="profile-dropdown" 
              align="end"
            >
              <NavDropdown.Item onClick={() => navigate("/app")}>
                <i className="bi bi-house me-2"></i>Home
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/chat")}>
                <i className="bi bi-chat-dots me-2"></i>Chat
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/history")}>
                <i className="bi bi-clock-history me-2"></i>History
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/settings")}>
                <i className="bi bi-person-circle me-2"></i>Settings
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
      <div className="flex-grow-1 py-5">
        <Container style={{ maxWidth: "1000px" }}>
          <div className="text-center mb-5">
            <h1 className="fw-bold display-5 mb-2">Support Resources</h1>
            <p className="text-secondary fs-5">
              The companion is here to listen, but some things require a professional's touch.
            </p>
          </div>

          <Row className="g-4">
            {/* IMMEDIATE HELP */}
            <Col md={12}>
              <Card className="border-0 shadow-sm border-start border-danger border-4 bg-body">
                <Card.Body className="p-4 p-md-5">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-danger-subtle text-danger rounded-circle p-3 me-3">
                      <i className="bi bi-exclamation-triangle-fill fs-3"></i>
                    </div>
                    <div>
                      <h3 className="fw-bold mb-0">Immediate Support</h3>
                      <p className="text-danger small mb-0 fw-semibold">Available 24/7 • Confidential • Free</p>
                    </div>
                  </div>
                  <p className="mb-4">If you are in immediate danger or facing a crisis, please reach out to these emergency services right away.</p>
                  
                  <Row className="g-3">
                    <Col sm={6}>
                      <Card className="bg-body-tertiary border-0 h-100">
                        <Card.Body>
                          <h6 className="fw-bold">988 Suicide & Crisis Lifeline</h6>
                          <p className="small text-secondary">Call or text <strong>988</strong> (US & Canada)</p>
                          <a href="https://988lifeline.org" target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-danger">Visit Website</a>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col sm={6}>
                      <Card className="bg-body-tertiary border-0 h-100">
                        <Card.Body>
                          <h6 className="fw-bold">Crisis Text Line</h6>
                          <p className="small text-secondary">Text <strong>HOME</strong> to <strong>741741</strong></p>
                          <a href="https://www.crisistextline.org" target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-danger">Visit Website</a>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* PROFESSIONAL HELP */}
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100 bg-body">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary-subtle text-primary rounded-circle p-2 me-3">
                      <i className="bi bi-people-fill fs-4"></i>
                    </div>
                    <h5 className="fw-bold mb-0">Finding Professional Help</h5>
                  </div>
                  <p className="text-secondary small mb-4">Connecting with a licensed therapist can provide long-term tools for mental health.</p>
                  
                  <ul className="list-unstyled small mb-0">
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check2-circle text-primary me-2 mt-1"></i>
                      <div>
                        <strong>Psychology Today</strong><br/>
                        <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noreferrer" className="text-decoration-none">Find a therapist directory →</a>
                      </div>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check2-circle text-primary me-2 mt-1"></i>
                      <div>
                        <strong>BetterHelp / Talkspace</strong><br/>
                        Popular online therapy platforms for flexible support.
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* EDUCATIONAL RESOURCES */}
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100 bg-body">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success-subtle text-success rounded-circle p-2 me-3">
                      <i className="bi bi-book-half fs-4"></i>
                    </div>
                    <h5 className="fw-bold mb-0">Educational Resources</h5>
                  </div>
                  <p className="text-secondary small mb-4">Reliable organizations with information on various mental health topics.</p>
                  
                  <ul className="list-unstyled small mb-0">
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check2-circle text-success me-2 mt-1"></i>
                      <div>
                        <strong>NAMI</strong><br/>
                        National Alliance on Mental Illness resources and education.
                      </div>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <i className="bi bi-check2-circle text-success me-2 mt-1"></i>
                      <div>
                        <strong>Mind.org.uk</strong><br/>
                        Excellent guides on understanding mental health symptoms.
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </div>
  );
}

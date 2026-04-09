import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Footer from "../components/Footer";

export default function Tutorial() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user?.userId;

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
            onClick={() => navigate(isLoggedIn ? "/app" : "/")}
          >
            Listening Companion
          </Navbar.Brand>

          <Nav className="ms-auto align-items-center gap-2">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/register")}
                >
                  Signup
                </Button>
              </>
            ) : (
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
                <NavDropdown.Item onClick={() => navigate("/settings")}>
                  <i className="bi bi-person-circle me-2"></i>Settings
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/chat")}>
                  <i className="bi bi-chat-dots me-2"></i>Chat
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/resources")}>
                  <i className="bi bi-heart-pulse me-2"></i>Support Resources
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutAndRedirect} className="text-danger">
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* MAIN SECTION */}
      <div className="flex-grow-1 d-flex align-items-start justify-content-center py-4 py-md-5">
        <Container style={{ maxWidth: "960px" }}>
          <Row className="justify-content-center">
            <Col>
              <Card className="border-0 shadow-sm bg-body">
                <Card.Body className="px-4 px-md-5 pt-4 pb-5">
                  {/* Page header */}
                  <div className="text-center mb-4">
                    <h2 className="fw-bold">How to Use the Listening Companion</h2>
                    <p className="text-secondary mb-0">
                      This short tutorial shows you what to expect when you chat
                      with the companion.
                    </p>
                  </div>

                  {/* Content cards */}
                  <Row className="g-4">
                    {/* How it works */}
                    <Col md={7}>
                      <Card className="border-0 shadow-sm h-100 bg-body-tertiary">
                        <Card.Body>
                          <h5 className="fw-semibold mb-3">
                            How the companion works
                          </h5>

                          <div className="mb-3">
                            <h6 className="fw-semibold mb-1 text-body">
                              <span className="me-2">💬</span>Share what’s on your mind
                            </h6>
                            <p className="text-secondary mb-0">
                              Type a few sentences about how you’re feeling, what
                              happened today, or what’s been on your mind lately.
                              There are no “right” words—just be honest.
                            </p>
                          </div>

                          <div className="border-top border-secondary-subtle pt-3 mt-3 mb-3">
                            <h6 className="fw-semibold mb-1 text-body">
                              <span className="me-2">🔁</span>Read the reflection
                            </h6>
                            <p className="text-secondary mb-0">
                              The companion will gently paraphrase what you wrote so
                              you can see your thoughts from a slightly different
                              angle.
                            </p>
                          </div>

                          <div className="border-top border-secondary-subtle pt-3 mt-3 mb-3">
                            <h6 className="fw-semibold mb-1 text-body">
                              <span className="me-2">❓</span>Notice the follow-up question
                            </h6>
                            <p className="text-secondary mb-0">
                              Sometimes the companion will ask a short, neutral
                              question. It’s meant to help you reflect—not to judge,
                              give orders, or tell you what you “should” do.
                            </p>
                          </div>

                          <div className="border-top border-secondary-subtle pt-3 mt-3">
                            <h6 className="fw-semibold mb-1 text-body">
                              <span className="me-2">✍️</span>Continue at your own pace
                            </h6>
                            <p className="text-secondary mb-0">
                              You can answer the question, change the topic, or
                              start a new thought. You’re free to write as much or
                              as little as you like.
                            </p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>

                    {/* What it is / isn’t */}
                    <Col md={5}>
                      <Card className="border-0 shadow-sm h-100 bg-body-tertiary">
                        <Card.Body>
                          <h5 className="fw-semibold mb-3">What to keep in mind</h5>

                          <div className="mb-3">
                            <h6 className="fw-semibold mb-1 text-body"><span className="me-2">🎯</span>What it’s for</h6>
                            <p className="text-secondary mb-0">
                              The companion is designed to listen, reflect your
                              thoughts back to you, and ask gentle questions that
                              support self-reflection and clarity.
                            </p>
                          </div>

                          <div className="border-top border-secondary-subtle pt-3 mt-3">
                            <h6 className="fw-semibold mb-1 text-body"><span className="me-2">⚠️</span>What it’s not</h6>
                            <p className="text-secondary mb-0">
                              It is not a therapist or medical professional. It
                              cannot give medical advice, make diagnoses, or handle
                              emergencies. If you’re facing a crisis, please reach
                              out to local emergency services or a trusted adult
                              right away.
                            </p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {/* Call to action – different for guest vs logged-in */}
                  {!isLoggedIn ? (
                    <Card className="mt-4 border-0 shadow-sm bg-body-tertiary">
                      <Card.Body className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                        <div className="text-secondary">
                          <strong>Ready to meet your Listening Companion?</strong>
                        </div>

                        <div className="d-flex gap-3 flex-column flex-md-row">
                          <Button
                            variant="primary"
                            className="d-flex flex-column px-4 py-2"
                            onClick={() => navigate("/register")}
                          >
                            <span className="fw-semibold">Signup</span>
                            <small className="text-light opacity-75">
                              Start your journey
                            </small>
                          </Button>

                          <Button
                            variant="outline-secondary"
                            className="d-flex flex-column px-4 py-2"
                            onClick={() => navigate("/login")}
                          >
                            <span className="fw-semibold">Login</span>
                            <small className="text-secondary opacity-75">
                              Already a member?
                            </small>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ) : (
                    <Card className="mt-4 border-0 shadow-sm bg-body-tertiary">
                      <Card.Body className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                        <div className="text-secondary">
                          <strong>Ready to put this into practice?</strong>
                          <br />
                          Open the companion and start a new reflection.
                        </div>

                        <div>
                          <Button
                            variant="primary"
                            className="px-4 py-2"
                            onClick={() => navigate("/app")}
                          >
                            Start Chatting
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>

      {isLoggedIn && <Footer />}
    </div>
  );
}
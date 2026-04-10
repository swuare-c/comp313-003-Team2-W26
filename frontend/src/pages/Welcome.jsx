import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

import heroImg from "../assets/hero.jpg";

export default function Welcome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/app");
  }, [user, navigate]);

  return (
    <div className="bg-body min-vh-100 d-flex flex-column text-body">
      {/* NAVBAR */}
      <Navbar bg="body" className="shadow-sm py-2">
        <Container>
          <Navbar.Brand 
            className="fw-semibold text-primary fs-4" 
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Listening Companion
          </Navbar.Brand>

          <div className="ms-auto d-flex gap-2">
            <Link to="/login">
              <Button variant="outline-primary" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Signup
              </Button>
            </Link>
          </div>
        </Container>
      </Navbar>

      {/* HERO SECTION */}
      <div className="flex-grow-1 d-flex align-items-center bg-body-tertiary">
        <Container fluid className="py-5">
          <Row className="justify-content-center">
            <Col xl={10} lg={11}>
              <Row className="align-items-center g-5">
                {/* LEFT SIDE */}
                <Col lg={6} className="text-center text-lg-start">
                  <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill">
                    ChatGPT-Powered Listening Companion
                  </span>

                  <h1 className="fw-bold mb-3 display-4">
                    A calm space to put your thoughts into words.
                  </h1>

                  <p className="text-secondary fs-5 mb-4">
                    Share what’s on your mind, and the companion will gently
                    reflect it back with neutral, thoughtful questions—helping
                    you feel heard and understood.
                  </p>

                  <div className="d-flex flex-wrap gap-3 mt-2 justify-content-center justify-content-lg-start">
                    <Link to="/tutorial">
                      <Button size="lg" variant="primary" className="px-4 py-2 fw-semibold">
                        Get Started
                      </Button>
                    </Link>
                  </div>

                  <p className="text-secondary small mt-3 mb-0">
                    Begin with a short tutorial, then create an account when you're ready.
                  </p>
                </Col>

                {/* RIGHT SIDE */}
                <Col
                  lg={6}
                  className="d-flex justify-content-center justify-content-lg-end"
                >
                  <Card className="shadow-sm border-0 rounded-4 overflow-hidden w-100 bg-body">
                    <div className="bg-white">
                      <Image
                        src={heroImg}
                        alt="Calm beach scenery"
                        className="w-100"
                        style={{
                          maxHeight: 360,
                          objectFit: "cover",
                          opacity: 0.9
                        }}
                      />
                    </div>

                    <Card.Body className="p-4">
                      <Card.Title className="fw-bold">
                        What does the companion do?
                      </Card.Title>
                      <Card.Text className="text-secondary">
                        It paraphrases, reflects, and asks gentle questions—
                        never judging or diagnosing—so you can explore your
                        thoughts with more clarity and calm.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* FOOTER */}
      <footer className="bg-body border-top py-3 small text-secondary">
        <Container className="d-flex justify-content-between">
          <div>© {new Date().getFullYear()} Listening Companion</div>
          <div>Not a medical or crisis service.</div>
        </Container>
      </footer>
    </div>
  );
}
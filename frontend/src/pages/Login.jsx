import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, authError } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/app");
    } catch {
      // error message comes from authError in context
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 min-vw-100 d-flex flex-column text-body">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <Container style={{ maxWidth: "480px" }}>
          <Row className="justify-content-center">
            <Col>
              <Card className="border-0 shadow-sm bg-body">
                <Card.Body className="p-4 p-md-5">
                  <h3 className="fw-bold mb-2">Welcome back</h3>
                  <p className="text-secondary mb-4">
                    Log in to continue your conversations with your Listening
                    Companion.
                  </p>

                  {authError && (
                    <Alert variant="danger" className="mb-3">
                      {authError}
                    </Alert>
                  )}

                  <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="loginEmail">
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="bg-body border-secondary-subtle"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="loginPassword">
                      <Form.Label className="small fw-semibold text-uppercase text-secondary">Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          minLength={6}
                          required
                          className="bg-body border-secondary-subtle"
                        />
                        <Button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          variant="outline-secondary"
                          className="border-start-0 d-flex align-items-center bg-body"
                        >
                          <i
                            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"
                              }`}
                          />
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 py-2 fw-semibold"
                    >
                      Login
                    </Button>
                  </Form>

                  <p className="text-muted small mt-3 mb-0">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/register"
                      className="text-decoration-none fw-semibold"
                    >
                      Signup
                    </Link>
                  </p>
                  <p className="text-muted small mb-0">
                    Forgot password?{" "}
                    <Link
                      to="/reset-password-request"
                      className="text-decoration-none fw-semibold"
                    >
                      Reset password
                    </Link>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
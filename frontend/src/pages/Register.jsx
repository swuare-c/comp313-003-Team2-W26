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

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setStatus(null);

    // Client-side check for matching passwords
    if (password !== confirmPassword) {
      setMsg("Passwords do not match.");
      setStatus("error");
      return;
    }

    try {
      await register(email, password);
      setMsg("Registered! Please login.");
      setStatus("success");
      setTimeout(() => navigate("/login"), 600);
    } catch (e2) {
      setMsg(e2?.response?.data?.message || "Register failed");
      setStatus("error");
    }
  };

  return (
    <div className="bg-light min-vh-100 min-vw-100 d-flex flex-column">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <Container style={{ maxWidth: "480px" }}>
          <Row className="justify-content-center">
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4 p-md-5">
                  <h3 className="fw-bold mb-2">Create your account</h3>
                  <p className="text-muted mb-4">
                    Start your journey with your Listening Companion. You can
                    always log in later to continue your conversations.
                  </p>

                  {msg && (
                    <Alert
                      variant={status === "success" ? "success" : "danger"}
                      className="mb-3"
                    >
                      {msg}
                    </Alert>
                  )}

                  <Form onSubmit={onSubmit}>
                    {/* Email */}
                    <Form.Group className="mb-3" controlId="registerEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                      />
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-3" controlId="registerPassword">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          minLength={6}
                          required
                        />
                        <Button
                          type="button"
                          onClick={() =>
                            setShowPassword((prev) => !prev)
                          }
                          className="border-start-0 d-flex align-items-center"
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#ced4da",
                            color: "#6c757d",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                        >
                          <i
                            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"
                              }`}
                          />
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    {/* Confirm Password */}
                    <Form.Group
                      className="mb-4"
                      controlId="registerConfirmPassword"
                    >
                      <Form.Label>Confirm password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showConfirm ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(e.target.value)
                          }
                          placeholder="Re-enter your password"
                          minLength={6}
                          required
                        />
                        <Button
                          type="button"
                          onClick={() =>
                            setShowConfirm((prev) => !prev)
                          }
                          className="border-start-0 d-flex align-items-center"
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#ced4da",
                            color: "#6c757d",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                        >
                          <i
                            className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"
                              }`}
                          />
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <Button type="submit" variant="primary" className="w-100">
                      Signup
                    </Button>
                  </Form>

                  <p className="text-muted small mt-3 mb-0">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-decoration-none fw-semibold"
                    >
                      Login
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

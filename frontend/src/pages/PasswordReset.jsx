import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";

export default function PasswordReset() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialEmail = searchParams.get("email") || "";
  const resetToken = searchParams.get("token") || "";

  const [email] = useState(initialEmail); // read-only
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!resetToken) {
      setError("Reset token is missing or invalid. Please request a new link.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/api/auth/reset-password", {
        email,
        token: resetToken,
        newPassword,
      });
      setMessage(res.data.message || "Password reset successful.");

      // redirect to login after a short delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed.");
    } finally {
      setLoading(false);
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
                  <h3 className="fw-bold mb-2">Reset your password</h3>
                  <p className="text-muted mb-4">
                    For your security, this link only works for a limited time.
                    After you set a new password, you can log back in to your
                    Listening Companion account.
                  </p>

                  {message && (
                    <Alert variant="success" className="mb-3">
                      {message}
                    </Alert>
                  )}
                  {error && (
                    <Alert variant="danger" className="mb-3">
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="resetEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={email} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="resetNewPassword">
                      <Form.Label>New password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showNew ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          minLength={6}
                          required
                        />
                        <Button
                          type="button"
                          onClick={() => setShowNew((prev) => !prev)}
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
                            className={`bi ${
                              showNew ? "bi-eye-slash" : "bi-eye"
                            }`}
                          />
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group
                      className="mb-4"
                      controlId="resetConfirmPassword"
                    >
                      <Form.Label>Confirm new password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showConfirm ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(e.target.value)
                          }
                          placeholder="At least 6 characters"
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
                            className={`bi ${
                              showConfirm ? "bi-eye-slash" : "bi-eye"
                            }`}
                          />
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100"
                      disabled={loading}
                    >
                      {loading ? "Resetting..." : "Reset password"}
                    </Button>
                  </Form>

                  <p className="text-muted small mt-3 mb-0 text-center">
                    Changed your mind?{" "}
                    <Link
                      to="/login"
                      className="text-decoration-none fw-semibold"
                    >
                      Back to login
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
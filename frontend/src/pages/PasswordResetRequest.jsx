import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/request-password-reset", { email });
      const { resetToken, message } = res.data;

      if (resetToken) {
        navigate(
          `/reset-password?token=${encodeURIComponent(
            resetToken
          )}&email=${encodeURIComponent(email)}`
        );
      } else {
        setSuccess(message || "If an account exists, a reset link has been generated.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
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
                    Enter the email you used to create your Listening Companion
                    account. If we find a match, we&apos;ll take you to the page
                    where you can set a new password.
                  </p>

                  {error && (
                    <Alert variant="danger" className="mb-3">
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="resetRequestEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100"
                      disabled={loading}
                    >
                      {loading ? "Sending…" : "Continue"}
                    </Button>
                  </Form>

                  <p className="text-muted small mt-3 mb-0 text-center">
                    Remembered your password?{" "}
                    <Link
                      to="/login"
                      className="text-decoration-none fw-semibold"
                    >
                      Log in again
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
import React, { useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const emailRef = useRef("");
  let errorElement;
  const navigate = useNavigate();
  const location = useLocation();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  if (loading) {
    return <Loading></Loading>;
  }

  let from = location.state?.from?.pathname || "/";

  if (user) {
    navigate(from, { replace: true });
  }

  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }

  const navigateRegister = () => {
    navigate("/register");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(email, password);
    console.log(email, password);
  };

  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Sent email");
    } else {
      toast("Please enter your email address");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs="12" lg="5" className="mt-3 mx-auto bg-light rounded-top px-5">
          <h2 className="text-center my-3">Please Login</h2>
          <Form onSubmit={handleLogin} className="mb-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                name="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Button
              style={{ backgroundColor: "black" }}
              type="submit"
              className="w-100"
            >
              Login
            </Button>
          </Form>
          {errorElement}
          <p>
            New to To Do?{" "}
            <Link
              to="/register"
              className="text-primary text-decoration-none"
              onClick={navigateRegister}
            >
              Please Register
            </Link>
          </p>
          <p>
            Forget Password?{" "}
            <span
              style={{ cursor: "pointer" }}
              className="text-primary"
              onClick={resetPassword}
            >
              Reset Password
            </span>
          </p>
        </Col>
        <SocialLogin></SocialLogin>
      </Row>
    </Container>
  );
};

export default Login;

import { async } from "@firebase/util";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const [agree, setAgree] = useState(false);
  let errorElement;
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  if (error || updateError) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  if (user) {
    navigate(from, { replace: true });
    console.log(user);
  }

  if (loading || updating) {
    return <Loading></Loading>;
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    alert("Updated profile");
    console.log("Update profile");
    navigate("/home");
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          xs="10"
          lg="5"
          className="mt-3 mx-auto bg-light rounded-top px-5 pt-4"
        >
          <h2 className="text-center my-3">Please Register</h2>
          <Form onSubmit={handleRegister} className="mb-3">
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                onClick={() => setAgree(!agree)}
                name="terms"
                id="terms"
                label="Accept To Do App Terms and Conditions"
                className={`${agree ? "" : "text-danger"}`}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "black" }}
              type="submit"
              disabled={!agree}
              className="w-100"
            >
              Register
            </Button>
          </Form>
          {errorElement}
          <p>
            Already have an account?
            <Link
              to="/login"
              className="text-primary pe-auto text-decoration-none ms-1 text-primary"
              onClick={navigateLogin}
            >
              Please Login
            </Link>
          </p>
        </Col>
      </Row>
      <SocialLogin></SocialLogin>
    </Container>
  );
};

export default Register;

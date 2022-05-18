import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const SocialLogin = () => {
  const location = useLocation();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  let errorElement;

  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }

  let from = location.state?.from?.pathname || "/";

  if (user) {
    navigate(from, { replace: true });
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs="12" lg="5" className="mx-auto  bg-light rounded-bottom pb-5">
          <div className="d-flex align-items-center">
            <div style={{ height: "1px" }} className="bg-primary w-50"></div>
            <p className="mt-2 px-2">or</p>
            <div style={{ height: "1px" }} className="bg-primary w-50"></div>
          </div>
          {errorElement}
          <div>
            <Button
              variant="outline-primary"
              onClick={() => signInWithGoogle()}
              className="w-75 d-block mx-auto my-2"
            >
              <img
                style={{ width: "30px" }}
                src="https://i.ibb.co/94RFZvF/google.png"
                alt=""
              />
              <span className="px-2">Google Sign In</span>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SocialLogin;

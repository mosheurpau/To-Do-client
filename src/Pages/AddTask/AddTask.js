import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import "./AddTask.css";
import Loading from "../Shared/Loading/Loading";

const AddTask = () => {
  const [user] = useAuthState(auth);
  console.log(user.email);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (data) => {
    data.email = user.email;
    const url = `https://mosheurpau-to-do-server.onrender.com/task`;
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false);
        navigate("/task");
      });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <Container>
      <Row className="justify-content-md-center my-3">
        <Col
          xs="11"
          lg="6"
          className="mt-3 mx-auto bg-light rounded-top px-5 mb-3 py-5"
        >
          <h2 className="mb-3">
            Add New <span style={{ color: "#EB7700" }}>Task</span>
          </h2>
          <form
            className="d-flex flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="mb-2 item-input"
              placeholder="Task Name"
              type="text"
              {...register("name", { required: true, maxLength: 100 })}
            />
            <textarea
              className="mb-2 item-input"
              placeholder="Description"
              {...register("description")}
            />
            <input className="add-btn" type="submit" value="Add Task" />
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTask;

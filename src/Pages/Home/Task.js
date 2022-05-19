import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import "./Task.css";

const Task = () => {
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      const url = `https://still-taiga-75299.herokuapp.com/task/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const remaining = tasks.filter((task) => task._id !== id);
          setTasks(remaining);
        });
    }
  };

  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch(`https://still-taiga-75299.herokuapp.com/task/${user.email}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [user]);

  const handleCompleted = (_id) => {
    alert("Task Completed");
    // const newTask = { ...tasks };
    // newTask.description = "hello";
    // console.log(newTask);
    // setTasks(newTask);
    // const url = `https://still-taiga-75299.herokuapp.com/task/${_id}`;
    // fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(tasks),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("success", data);
    //     alert("Delivered successfully!!!");
    //   });
  };

  return (
    <Container>
      <div className="w-100 mx-auto mb-5">
        <h2 className="my-5">Manage My Tasks</h2>
        <Table striped bordered responsive hover variant="light">
          <thead>
            <tr>
              <th>#ID</th>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Task Completed</th>
              <th>Task Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>...{task._id.slice(20, 30)}</td>
                <td>{task.name}</td>
                <td> {task.description}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleCompleted(task._id)}
                  >
                    Completed
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task._id)}
                  >
                    <FontAwesomeIcon className="delete-icon" icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Task;

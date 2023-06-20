import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import "./Task.css";
import { toast } from "react-toastify";

const Task = () => {
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      const url = `https://mosheurpau-to-do-server.onrender.com/task/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const remaining = tasks.filter((task) => task._id !== id);
          toast("Task delete Successfully!!!");
          setTasks(remaining);
        });
    }
  };

  useEffect(() => {
    fetch(`https://mosheurpau-to-do-server.onrender.com/task/${user.email}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [user]);

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
              <th>Task Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td> {task.description}</td>
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

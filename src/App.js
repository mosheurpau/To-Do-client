import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddTask from "./Pages/AddTask/AddTask";
import Home from "./Pages/Home/Home";
import Task from "./Pages/Home/Task";
import Login from "./Pages/Login/Login/Login";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import NotFound from "./Pages/Shared/NotFound/NotFound";
import Register from "./Pages/Login/Register/Register";
import RequireAuth from "./Pages/Login/RequireAuth/RequireAuth";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="task"
          element={
            <RequireAuth>
              <Task></Task>
            </RequireAuth>
          }
        ></Route>

        <Route
          path="addTask"
          element={
            <RequireAuth>
              <AddTask></AddTask>
            </RequireAuth>
          }
        ></Route>

        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;

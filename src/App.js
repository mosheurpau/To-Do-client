import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddTask from "./Pages/AddTask/AddTask";
import Home from "./Pages/Home/Home";
import Task from "./Pages/Home/Task";
import Login from "./Pages/Login/Login/Login";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import NotFound from "./Pages/Shared/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="task" element={<Task></Task>}></Route>
        <Route path="addTask" element={<AddTask></AddTask>}></Route>
        <Route path="addTask" element={<AddTask></AddTask>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;

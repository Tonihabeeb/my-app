import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

import CreateTaskForm from "./components/CreateTaskForm";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import TaskList from "./components/TaskList";
import Task from "./components/Tasks";
import WebSearchForm from "./components/WebSearchForm";

import { getTasks, register, login } from "./api/api";

export const AppContext = React.createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRegister = async (username, password) => {
    const user = await register(username, password);
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleLogin = async (username, password) => {
    const user = await login(username, password);
    setUser(user);
    setIsAuthenticated(true);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        tasks,
        setTasks,
        isAuthenticated,
        handleRegister,
        handleLogin,
      }}
    >
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">TaskApp</Navbar.Brand>
          <Nav className="mr-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/create-task">Create Task</Nav.Link>
                <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
                <Nav.Link as={Link} to="/web-search">Web Search</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>
        <Container>
          {isAuthenticated ? (
            <Routes>
              <Route path="/create-task" element={<CreateTaskForm />} />
              <Route path="/tasks" element={<TaskList tasks={tasks} />} />
              <Route path="/task/:id" element={<Task tasks={tasks} />} />
              <Route path="/web-search" element={<WebSearchForm />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </Container>
      </Router>
    </AppContext.Provider>
  );
};

export default App;

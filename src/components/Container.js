import React, { useState, useEffect } from 'react';
import CreateTaskForm from './CreateTaskForm';
import LoginForm from './LoginForm';
import NavBar from './NavBar';
import RegistrationForm from './RegistrationForm';
import Task from './Task';
import TaskList from './TaskList';
import WebSearchForm from './WebSearchForm';

const Container = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Get tasks from the API
    fetch('/api/tasks')
      .then(response => response.json())
      .then(tasks => setTasks(tasks));
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map((task, index) => (
        <div key={index}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </div>
      ))}
      <CreateTaskForm />
      <LoginForm />
      <NavBar />
      <RegistrationForm />
      <Task />
      <TaskList />
      <WebSearchForm />
    </div>
  );
};

export default Container;

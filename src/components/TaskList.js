import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { getTasks } from '../api/api';
import Task from './Tasks';
import { AppContext } from '../App'; // import AppContext


function TaskList() {
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated } = useContext(AppContext); // get isAuthenticated from context

  const tasksRef = useRef(tasks);

  useEffect(() => {
    if(isAuthenticated) { // check if user is authenticated before fetching tasks
      const fetchTasks = async () => {
        try {
          const response = await getTasks();
          tasksRef.current = response;
        } catch (error) {
          console.error(error);
        }
      };
      fetchTasks();
    }
  }, [isAuthenticated]); // re-run this effect whenever isAuthenticated changes

  const handleTaskDelete = useCallback((taskId) => {
    setTasks(tasksRef.current.filter((task) => task._id !== taskId));
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <Task key={task._id} task={task} onTaskDelete={handleTaskDelete} />
      ))}
    </div>
  );
}

export default TaskList;

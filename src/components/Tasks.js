import React, { useState } from "react";
import { updateTask, deleteTask, trainTask } from "../api/api";

function Task({ task, onTaskDelete }) {
  const [status, setStatus] = useState(task.status || "");
  const [description, setDescription] = useState(task.description || "");
  const [keywords, setKeywords] = useState(task.keywords || "");

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      onTaskDelete(task._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrain = async () => {
    try {
      await trainTask(task._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateTask(task._id, { status, description, keywords });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Update status"/>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Update description"/>
      <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Update keywords"/>
      <button onClick={handleUpdate}>Update Task</button>
      <button onClick={handleDelete}>Delete Task</button>
      <button onClick={handleTrain}>Train Task</button>
    </div>
  );
}

export default Task;

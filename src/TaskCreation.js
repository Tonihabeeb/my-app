import React, { useState } from 'react';

const TaskCreation = () => {
  const [taskName, setTaskName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Create task with taskName:', taskName, 'keywords:', keywords, 'and location:', location);
    // TODO: Make an API call to create a new task using the provided details
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskCreation;

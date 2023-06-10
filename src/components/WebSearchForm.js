import React, { useState, useEffect } from 'react';
import { webSearch } from '../api/api'; // Correct import statement

function WebSearchForm() {
  const [taskId, setTaskId] = useState("");
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await webSearch(taskId, keywords, location);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    setTaskId("");
    setKeywords("");
    setLocation("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task ID:
        <input type="text" value={taskId} onChange={(e) => setTaskId(e.target.value)} />
      </label>
      <label>
        Keywords:
        <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
}

export default WebSearchForm;

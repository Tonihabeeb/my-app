import { useState, useEffect, useRef } from 'react';
import { createTask } from '../api/api';

function CreateTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const formRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const taskData = {
      title: title,
      description: description,
    };

    try {
      const response = await createTask(taskData);
      if(response.status === 201) {
        alert('Task created successfully');
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating task');
    }

    formRef.current.reset();
  }

  useEffect(() => {
    // Clear the title and description state variables after a task is created.
    const clearState = () => {
      setTitle('');
      setDescription('');
    };

    // Listen for the submit event on the form element.
    formRef.current.addEventListener('submit', clearState);

    // Remove the listener when the component unmounts.
    return () => formRef.current.removeEventListener('submit', clearState);
  }, []);

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label htmlFor="description">Description</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

      <button type="submit">Create Task</button>
    </form>
  );
}

export default CreateTaskForm;

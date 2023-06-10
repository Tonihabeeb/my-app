import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../App';


function LoginForm() {
  const { handleLogin } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const formRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await handleLogin(username, password);
      alert('Login successful');
      setUsername('');
      setPassword('');
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  }

  useEffect(() => {
    // Clear the username and password state variables after a user successfully logs in.
    const clearState = () => {
      setUsername('');
      setPassword('');
    };

    // Listen for the submit event on the form element.
    formRef.current.addEventListener('submit', clearState);

    // Remove the listener when the component unmounts.
    return () => formRef.current.removeEventListener('submit', clearState);
  }, []);

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginForm;

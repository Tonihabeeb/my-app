import React, { useState, useContext, useRef, useEffect } from 'react';
import ChatInterface from './ChatInterface';
import { AppContext } from '../App';


function RegistrationForm() {
  const { handleRegister } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleRegister(username, password);
      alert('Registration successful');
      setUsername('');
      setPassword('');
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      alert('Error during registration');
    }
  };

  useEffect(() => {
    // Clear the username and password state variables after a user successfully registers.
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
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Register" />
      </form>
      <ChatInterface />
    </div>
  );
}

export default RegistrationForm;

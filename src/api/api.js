import axios from 'axios';

const baseUrl = 'http://localhost:5000/api';
const userUrl = `${baseUrl}/users/`;
const taskUrl = `${baseUrl}/v1/task`;

// Function to get the JWT token from local storage
function getJwtToken() {
  return localStorage.getItem('token');
}

async function register(username, password) {
  try {
    const response = await axios.post(`${userUrl}register`, { username, password });
    return response.data;
  } catch (error) {
    console.error("Error during registration: ", error.response);
    throw error;
  }
}

async function login(username, password) {
  try {
    const response = await axios.post(`${userUrl}login`, { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error during login: ", error.response);
    throw error;
  }
}

async function getTasks() {
    console.log("getTasks called");
    try {
      const response = await axios.get(`${taskUrl}/`, {
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks: ", error.response);
      throw error;
    }
  }
 

async function createTask(taskData) {
  try {
    const response = await axios.post(`${taskUrl}`, taskData, {
      headers: {
        'Authorization': `Bearer ${getJwtToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task: ", error.response);
    throw error;
  }
}

async function trainTask(taskId) {
  try {
    const response = await axios.post(`${taskUrl}${taskId}/train`, {}, {
      headers: {
        'Authorization': `Bearer ${getJwtToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error training task: ", error.response);
    throw error;
  }
}

async function updateTask(taskId, taskData) {
  try {
    const response = await axios.put(`${taskUrl}${taskId}`, taskData, {
      headers: {
        'Authorization': `Bearer ${getJwtToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task: ", error.response);
    throw error;
  }
}

async function deleteTask(taskId) {
  try {
    const response = await axios.delete(`${taskUrl}${taskId}`, {
      headers: {
        'Authorization': `Bearer ${getJwtToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task: ", error.response);
    throw error;
  }
}

async function webSearch(taskId, keywords, location) {
  try {
    const response = await axios.post(`${baseUrl}/websearch/websearch`, { taskId, keywords, location }, {
      headers: {
        'Authorization': `Bearer ${getJwtToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during web search: ", error.response);
    throw error;
  }
}

async function getChatResponse(taskId, message) {
  try {
    const response = await axios.post(`${baseUrl}/ai/chat`, { taskId, message }, {
      headers: {
        'Authorization': `Bearer ${getJwtToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error getting chat response: ", error.response);
    throw error;
  }
}

export { 
  register, 
  login, 
  getTasks, 
  createTask, 
  trainTask, 
  updateTask, 
  deleteTask,
  webSearch,
  getChatResponse   
};

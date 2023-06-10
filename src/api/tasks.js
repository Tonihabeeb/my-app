import api from './index';

export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks'); // Replace '/tasks' with your backend API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
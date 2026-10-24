import axios from 'axios';

// The React app runs on localhost:5173 and the Spring Boot REST API on :2273.
// Configure VITE_API_BASE_URL in .env if your backend uses a different address.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:2007/centers',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});

export const centerApi = {
  getAll: async () => (await api.get('/displayAll')).data,
  getById: async (id) => (await api.get(`/displayBy/${encodeURIComponent(id)}`)).data,
  add: async (center) => (await api.post('/add', center)).data,
  update: async (id, center) => (await api.put(`/update?id=${encodeURIComponent(id)}`, center)).data,
  remove: async (id) => (await api.delete(`/delete/${encodeURIComponent(id)}`)).data
};

export function getErrorMessage(error) {
  if (error.response?.data) {
    const data = error.response.data;
    if (typeof data === 'string') return data;
    if (data.message) return data.message;
    if (data.errors && typeof data.errors === 'object') return Object.values(data.errors).join(', ');
    if (data.detail) return data.detail;
  }
  if (error.code === 'ECONNABORTED') return 'The request timed out. Please try again.';
  if (!error.response) return 'Cannot connect to Spring Boot at http://localhost:2273. Check that the backend is running and that @CrossOrigin allows http://localhost:5173.';
  return error.message || 'Something went wrong. Please try again.';
}

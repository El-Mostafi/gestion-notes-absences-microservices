import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const etudiantApi = {
  getAll: () => api.get('/etudiants'),

  getById: (id) => api.get(`/etudiants/${id}`),

  getTauxAbsence: (id) => api.get(`/etudiants/${id}/taux-absence`),

  create: (etudiant) => api.post('/etudiants', etudiant),

  update: (id, etudiant) => api.put(`/etudiants/${id}`, etudiant),

  delete: (id) => api.delete(`/etudiants/${id}`),

  getBlacklist: (seuil = 20) => api.get('/etudiants/blacklist', { params: { seuil } }),
};

export default api;

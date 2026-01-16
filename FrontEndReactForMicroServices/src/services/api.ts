import axios from 'axios';
import { Student, StudentAbsence, FinalGrade } from '../types';

const BASE_URL = 'http://localhost:8079';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const gradesApi = {
  getAllStudents: () => api.get<Student[]>('/notes/api/notes/etudiants'),
  addStudent: (student: Student) => api.post('/notes/api/notes/etudiant', student),
  getPassingStudents: () => api.get<Student[]>('/notes/api/notes/validant'),
  getTopStudents: () => api.get<Student[]>('/notes/api/notes/majorants'),
  getSortedStudents: () => api.get<Student[]>('/notes/api/notes/tries'),
  getFinalGrade: (id: number) => api.get<FinalGrade>(`/notes/api/notes/etudiant/${id}/note-finale`),
};

export const absencesApi = {
  getAllAbsences: () => api.get<StudentAbsence[]>('/absence/api/absences/etudiants'),
  addAbsence: (absence: StudentAbsence) => api.post('/absence/api/absences/etudiant', absence),
  getBlacklist: (threshold = 0.5) => api.get<StudentAbsence[]>(`/absence/api/absences/liste-noire?seuil=${threshold}`),
  getAbsenceRate: (id: number) => api.get<{ tauxAbsence: number }>(`/absence/api/absences/etudiant/${id}/taux`),
};

export default api;

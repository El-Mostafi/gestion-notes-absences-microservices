import axios from 'axios';

const API_URL = 'http://localhost:8081/api/etudiants';

export interface Etudiant {
  id?: number;
  nom: string;
  prenom: string;
  note1?: number;
  note2?: number;
}

export interface EtudiantResponse extends Etudiant {
  id: number;
}

export const etudiantService = {
  getAll: async (): Promise<EtudiantResponse[]> => {
    const response = await axios.get<EtudiantResponse[]>(API_URL);
    return response.data;
  },

  getById: async (id: number): Promise<EtudiantResponse> => {
    const response = await axios.get<EtudiantResponse>(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (etudiant: Etudiant): Promise<EtudiantResponse> => {
    const response = await axios.post<EtudiantResponse>(API_URL, etudiant);
    return response.data;
  },

  update: async (id: number, etudiant: Etudiant): Promise<EtudiantResponse> => {
    const response = await axios.put<EtudiantResponse>(`${API_URL}/${id}`, etudiant);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  search: async (nom: string): Promise<EtudiantResponse[]> => {
    const response = await axios.get<EtudiantResponse[]>(`${API_URL}/search?nom=${nom}`);
    return response.data;
  }
};

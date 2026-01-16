import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { etudiantService, Etudiant } from '../services/etudiantService';
import { toast } from 'react-toastify';

export const useEtudiants = () => {
  const queryClient = useQueryClient();

  const etudiants = useQuery({
    queryKey: ['etudiants'],
    queryFn: etudiantService.getAll,
  });

  const createEtudiant = useMutation({
    mutationFn: etudiantService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['etudiants'] });
      toast.success('Étudiant ajouté avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'ajout');
    },
  });

  const updateEtudiant = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Etudiant }) =>
      etudiantService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['etudiants'] });
      toast.success('Étudiant modifié avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la modification');
    },
  });

  const deleteEtudiant = useMutation({
    mutationFn: etudiantService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['etudiants'] });
      toast.success('Étudiant supprimé avec succès');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
    },
  });

  return {
    etudiants: etudiants.data || [],
    isLoading: etudiants.isLoading,
    isError: etudiants.isError,
    createEtudiant,
    updateEtudiant,
    deleteEtudiant,
  };
};

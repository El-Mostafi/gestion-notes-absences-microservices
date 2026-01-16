export const validateNote = (value: number | undefined): boolean => {
  if (value === undefined || value === null) return true;
  return value >= 0 && value <= 20;
};

export const validateEtudiantForm = (data: {
  nom: string;
  prenom: string;
  note1?: number;
  note2?: number;
}) => {
  const errors: Record<string, string> = {};

  if (!data.nom || data.nom.trim() === '') {
    errors.nom = 'Le nom est obligatoire';
  }

  if (!data.prenom || data.prenom.trim() === '') {
    errors.prenom = 'Le prénom est obligatoire';
  }

  if (data.note1 !== undefined && !validateNote(data.note1)) {
    errors.note1 = 'La note doit être entre 0 et 20';
  }

  if (data.note2 !== undefined && !validateNote(data.note2)) {
    errors.note2 = 'La note doit être entre 0 et 20';
  }

  return errors;
};

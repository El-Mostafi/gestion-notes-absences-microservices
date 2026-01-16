export const calculateMoyenne = (note1?: number, note2?: number): number | null => {
  if (note1 === undefined && note2 === undefined) return null;
  if (note1 === undefined) return note2 || null;
  if (note2 === undefined) return note1;
  return (note1 + note2) / 2;
};

export const formatNote = (note?: number): string => {
  if (note === undefined || note === null) return '-';
  return note.toFixed(2);
};

export const formatMoyenne = (note1?: number, note2?: number): string => {
  const moyenne = calculateMoyenne(note1, note2);
  if (moyenne === null) return '-';
  return moyenne.toFixed(2);
};

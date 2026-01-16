import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Etudiant, EtudiantResponse } from '../services/etudiantService';
import { validateEtudiantForm } from '../utils/validation';

interface EtudiantFormProps {
  etudiant?: EtudiantResponse | null;
  onSubmit: (data: Etudiant) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function EtudiantForm({ etudiant, onSubmit, onClose, isSubmitting }: EtudiantFormProps) {
  const [formData, setFormData] = useState<Etudiant>({
    nom: '',
    prenom: '',
    note1: undefined,
    note2: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (etudiant) {
      setFormData({
        nom: etudiant.nom,
        prenom: etudiant.prenom,
        note1: etudiant.note1,
        note2: etudiant.note2,
      });
    }
  }, [etudiant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('note') ? (value === '' ? undefined : parseFloat(value)) : value,
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEtudiantForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {etudiant ? 'Modifier l\'étudiant' : 'Ajouter un étudiant'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                errors.nom ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.nom && (
              <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
            )}
          </div>

          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
              Prénom *
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                errors.prenom ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.prenom && (
              <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>
            )}
          </div>

          <div>
            <label htmlFor="note1" className="block text-sm font-medium text-gray-700 mb-1">
              Note 1 (0-20)
            </label>
            <input
              type="number"
              id="note1"
              name="note1"
              value={formData.note1 ?? ''}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="20"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                errors.note1 ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.note1 && (
              <p className="mt-1 text-sm text-red-600">{errors.note1}</p>
            )}
          </div>

          <div>
            <label htmlFor="note2" className="block text-sm font-medium text-gray-700 mb-1">
              Note 2 (0-20)
            </label>
            <input
              type="number"
              id="note2"
              name="note2"
              value={formData.note2 ?? ''}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="20"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                errors.note2 ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.note2 && (
              <p className="mt-1 text-sm text-red-600">{errors.note2}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : etudiant ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

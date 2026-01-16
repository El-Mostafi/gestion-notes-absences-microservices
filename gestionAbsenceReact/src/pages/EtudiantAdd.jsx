import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { etudiantApi } from '../api/etudiantApi';
import { toast } from 'react-toastify';

export default function EtudiantAdd() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    cne: '',
    niveau: 'L1',
    heuresAbsence: 0,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'heuresAbsence' ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }

    if (!formData.cne.trim()) {
      newErrors.cne = 'Le CNE est requis';
    } else if (formData.cne.length < 5) {
      newErrors.cne = 'Le CNE doit contenir au moins 5 caractères';
    }

    if (formData.heuresAbsence < 0) {
      newErrors.heuresAbsence = 'Les heures d\'absence ne peuvent pas être négatives';
    }

    if (formData.heuresAbsence > 500) {
      newErrors.heuresAbsence = 'Les heures d\'absence ne peuvent pas dépasser 500';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      await etudiantApi.create(formData);
      toast.success('Étudiant ajouté avec succès');
      navigate('/etudiants');
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de l\'étudiant');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const tauxAbsence = ((formData.heuresAbsence / 500) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/etudiants')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Ajouter un Étudiant</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.nom ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Entrez le nom"
              />
              {errors.nom && <p className="mt-1 text-sm text-red-500">{errors.nom}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.prenom ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Entrez le prénom"
              />
              {errors.prenom && <p className="mt-1 text-sm text-red-500">{errors.prenom}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CNE <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cne"
                value={formData.cne}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.cne ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Entrez le CNE"
              />
              {errors.cne && <p className="mt-1 text-sm text-red-500">{errors.cne}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau <span className="text-red-500">*</span>
              </label>
              <select
                name="niveau"
                value={formData.niveau}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
                <option value="M1">M1</option>
                <option value="M2">M2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heures d'Absence
              </label>
              <input
                type="number"
                name="heuresAbsence"
                value={formData.heuresAbsence}
                onChange={handleChange}
                min="0"
                max="500"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.heuresAbsence ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.heuresAbsence && <p className="mt-1 text-sm text-red-500">{errors.heuresAbsence}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taux d'Absence (Calculé)
              </label>
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                <span className={`font-semibold ${
                  tauxAbsence >= 20 ? 'text-red-600' : tauxAbsence >= 10 ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {tauxAbsence}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/etudiants')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Ajout en cours...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

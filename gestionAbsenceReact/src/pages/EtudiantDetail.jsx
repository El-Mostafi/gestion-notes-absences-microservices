import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, User, Award, Clock, TrendingUp } from 'lucide-react';
import { etudiantApi } from '../api/etudiantApi';
import Loading from '../components/common/Loading';
import Badge from '../components/common/Badge';
import { toast } from 'react-toastify';

export default function EtudiantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [etudiant, setEtudiant] = useState(null);

  useEffect(() => {
    fetchEtudiant();
  }, [id]);

  const fetchEtudiant = async () => {
    try {
      setLoading(true);
      const { data } = await etudiantApi.getById(id);
      setEtudiant(data);
    } catch (error) {
      toast.error('Erreur lors du chargement de l\'étudiant');
      console.error(error);
      navigate('/etudiants');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${etudiant.nom} ${etudiant.prenom} ?`)) {
      try {
        await etudiantApi.delete(id);
        toast.success('Étudiant supprimé avec succès');
        navigate('/etudiants');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
        console.error(error);
      }
    }
  };

  if (loading) return <Loading />;
  if (!etudiant) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/etudiants')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Détails de l'Étudiant</h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/etudiants/${id}/edit`)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={18} className="mr-2" />
            Modifier
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={18} className="mr-2" />
            Supprimer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{etudiant.nom} {etudiant.prenom}</h2>
              <p className="text-blue-100 mt-1">CNE: {etudiant.cne}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Award className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Niveau</p>
                  <p className="text-xl font-bold text-gray-900">{etudiant.niveau}</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Clock className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Heures d'Absence</p>
                  <p className="text-xl font-bold text-gray-900">{etudiant.heuresAbsence}h</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Taux d'Absence</p>
                  <div className="mt-1">
                    <Badge taux={etudiant.tauxAbsence} />
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${
                  etudiant.tauxAbsence >= 20
                    ? 'bg-red-50'
                    : 'bg-green-50'
                }`}>
                  {etudiant.tauxAbsence >= 20 ? (
                    <span className="text-red-600 font-bold text-2xl">!</span>
                  ) : (
                    <span className="text-green-600 font-bold text-2xl">✓</span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <p className={`text-lg font-bold ${
                    etudiant.tauxAbsence >= 20 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {etudiant.tauxAbsence >= 20 ? 'Liste Noire' : 'En Règle'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Informations Complémentaires</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                <span className="font-medium">Heures restantes avant liste noire:</span>{' '}
                {Math.max(0, 100 - etudiant.heuresAbsence)}h
              </p>
              <p>
                <span className="font-medium">Pourcentage d'assiduité:</span>{' '}
                {(100 - etudiant.tauxAbsence).toFixed(2)}%
              </p>
              {etudiant.tauxAbsence >= 20 && (
                <p className="text-red-600 font-medium">
                  ⚠️ Attention: Cet étudiant a dépassé le seuil critique d'absences
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

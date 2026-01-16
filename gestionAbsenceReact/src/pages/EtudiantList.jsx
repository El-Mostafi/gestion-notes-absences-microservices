import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { etudiantApi } from '../api/etudiantApi';
import Loading from '../components/common/Loading';
import Badge from '../components/common/Badge';
import { toast } from 'react-toastify';

export default function EtudiantList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [etudiants, setEtudiants] = useState([]);
  const [filteredEtudiants, setFilteredEtudiants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [niveauFilter, setNiveauFilter] = useState('all');

  useEffect(() => {
    fetchEtudiants();
  }, []);

  useEffect(() => {
    filterEtudiants();
  }, [searchTerm, niveauFilter, etudiants]);

  const fetchEtudiants = async () => {
    try {
      setLoading(true);
      const { data } = await etudiantApi.getAll();
      setEtudiants(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des étudiants');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterEtudiants = () => {
    let filtered = [...etudiants];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.nom.toLowerCase().includes(term) ||
          e.prenom.toLowerCase().includes(term) ||
          e.cne.toLowerCase().includes(term)
      );
    }

    if (niveauFilter !== 'all') {
      filtered = filtered.filter((e) => e.niveau === niveauFilter);
    }

    setFilteredEtudiants(filtered);
  };

  const handleDelete = async (id, nom, prenom) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${nom} ${prenom} ?`)) {
      try {
        await etudiantApi.delete(id);
        toast.success('Étudiant supprimé avec succès');
        fetchEtudiants();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
        console.error(error);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Liste des Étudiants</h1>
        <button
          onClick={() => navigate('/etudiants/add')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Ajouter un étudiant
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom ou CNE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={niveauFilter}
            onChange={(e) => setNiveauFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les niveaux</option>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
            <option value="M1">M1</option>
            <option value="M2">M2</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Étudiant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CNE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heures d'absence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taux d'absence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEtudiants.map((etudiant) => (
                <tr key={etudiant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {etudiant.nom} {etudiant.prenom}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {etudiant.cne}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {etudiant.niveau}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {etudiant.heuresAbsence}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge taux={etudiant.tauxAbsence} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/etudiants/${etudiant.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir détails"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`/etudiants/${etudiant.id}/edit`)}
                        className="text-green-600 hover:text-green-900"
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(etudiant.id, etudiant.nom, etudiant.prenom)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEtudiants.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Aucun étudiant trouvé
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Affichage de {filteredEtudiants.length} étudiant(s) sur {etudiants.length}
        </div>
      </div>
    </div>
  );
}

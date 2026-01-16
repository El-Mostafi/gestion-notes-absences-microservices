import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, TrendingUp } from 'lucide-react';
import { etudiantApi } from '../api/etudiantApi';
import Loading from '../components/common/Loading';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import { toast } from 'react-toastify';

export default function Blacklist() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [seuil, setSeuil] = useState(20);
  const [blacklistedStudents, setBlacklistedStudents] = useState([]);

  useEffect(() => {
    fetchBlacklist();
  }, [seuil]);

  const fetchBlacklist = async () => {
    try {
      setLoading(true);
      const { data } = await etudiantApi.getBlacklist(seuil);
      setBlacklistedStudents(data.sort((a, b) => b.tauxAbsence - a.tauxAbsence));
    } catch (error) {
      toast.error('Erreur lors du chargement de la liste noire');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const avgTaux =
    blacklistedStudents.length > 0
      ? blacklistedStudents.reduce((sum, e) => sum + e.tauxAbsence, 0) / blacklistedStudents.length
      : 0;

  const maxTaux =
    blacklistedStudents.length > 0
      ? Math.max(...blacklistedStudents.map((e) => e.tauxAbsence))
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Liste Noire des Absences</h1>
          <p className="text-gray-600 mt-2">
            Étudiants ayant dépassé le seuil critique d'absences
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Seuil de Taux d'Absence: <span className="text-blue-600 font-bold">{seuil}%</span>
          </label>
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={seuil}
            onChange={(e) => setSeuil(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>5%</span>
            <span>25%</span>
            <span>50%</span>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card
                title="Étudiants en Liste Noire"
                value={blacklistedStudents.length}
                icon={AlertCircle}
                color="red"
              />
              <Card
                title="Taux Moyen"
                value={`${avgTaux.toFixed(2)}%`}
                icon={TrendingUp}
                color="orange"
              />
              <Card
                title="Taux Maximum"
                value={`${maxTaux.toFixed(2)}%`}
                icon={AlertCircle}
                color="red"
              />
            </div>

            {blacklistedStudents.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle size={48} className="mx-auto text-green-500 mb-4" />
                <p className="text-xl font-semibold text-gray-900">
                  Aucun étudiant dans la liste noire
                </p>
                <p className="text-gray-600 mt-2">
                  Tous les étudiants ont un taux d'absence inférieur à {seuil}%
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rang
                      </th>
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
                    {blacklistedStudents.map((etudiant, index) => (
                      <tr key={etudiant.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full font-bold text-sm">
                            {index + 1}
                          </div>
                        </td>
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
                          <button
                            onClick={() => navigate(`/etudiants/${etudiant.id}`)}
                            className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                            title="Voir détails"
                          >
                            <Eye size={18} className="mr-1" />
                            Voir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

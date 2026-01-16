import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, AlertCircle, TrendingUp, UserX } from 'lucide-react';
import { etudiantApi } from '../api/etudiantApi';
import Loading from '../components/common/Loading';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    blacklisted: 0,
    avgTaux: 0,
    byLevel: [],
  });
  const [topAbsents, setTopAbsents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: etudiants } = await etudiantApi.getAll();

      const total = etudiants.length;
      const blacklisted = etudiants.filter(e => e.tauxAbsence >= 20).length;
      const avgTaux = etudiants.reduce((sum, e) => sum + e.tauxAbsence, 0) / total || 0;

      const levelCounts = etudiants.reduce((acc, e) => {
        acc[e.niveau] = (acc[e.niveau] || 0) + 1;
        return acc;
      }, {});

      const byLevel = Object.entries(levelCounts).map(([name, value]) => ({
        name,
        value,
      }));

      const top = [...etudiants]
        .sort((a, b) => b.tauxAbsence - a.tauxAbsence)
        .slice(0, 5);

      setStats({ total, blacklisted, avgTaux, byLevel });
      setTopAbsents(top);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Étudiants" value={stats.total} icon={Users} color="blue" />
        <Card title="Liste Noire" value={stats.blacklisted} icon={AlertCircle} color="red" />
        <Card title="Taux Moyen" value={`${stats.avgTaux.toFixed(2)}%`} icon={TrendingUp} color="orange" />
        <Card title="En Règle" value={stats.total - stats.blacklisted} icon={UserX} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Répartition par Niveau</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.byLevel}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.byLevel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Top 5 Étudiants Absents</h2>
          <div className="space-y-3">
            {topAbsents.map((etudiant, index) => (
              <div key={etudiant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{etudiant.nom} {etudiant.prenom}</p>
                    <p className="text-sm text-gray-500">{etudiant.niveau} - {etudiant.heuresAbsence}h</p>
                  </div>
                </div>
                <Badge taux={etudiant.tauxAbsence} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

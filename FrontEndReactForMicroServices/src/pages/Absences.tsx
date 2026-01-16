import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { absencesApi } from '../services/api';
import { StudentAbsence } from '../types';
import toast from 'react-hot-toast';

export default function Absences() {
  const [absences, setAbsences] = useState<StudentAbsence[]>([]);
  const [filteredAbsences, setFilteredAbsences] = useState<StudentAbsence[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    cne: '',
    niveau: '',
    heuresAbsence: 0,
    heuresTotal: 0,
  });

  useEffect(() => {
    loadAbsences();
  }, []);

  useEffect(() => {
    const filtered = absences.filter(
      (a) =>
        a.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.cne.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.niveau.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAbsences(filtered);
  }, [searchTerm, absences]);

  const loadAbsences = async () => {
    try {
      setLoading(true);
      const response = await absencesApi.getAllAbsences();
      setAbsences(response.data);
      setFilteredAbsences(response.data);
    } catch (error) {
      toast.error('Failed to load absences');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await absencesApi.addAbsence(formData);
      toast.success('Absence record added successfully');
      setShowModal(false);
      resetForm();
      loadAbsences();
    } catch (error) {
      toast.error('Failed to add absence record');
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      cne: '',
      niveau: '',
      heuresAbsence: 0,
      heuresTotal: 0,
    });
  };

  const getAbsenceRate = (heuresAbsence: number, heuresTotal: number) => {
    return ((heuresAbsence / heuresTotal) * 100).toFixed(1);
  };

  const isBlacklisted = (heuresAbsence: number, heuresTotal: number) => {
    return heuresAbsence / heuresTotal >= 0.5;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
            Absences Management
          </h1>
          <p className="text-slate-600">Track student attendance and absence rates</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-orange-500/50 hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Record</span>
        </motion.button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, CNE, or level..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">CNE</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Level</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Hours Absent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Total Hours</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Rate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-16"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-12"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-12"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-20"></div></td>
                  </tr>
                ))
              ) : filteredAbsences.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No absence records found
                  </td>
                </tr>
              ) : (
                filteredAbsences.map((absence, index) => {
                  const rate = parseFloat(getAbsenceRate(absence.heuresAbsence, absence.heuresTotal));
                  const blacklisted = isBlacklisted(absence.heuresAbsence, absence.heuresTotal);

                  return (
                    <motion.tr
                      key={absence.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{absence.cne}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{`${absence.nom} ${absence.prenom}`}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{absence.niveau}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{absence.heuresAbsence}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{absence.heuresTotal}</td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-slate-900">{rate}%</div>
                          <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${rate}%` }}
                              transition={{ duration: 1, delay: index * 0.05 }}
                              className={`h-full rounded-full ${
                                rate >= 50 ? 'bg-red-500' : rate >= 30 ? 'bg-orange-500' : 'bg-green-500'
                              }`}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {blacklisted ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Blacklisted
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            OK
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Add Absence Record</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CNE</label>
                  <input
                    type="text"
                    value={formData.cne}
                    onChange={(e) => setFormData({ ...formData, cne: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
                  <input
                    type="text"
                    value={formData.niveau}
                    onChange={(e) => setFormData({ ...formData, niveau: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Hours Absent</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.heuresAbsence}
                      onChange={(e) => setFormData({ ...formData, heuresAbsence: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Total Hours</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.heuresTotal}
                      onChange={(e) => setFormData({ ...formData, heuresTotal: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Add Record
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

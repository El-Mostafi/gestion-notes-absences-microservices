import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Filter } from 'lucide-react';
import { absencesApi } from '../services/api';
import { StudentAbsence } from '../types';
import toast from 'react-hot-toast';

export default function Blacklist() {
  const [blacklistedStudents, setBlacklistedStudents] = useState<StudentAbsence[]>([]);
  const [threshold, setThreshold] = useState(0.5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlacklist();
  }, [threshold]);

  const loadBlacklist = async () => {
    try {
      setLoading(true);
      const response = await absencesApi.getBlacklist(threshold);
      setBlacklistedStudents(response.data);
    } catch (error) {
      toast.error('Failed to load blacklist');
    } finally {
      setLoading(false);
    }
  };

  const getAbsenceRate = (heuresAbsence: number, heuresTotal: number) => {
    return ((heuresAbsence / heuresTotal) * 100).toFixed(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-6"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-block mb-4"
        >
          <div className="relative">
            <AlertTriangle className="w-20 h-20 text-red-500" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"
            />
          </div>
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Blacklist
        </h1>
        <p className="text-slate-600">Students with critical absence rates</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Filter className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-slate-800">Absence Threshold</h2>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-red-600">{(threshold * 100).toFixed(0)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={threshold * 100}
            onChange={(e) => setThreshold(parseInt(e.target.value) / 100)}
            className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-300 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #86efac 0%, #fde047 50%, #fca5a5 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-slate-600">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-white/50 rounded-lg">
          <p className="text-sm text-slate-700">
            <strong>Current filter:</strong> Showing students with{' '}
            <span className="font-bold text-red-600">{(threshold * 100).toFixed(0)}%</span> or more absence rate
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-red-200 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Blacklisted Students</h2>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-bold">
              {blacklistedStudents.length} students
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">CNE</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">Level</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">Hours Absent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">Total Hours</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">Absence Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-red-200 rounded w-16"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-red-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-red-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-red-200 rounded w-16"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-red-200 rounded w-12"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-red-200 rounded w-12"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-red-200 rounded w-24"></div></td>
                  </tr>
                ))
              ) : blacklistedStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-4xl">✨</span>
                      <p className="text-slate-500">No students meet the blacklist criteria</p>
                      <p className="text-sm text-slate-400">Try adjusting the threshold</p>
                    </div>
                  </td>
                </tr>
              ) : (
                blacklistedStudents.map((student, index) => {
                  const rate = parseFloat(getAbsenceRate(student.heuresAbsence, student.heuresTotal));
                  const severity = rate >= 80 ? 'critical' : rate >= 65 ? 'high' : 'medium';

                  return (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`hover:bg-red-50 transition-colors ${
                        severity === 'critical' ? 'bg-red-100/50' : severity === 'high' ? 'bg-orange-50/50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {severity === 'critical' && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                            >
                              <AlertTriangle className="w-5 h-5 text-red-600" />
                            </motion.div>
                          )}
                          <span className={`font-bold ${
                            severity === 'critical' ? 'text-red-600' :
                            severity === 'high' ? 'text-orange-600' : 'text-yellow-600'
                          }`}>
                            {severity === 'critical' ? 'CRITICAL' : severity === 'high' ? 'HIGH' : 'MEDIUM'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.cne}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">{`${student.nom} ${student.prenom}`}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{student.niveau}</td>
                      <td className="px-6 py-4 text-sm font-bold text-red-600">{student.heuresAbsence}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{student.heuresTotal}</td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-red-600">{rate}%</span>
                          </div>
                          <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${rate}%` }}
                              transition={{ duration: 1, delay: index * 0.05 }}
                              className={`h-full rounded-full ${
                                severity === 'critical' ? 'bg-red-600' :
                                severity === 'high' ? 'bg-orange-600' : 'bg-yellow-600'
                              }`}
                            />
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {!loading && blacklistedStudents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 border border-red-200"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-3">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Critical Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {blacklistedStudents.filter(s => (s.heuresAbsence / s.heuresTotal) >= 0.8).length}
              </p>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">High Priority</p>
              <p className="text-2xl font-bold text-orange-600">
                {blacklistedStudents.filter(s => {
                  const rate = s.heuresAbsence / s.heuresTotal;
                  return rate >= 0.65 && rate < 0.8;
                }).length}
              </p>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Medium Priority</p>
              <p className="text-2xl font-bold text-yellow-600">
                {blacklistedStudents.filter(s => (s.heuresAbsence / s.heuresTotal) < 0.65).length}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

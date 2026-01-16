import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { gradesApi } from '../services/api';
import { Student } from '../types';
import toast from 'react-hot-toast';

export default function TopStudents() {
  const [topStudents, setTopStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopStudents();
  }, []);

  const loadTopStudents = async () => {
    try {
      setLoading(true);
      const response = await gradesApi.getTopStudents();
      setTopStudents(response.data);
    } catch (error) {
      toast.error('Failed to load top students');
    } finally {
      setLoading(false);
    }
  };

  const getAverage = (note1: number, note2: number) => {
    return ((note1 + note2) / 2).toFixed(2);
  };

  const getPodiumPosition = (index: number) => {
    if (index === 0) return { height: 'h-64', color: 'from-yellow-400 to-yellow-600', medal: '🥇', text: 'text-yellow-600' };
    if (index === 1) return { height: 'h-48', color: 'from-slate-300 to-slate-500', medal: '🥈', text: 'text-slate-600' };
    if (index === 2) return { height: 'h-40', color: 'from-orange-400 to-orange-600', medal: '🥉', text: 'text-orange-600' };
    return { height: 'h-32', color: 'from-blue-400 to-blue-600', medal: '🎖️', text: 'text-blue-600' };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-block mb-4"
        >
          <Trophy className="w-20 h-20 text-yellow-500" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
          Top Students
        </h1>
        <p className="text-slate-600">Celebrating academic excellence</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
        </div>
      ) : topStudents.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500">No students found</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-end space-x-4 mb-12">
            {topStudents.slice(0, 3).map((student, index) => {
              const actualIndex = index === 0 ? 1 : index === 1 ? 0 : 2;
              const position = getPodiumPosition(actualIndex);
              const avg = getAverage(student.note1, student.note2);

              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: actualIndex * 0.2, type: 'spring', stiffness: 100 }}
                  className="flex flex-col items-center"
                  style={{ order: index }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                    className={`${position.height} w-48 bg-gradient-to-br ${position.color} rounded-t-2xl shadow-2xl flex flex-col items-center justify-start p-6 relative overflow-hidden`}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm"></div>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: actualIndex * 0.2 + 0.3 }}
                      className="text-6xl mb-3 relative z-10"
                    >
                      {position.medal}
                    </motion.div>
                    <div className="text-center relative z-10">
                      <p className="text-white font-bold text-lg mb-1">{`${student.nom} ${student.prenom}`}</p>
                      <p className="text-white/80 text-sm mb-2">{student.cne}</p>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                        <p className="text-white font-bold text-2xl">{avg}</p>
                        <p className="text-white/80 text-xs">Average</p>
                      </div>
                    </div>
                  </motion.div>
                  <div className="w-48 bg-gradient-to-br from-slate-700 to-slate-900 text-white py-2 rounded-b-2xl text-center font-bold">
                    #{actualIndex + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4">
              <h2 className="text-xl font-bold text-slate-800">Complete Rankings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">CNE</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Module</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Note 1</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Note 2</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Average</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {topStudents.map((student, index) => {
                    const position = getPodiumPosition(index);
                    const avg = getAverage(student.note1, student.note2);

                    return (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className={`text-2xl font-bold ${position.text}`}>#{index + 1}</span>
                            {index < 3 && <span className="text-2xl">{position.medal}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.cne}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{`${student.nom} ${student.prenom}`}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{student.module}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{student.note1}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{student.note2}</td>
                        <td className="px-6 py-4">
                          <span className={`text-lg font-bold ${position.text}`}>{avg}</span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}

      {!loading && topStudents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 right-8"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full shadow-2xl"
          >
            <Award className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

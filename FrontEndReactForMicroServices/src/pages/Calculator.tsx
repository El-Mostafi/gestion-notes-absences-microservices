import { useEffect, useState } from 'react';
import { motion, useMotionValue, animate, useMotionValueEvent } from 'framer-motion';
import { Calculator as CalcIcon, Minus, Equal } from 'lucide-react';
import { gradesApi, absencesApi } from '../services/api';
import { Student, StudentAbsence } from '../types';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Calculator() {
  const [students, setStudents] = useState<Student[]>([]);
  const [absences, setAbsences] = useState<StudentAbsence[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [result, setResult] = useState({
    moyenne: 0,
    tauxAbsence: 0,
    penalite: 0,
    noteFinale: 0,
  });

  // Display values for animation
  const [displayMoyenne, setDisplayMoyenne] = useState('0.00');
  const [displayTaux, setDisplayTaux] = useState('0.0');
  const [displayPenalite, setDisplayPenalite] = useState('0.00');
  const [displayFinale, setDisplayFinale] = useState('0.00');

  const moyenneCount = useMotionValue(0);
  const tauxCount = useMotionValue(0);
  const penaliteCount = useMotionValue(0);
  const finaleCount = useMotionValue(0);

  // Update display values when motion values change
  useMotionValueEvent(moyenneCount, "change", (latest) => {
    setDisplayMoyenne(latest.toFixed(2));
  });
  useMotionValueEvent(tauxCount, "change", (latest) => {
    setDisplayTaux((latest * 100).toFixed(1));
  });
  useMotionValueEvent(penaliteCount, "change", (latest) => {
    setDisplayPenalite(latest.toFixed(2));
  });
  useMotionValueEvent(finaleCount, "change", (latest) => {
    setDisplayFinale(latest.toFixed(2));
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [studentsRes, absencesRes] = await Promise.all([
        gradesApi.getAllStudents(),
        absencesApi.getAllAbsences(),
      ]);
      setStudents(studentsRes.data);
      setAbsences(absencesRes.data);
    } catch {
      toast.error('Failed to load data');
    }
  };

  const handleCalculate = async () => {
    if (!selectedStudent) {
      toast.error('Please select a student');
      return;
    }

    const student = students.find((s) => s.id?.toString() === selectedStudent);
    const absence = absences.find((a) => a.cne === student?.cne);

    if (!student || !absence) {
      toast.error('Student data not found');
      return;
    }

    const moyenne = (student.note1 + student.note2) / 2;
    const tauxAbsence = absence.heuresAbsence / absence.heuresTotal;
    const penalite = tauxAbsence * moyenne;
    const noteFinale = moyenne - penalite;

    setResult({ moyenne, tauxAbsence, penalite, noteFinale });

    animate(moyenneCount, moyenne, { duration: 1.5, ease: 'easeOut' });
    animate(tauxCount, tauxAbsence, { duration: 1.5, ease: 'easeOut' });
    animate(penaliteCount, penalite, { duration: 1.5, ease: 'easeOut' });
    animate(finaleCount, noteFinale, { duration: 2, ease: 'easeOut', delay: 0.5 });

    toast.success('Calculation complete!');
  };

  const chartData = [
    { name: 'Average', value: result.moyenne, fill: '#22c55e' },
    { name: 'Penalty', value: result.penalite, fill: '#ef4444' },
    { name: 'Final Grade', value: result.noteFinale, fill: '#3b82f6' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-block mb-4"
        >
          <CalcIcon className="w-20 h-20 text-blue-500" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          Final Grade Calculator
        </h1>
        <p className="text-slate-600">Calculate final grades with absence penalties</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-blue-200 shadow-xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Formula</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-4 text-6xl font-bold"
          >
            <span className="text-blue-600">N</span>
            <Equal className="w-12 h-12 text-slate-400" />
            <span className="text-green-600">M</span>
            <Minus className="w-12 h-12 text-slate-400" />
            <span className="text-orange-600">T</span>
            <span className="text-slate-400">×</span>
            <span className="text-green-600">M</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-green-100 rounded-xl p-4 border-2 border-green-300"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">M</div>
              <div className="text-sm text-green-800 font-medium">Average</div>
              <div className="text-xs text-green-700 mt-1">(note1 + note2) / 2</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-orange-100 rounded-xl p-4 border-2 border-orange-300"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">T</div>
              <div className="text-sm text-orange-800 font-medium">Absence Rate</div>
              <div className="text-xs text-orange-700 mt-1">absent / total (0.0-1.0)</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-red-100 rounded-xl p-4 border-2 border-red-300"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">T×M</div>
              <div className="text-sm text-red-800 font-medium">Penalty</div>
              <div className="text-xs text-red-700 mt-1">Points deducted</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-100 rounded-xl p-4 border-2 border-blue-300"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">N</div>
              <div className="text-sm text-blue-800 font-medium">Final Grade</div>
              <div className="text-xs text-blue-700 mt-1">After penalty</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4">Example</h3>
          <div className="space-y-2 text-slate-700">
            <p>If a student has:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Average (M) = <span className="font-bold text-green-600">15</span></li>
              <li>Absence rate (T) = <span className="font-bold text-orange-600">0.2</span> (20%)</li>
            </ul>
            <p className="mt-4">Then:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Penalty (T×M) = 0.2 × 15 = <span className="font-bold text-red-600">3</span></li>
              <li>Final grade (N) = 15 - 3 = <span className="font-bold text-blue-600">12</span></li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 p-8"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Calculate for Student</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            >
              <option value="">Choose a student...</option>
              {students.map((student) => (
                <option key={student.id} value={student.id?.toString()}>
                  {student.cne} - {student.nom} {student.prenom}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl transition-all text-lg font-bold"
          >
            Calculate Final Grade
          </motion.button>
        </div>
      </motion.div>

      {result.noteFinale > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-xl text-white"
            >
              <div className="text-sm font-medium mb-2 opacity-90">Average (M)</div>
              <div className="text-5xl font-bold">
                {displayMoyenne}
              </div>
              <div className="text-sm mt-2 opacity-75">Initial grade</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl text-white"
            >
              <div className="text-sm font-medium mb-2 opacity-90">Absence Rate (T)</div>
              <div className="text-5xl font-bold">
                {displayTaux}%
              </div>
              <div className="text-sm mt-2 opacity-75">Time missed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 shadow-xl text-white"
            >
              <div className="text-sm font-medium mb-2 opacity-90">Penalty (T×M)</div>
              <div className="text-5xl font-bold flex items-center">
                <Minus className="w-8 h-8 mr-2" />
                {displayPenalite}
              </div>
              <div className="text-sm mt-2 opacity-75">Points lost</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden"
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute inset-0 bg-white rounded-full blur-3xl"
              />
              <div className="relative z-10">
                <div className="text-sm font-medium mb-2 opacity-90">Final Grade (N)</div>
                <div className="text-6xl font-bold">
                  {displayFinale}
                </div>
                <div className="text-sm mt-2 opacity-75">Result</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 p-6"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">Visual Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl p-6 border border-slate-300"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-3">Calculation Breakdown</h3>
            <div className="space-y-2 font-mono text-slate-700">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span>M (Average)</span>
                <span className="font-bold text-green-600">{result.moyenne.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span>T (Absence Rate)</span>
                <span className="font-bold text-orange-600">{result.tauxAbsence.toFixed(3)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span>T × M (Penalty)</span>
                <span className="font-bold text-red-600">-{result.penalite.toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-slate-400 my-2"></div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg border-2 border-blue-300">
                <span className="font-bold">N (Final Grade)</span>
                <span className="font-bold text-2xl text-blue-600">{result.noteFinale.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

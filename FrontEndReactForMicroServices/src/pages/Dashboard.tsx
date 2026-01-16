import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { gradesApi, absencesApi } from '../services/api';
import StatCard from '../components/Dashboard/StatCard';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    passing: 0,
    blacklisted: 0,
    average: 0,
  });

  const [gradeDistribution, setGradeDistribution] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [studentsRes, passingRes, blacklistRes] = await Promise.all([
        gradesApi.getAllStudents(),
        gradesApi.getPassingStudents(),
        absencesApi.getBlacklist(0.5),
      ]);

      const students = studentsRes.data;
      const total = students.length;
      const passing = passingRes.data.length;
      const blacklisted = blacklistRes.data.length;

      const totalAvg = students.reduce((sum, s) => sum + (s.note1 + s.note2) / 2, 0) / (total || 1);

      setStats({
        total,
        passing,
        blacklisted,
        average: Math.round(totalAvg * 10) / 10,
      });

      const ranges = [
        { range: '0-5', count: 0 },
        { range: '6-9', count: 0 },
        { range: '10-11', count: 0 },
        { range: '12-15', count: 0 },
        { range: '16-20', count: 0 },
      ];

      students.forEach((s) => {
        const avg = (s.note1 + s.note2) / 2;
        if (avg < 6) ranges[0].count++;
        else if (avg < 10) ranges[1].count++;
        else if (avg < 12) ranges[2].count++;
        else if (avg < 16) ranges[3].count++;
        else ranges[4].count++;
      });

      setGradeDistribution(ranges);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    }
  };

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-slate-600">Overview of student performance and attendance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.total}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          color="text-blue-600"
          bgColor="bg-blue-50"
          delay={0}
        />
        <StatCard
          title="Passing Students"
          value={stats.passing}
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          color="text-green-600"
          bgColor="bg-green-50"
          delay={0.1}
        />
        <StatCard
          title="Blacklisted"
          value={stats.blacklisted}
          icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
          color="text-red-600"
          bgColor="bg-red-50"
          delay={0.2}
        />
        <StatCard
          title="Average Grade"
          value={stats.average}
          icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
          color="text-purple-600"
          bgColor="bg-purple-50"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">Grade Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">Pass Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Passing', value: stats.passing },
                  { name: 'Failing', value: stats.total - stats.passing },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Passing ({stats.passing})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Failing ({stats.total - stats.passing})</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

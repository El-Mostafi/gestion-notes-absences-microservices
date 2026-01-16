import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  GraduationCap,
  CalendarX,
  Trophy,
  AlertTriangle,
  Calculator
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'grades', label: 'Grades', icon: GraduationCap },
  { id: 'absences', label: 'Absences', icon: CalendarX },
  { id: 'top', label: 'Top Students', icon: Trophy },
  { id: 'blacklist', label: 'Blacklist', icon: AlertTriangle },
  { id: 'calculator', label: 'Calculator', icon: Calculator },
];

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 shadow-2xl"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Student Portal
        </h1>
        <p className="text-slate-400 text-sm mt-1">Management System</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/50'
                  : 'hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </motion.aside>
  );
}

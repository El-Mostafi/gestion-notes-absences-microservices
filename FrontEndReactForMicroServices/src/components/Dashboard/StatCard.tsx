import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  delay?: number;
}

export default function StatCard({ title, value, icon, color, bgColor, delay = 0 }: StatCardProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      delay,
      ease: 'easeOut',
    });

    return controls.stop;
  }, [value, delay, count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`${bgColor} backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <motion.p className={`text-4xl font-bold ${color}`}>
            {rounded}
          </motion.p>
        </div>
        <div className={`${bgColor} p-3 rounded-xl shadow-lg`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default function Badge({ taux }) {
  const getColor = () => {
    if (taux >= 20) return 'bg-red-100 text-red-800';
    if (taux >= 10) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColor()}`}>
      {taux.toFixed(2)}%
    </span>
  );
}

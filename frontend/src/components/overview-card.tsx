export const OverviewCard = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <div
      className={`p-4 rounded-lg shadow flex flex-col md:flex-1 ${
        label === 'Current Balance' ? 'bg-gray-900 text-white' : 'bg-white'
      }`}
    >
      <p className="text-sm mb-2">{label}</p>
      <p className="font-bold text-xl">${value}</p>
    </div>
  );
};

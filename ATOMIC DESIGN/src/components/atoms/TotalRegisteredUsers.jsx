export default function TotalRegisteredUsers({ count, isActive, onClick }) {
  const className = [
    "w-full rounded-lg border px-4 py-4 text-left shadow-sm transition sm:px-5 sm:py-5",
    isActive ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white",
    "hover:border-blue-300 hover:bg-blue-50",
  ].join(" ");

  return (
    <button aria-pressed={isActive} className={className} type="button" onClick={onClick}>
      <span className="block text-base font-bold text-slate-900 sm:text-lg">👥 Total Registered Users</span>
      <span className="mt-1 block text-sm text-slate-600">{count}</span>
    </button>
  );
}

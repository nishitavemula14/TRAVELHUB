export default function AdminSearch({
  onChange,
  placeholder = "Search by Name, Email, Role, Bus Name, From or To...",
  value,
}) {
  return (
    <label className="mb-4 block">
      <span className="sr-only">Search admin dashboard</span>
      <input
        className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        placeholder={placeholder}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

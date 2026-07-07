export default function TextInput({ label, onChange, ...inputProps }) {
  return (
    <label className="block">
      <span className="mb-1 block font-medium text-slate-700">{label} </span>
      <input
        className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(event) => onChange(event.target.value)}
        {...inputProps}
      />
    </label>
  );
}

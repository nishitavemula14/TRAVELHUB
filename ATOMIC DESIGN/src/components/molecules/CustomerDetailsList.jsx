import CustomerTripList from "./CustomerTripList";

export function CustomerDetailsCard({ customer }) {
    return (
        <article className="px-4 py-4">
            <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-slate-900">{customer.name}</h2>
                <p className="break-all text-sm text-slate-600">{customer.email}</p>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">Role</dt>
                    <dd className="mt-1 text-slate-800">{customer.role}</dd>
                </div>
                <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">Tickets</dt>
                    <dd className="mt-1 text-slate-800">{customer.bookedTickets}</dd>
                </div>
            </dl>
            <div className="mt-3 text-sm text-slate-700">
                <p className="text-xs font-semibold uppercase text-slate-500">From - To</p>
                <div className="mt-1">
                    <CustomerTripList customer={customer} />
                </div>
            </div>
        </article>        
    );
}

export function CustomerDetailsRow({ customer, isLast = false }) {
    const rowBorder = isLast ? "" : "border-b";

    return (
        <tr>
            <td className={`${rowBorder} border-r border-slate-200 px-4 py-3 font-medium text-slate-900`}>{customer.name}</td>
            <td className={`${rowBorder} border-r border-slate-200 px-4 py-3 text-slate-700`}>{customer.email}</td>
            <td className={`${rowBorder} border-r border-slate-200 px-4 py-3 text-slate-700`}>{customer.role}</td>
            <td className={`${rowBorder} border-r border-slate-200 px-4 py-3 text-slate-700`}>{customer.bookedTickets}</td>
            <td className={`${rowBorder} border-slate-200 px-4 py-3 text-slate-700`}>
                <CustomerTripList customer={customer} />
            </td>   
        </tr>
    );
}

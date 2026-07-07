import { CustomerDetailsCard, CustomerDetailsRow } from "../molecules/CustomerDetailsList.jsx";

export default function CustomerDetailsList({ customers }) {
    return (
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="divide-y divide-slate-200 md:hidden">
                {customers.map((customer) => (
                    <CustomerDetailsCard key={customer.email} customer={customer} />
                ))}
                {customers.length === 0 && <p className="px-4 py-6 text-center text-slate-600">No customers found.</p>}
            </div>
         <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase">
                    <tr>
                        <th className="border-b border-r border-slate-200 px-6 py-3 font-semibold">Name</th>
                        <th className="border-b border-r border-slate-200 px-6 py-3 font-semibold">Email</th>
                        <th className="border-b border-r border-slate-200 px-6 py-3 font-semibold">Role</th>
                        <th className="border-b border-r border-slate-200 px-6 py-3 font-semibold">Booked Tickets</th>
                        <th className="border-b border-slate-200 px-6 py-3 font-semibold">From - To</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <CustomerDetailsRow
                            key={customer.email}
                            customer={customer}
                            isLast={index === customers.length - 1}
                        />
                    ))}
                    {customers.length === 0 && (
                        <tr>
                            <td className="px-4 py-6 text-center text-slate-600" colSpan={5}>No customers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
         </div>

        </section>
    );
}

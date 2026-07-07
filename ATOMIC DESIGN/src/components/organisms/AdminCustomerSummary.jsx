import TotalBookings from "../atoms/TotalBookings.jsx";
import TotalBuses from "../atoms/TotalBuses.jsx";
import TotalRegisteredUsers from "../atoms/TotalRegisteredUsers.jsx";

export default function AdminCustomerSummary({
    isShowingBusList,
    isShowingBookings,
    isShowingRegisteredUsers,
    onShowBusList,
    onShowBookings,
    onShowRegisteredUsers,
    totalBookings,
    totalBuses,
    totalRegisteredUsers,
}) {
    return (
        <section className="grid gap-4 sm:grid-cols-3">
            <TotalBuses
                count={totalBuses}
                isActive={isShowingBusList}
                onClick={onShowBusList}
            />
            <TotalBookings
                count={totalBookings}
                isActive={isShowingBookings}
                onClick={onShowBookings}
            />
            <TotalRegisteredUsers
                count={totalRegisteredUsers}
                isActive={isShowingRegisteredUsers}
                onClick={onShowRegisteredUsers}
            />
        </section>  
    );
}

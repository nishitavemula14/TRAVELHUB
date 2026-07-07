import { Link } from "react-router-dom";

export default function AdminCustomerSummaryLink({ count, label, onClick, pressed = false, searchQuery = "", to }) {
    const trimmedSearchQuery = searchQuery.trim();
    const linkTo = to && trimmedSearchQuery ? `${to}?search=${encodeURIComponent(trimmedSearchQuery)}` : to;
    const className = [
        "rounded-lg border px-4 py-4 text-left shadow-sm transition sm:px-5 sm:py-5",
        pressed ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white",
        onClick || linkTo ? "hover:border-blue-300 hover:bg-blue-50" : "",
    ].join(" ");
    const content = (
        <>
            <span className="block text-base font-bold text-slate-900 sm:text-lg">{label}</span>
            <span className="mt-1 block text-sm text-slate-600">{count}</span>
        </>
    );

    if (onClick) {
        return (
            <button
                aria-pressed={pressed}
                className={`${className} w-full`}
                type="button"
                onClick={onClick}
            >
                {content}
            </button>
        );
    }

    if (!linkTo) {
        return (
            <div className={className}>
                {content}
            </div>
        );
    }

    return (
        <Link
        to={linkTo}
        className={className}>
            {content}
        </Link>
    );
}

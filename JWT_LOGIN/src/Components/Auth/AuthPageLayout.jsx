export default function AuthPageLayout({ children}) {
    return <main 
    className="
    min-h-[80vh]
    bg-slate-100
    px-4
    py-10">
        {children}
    </main>;
}
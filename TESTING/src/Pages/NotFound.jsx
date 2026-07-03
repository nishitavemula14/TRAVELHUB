import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      className="
            flex
            min-h-[80vh]
            items-center
            justify-center
            bg-gray-100
            px-4
            text-center
            "
    >
      <section
        className="
                w-full
                max-w-xl
                rounded-xl
                bg-white
                p-8
                shadow-lg
                "
      >
        <p
          className="
                    text-lg
                    font-semibold
                    text-blue-500
                    "
        >
          404 Error
        </p>

        <h1
          className="
                    mt-3
                    text-3xl
                    font-bold
                    text-slate-800
                    sm:text-4xl
                    "
        >
          Page Not Found
        </h1>

        <p
          className="
                    mt-4
                    text-base
                    text-slate-600
                    sm:text-lg
                    "
        >
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="
                    mt-6
                    inline-block
                    rounded-md
                    bg-blue-400
                    px-6
                    py-3
                    font-semibold
                    text-black
                    transition
                    hover:bg-blue-600
                    "
        >
          Go Back Home
        </Link>
      </section>
    </main>
  );
}

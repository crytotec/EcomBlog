import { Home, Search } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-[80vh] bg-brand flex items-center justify-center px-5 sm:px-8">
      <div className="max-w-md w-full text-center">
        <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-8">
          <div className="absolute inset-0 rounded-full bg-yellow-500" />
          <div className="relative w-full h-full grid place-items-center text-7xl sm:text-8xl select-none rotate-[-6deg]">
            Book
          </div>
          <div className="absolute -right-2 top-4 bg-yellow-300 text-white text-xs font-bold rounded-full px-3 py-1.5 rotate-[8deg] shadow-xlg">
            404
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl">Book not found</h1>
        <p className="mt-3 text-ink/70 max-w-sm mx-auto">
          Looks like this page got lost. Let's get you back on track.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          
            <a href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-ink text-white font-semibold text-sm rounded-xl px-6 py-3 hover:bg-black transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to home
          </a>
          
            <a href="/menu"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-ink font-semibold text-sm rounded-xl px-6 py-3 hover:bg-white/80 transition-colors shadow-sm"
          >
            <Search className="w-4 h-4" />
            Browse Store
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
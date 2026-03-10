import { Link } from "react-router-dom";

export default function Header() {
  return (
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-primary text-white p-2 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined">bubble_chart</span>
          </div>
          <span className="text-xl font-bold tracking-tight">
            ChatGPT AI Companion
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#how">
            How it works
          </a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#privacy">
            Privacy
          </a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-flex text-sm font-semibold text-slate-300 hover:text-primary px-4 py-2 transition-colors"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-primary/20 transition-all active:scale-95"
          >
            Registration
          </Link>
        </div>
      </nav>
  );
}

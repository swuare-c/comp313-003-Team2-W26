import { Link } from "react-router-dom";

export default function DemoCTA() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-16">
      <div className="bg-slate-900/70 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-sm relative overflow-hidden group backdrop-blur">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <span className="material-symbols-outlined text-[120px] text-primary">
            rocket_launch
          </span>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Experience the React-powered demo
            </h2>
            <p className="text-slate-400 max-w-lg">
              Try our interactive demo to see how our AI listening companion can
              help you today—no strings attached.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/guest-tutorial"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/10 relative overflow-hidden text-center"
            >
              Try the Demo
            </Link>

            <Link
              to="/guest-tutorial"
              className="bg-primary/10 hover:bg-primary/15 text-primary border border-primary/20 px-8 py-3.5 rounded-xl font-bold transition-all text-center"
            >
              Start Trial Without Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

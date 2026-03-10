import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-2 gap-16 items-center">
      {/* Left */}
      <div className="flex flex-col gap-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider w-fit">
          <span className="material-symbols-outlined text-[16px] leading-none">
            auto_awesome
          </span>
          Your Personal Sanctuary
        </div>

        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-primary/60 uppercase">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          System: Live &amp; Active
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
          Your space to be heard,{" "}
          <span className="text-primary italic">anytime.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
          A compassionate AI companion designed to listen, support, and help you
          navigate your thoughts in a safe, private environment. No judgment,
          just understanding.
        </p>

        {/* REQUIRED ACTIONS */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/login"
              className="bg-slate-800 border border-slate-700 hover:border-primary/40 text-slate-200 px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/25 transition-all flex items-center justify-center gap-2"
            >
              Registration
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/guest-tutorial"
              className="bg-primary/10 hover:bg-primary/15 text-primary border border-primary/20 px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2"
            >
              Guest Tutorial
              <span className="material-symbols-outlined">school</span>
            </Link>

            <Link
              to="/reset-password"
              className="text-slate-400 hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30 px-2 py-4 text-center sm:text-left"
            >
              Reset Password
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-400">
            Start with an account, or try the guest tutorial first.
          </p>
        </div>
      </div>

      {/* Right visual */}
      <div className="relative flex justify-center items-center">
        <div className="absolute -z-10 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/10">
          <img
            alt="Calm lake at sunset"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTSStbNarCFAL4LVQlM4KJ24MMWBHJEagi6DddqPwJiz323XrYeq19rSLKA7b6iCZxdMX9DKXm_DKtzoypdNs8vbv0TAgFsuHDbUsuuDFlIR-rIcjml26ffFCcydz9Oxjy6Q4ryMA-Qu147dk4jO_0smGqm46PAC1-EMiL3IWn_J3rb3aytSzHm_fhtU5CX2EMYKHuym7u8hLUr77600wVj40ldIrKklDZP4CUCDVQPVjWiHhAaD_NHbhIlrSK-8wxJ6dRTQ6pv1o"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>

          <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Real-time Support</h4>
                <p className="text-xs text-slate-400">
                  Available 24/7 whenever you need to talk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

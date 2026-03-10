export default function Features() {
  return (
    <section
      className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800"
      id="pricing"
    >
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white mb-4">
          Why choose a listening companion?
        </h2>
        <p className="text-slate-400">
          We provide a secure, non-judgmental space for your thoughts.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-primary/30 transition-all group">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[32px]">
              schedule
            </span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">24/7 Availability</h3>
          <p className="text-slate-400 leading-relaxed">
            Always here when you need to talk, day or night. We don’t sleep, so
            you can rest easier.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-primary/30 transition-all group">
          <div className="w-14 h-14 bg-green-500/10 text-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[32px]">lock</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Complete Privacy</h3>
          <p className="text-slate-400 leading-relaxed">
            Your conversations are private. We never sell your data or share
            your personal stories.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-primary/30 transition-all group">
          <div className="w-14 h-14 bg-rose-500/10 text-rose-300 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[32px]">
              favorite
            </span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Empathetic AI</h3>
          <p className="text-slate-400 leading-relaxed">
            Powered by modern language models tuned for active listening and
            supportive dialogue.
          </p>
        </div>
      </div>
    </section>
  );
}

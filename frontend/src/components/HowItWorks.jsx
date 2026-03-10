export default function HowItWorks() {
  return (
    <section id="how" className="max-w-7xl mx-auto px-6 py-20 my-12 rounded-[2.5rem] bg-slate-900/30 backdrop-blur-sm">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">How it Works</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A simple, secure path to get support—whether you register, login, reset your password, or try the guest tutorial.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <span className="material-symbols-outlined text-[36px]">chat_bubble</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">1. Enter</h3>
          <p className="text-slate-400 leading-relaxed">
            Open the app and choose what you need: Login, Registration, Reset Password, or Guest Tutorial.
          </p>
        </div>

        <div className="flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <span className="material-symbols-outlined text-[36px]">record_voice_over</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">2. Be Heard</h3>
          <p className="text-slate-400 leading-relaxed">
            Start a guided conversation experience designed to support and reflect your thoughts with care.
          </p>
        </div>

        <div className="flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <span className="material-symbols-outlined text-[36px]">self_improvement</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">3. Continue</h3>
          <p className="text-slate-400 leading-relaxed">
            Try the guest tutorial or create an account to save progress and access more features later.
          </p>
        </div>
      </div>
    </section>
  );
}

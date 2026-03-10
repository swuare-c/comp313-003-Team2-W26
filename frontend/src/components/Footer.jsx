export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 text-primary p-1.5 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">bubble_chart</span>
          </div>
          <span className="font-bold">ChatGPT AI Companion</span>
        </div>

        <p className="text-sm text-slate-500">
          © 2026 ChatGPT AI Companion. Built for your peace of mind.
        </p>
      </div>
    </footer>
  );
}

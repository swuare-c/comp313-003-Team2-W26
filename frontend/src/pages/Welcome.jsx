import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import DemoCTA from "../components/DemoCTA";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Welcome() {
  return (
    <div className="dark bg-background-light text-slate-100 font-display min-h-screen">
      <Header />
      <main className="relative overflow-hidden soft-gradient">
        <Hero />
        <HowItWorks />
        <DemoCTA />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProjectsPage() {
  return (
    <div className="bg-[#f8f8f8] dark:bg-[#050505] min-h-screen transition-colors duration-500">
      <main className="relative w-full z-10 pt-40 pb-32 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <h1 className="text-6xl sm:text-7xl lg:text-[100px] leading-none font-black text-black dark:text-white uppercase tracking-tighter mb-8">
          PROJECTS
        </h1>
        <p className="text-black/70 dark:text-white/70 text-lg sm:text-xl font-mono max-w-2xl leading-relaxed mb-20">
          A selection of our recent work. More coming soon.
        </p>
        
        {/* Placeholder grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="aspect-[4/3] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
             <span className="font-mono text-sm tracking-widest uppercase opacity-50">Axelfest</span>
           </div>
           <div className="aspect-[4/3] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
             <span className="font-mono text-sm tracking-widest uppercase opacity-50">Portfolio</span>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
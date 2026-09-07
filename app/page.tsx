import Hero from "./components/Hero";
import HomeWebsites from "./components/HomeWebsites";
import LogoCloud from "./components/LogoCloud";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-[#f8f8f8] dark:bg-[#111111] min-h-screen transition-colors duration-500">
      <main className="relative w-full">
        {/* Sticky Hero Background (Parallax Effect) */}
        <div className="sticky top-0 h-screen w-full -z-0">
          <Hero />
        </div>

        {/* Content scrolling OVER the Hero (This makes the footer and sections come UP over the hero) */}
        <div className="relative z-10 w-full bg-[#f8f8f8] dark:bg-[#111111] shadow-[0_-40px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_-40px_80px_rgba(0,0,0,0.9)] border-t border-black/10 dark:border-white/10 transition-colors duration-500">
          <LogoCloud />
          <HomeWebsites />
          <Footer />
        </div>
      </main>
    </div>
  );
}

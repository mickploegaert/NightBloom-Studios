import Navbar from "../components/Navbar";
import WebsitesSection from "../components/WebsitesSection";
import Footer from "../components/Footer";

export default function WebsitesPage() {
  return (
    <div className="bg-[#f8f8f8] dark:bg-[#111111] min-h-screen transition-colors duration-500">
      <main className="relative w-full z-10 pt-20">
        <WebsitesSection />
      </main>

      <Footer />
    </div>
  );
}

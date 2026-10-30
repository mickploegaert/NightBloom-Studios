import WebsitesSection from "../components/WebsitesSection";
import Footer from "../components/Footer";

export default function WebsitesPage() {
  return (
    <div className="bg-white dark:bg-black min-h-screen transition-colors duration-500">
      <main className="relative w-full z-10 pt-20">
        <WebsitesSection />
      </main>

      <Footer />
    </div>
  );
}

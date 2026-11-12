import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-dark-950">
      <Navbar />
      <div className="relative pb-24 pt-28 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#0a1320] blur-[150px]" />
          <div className="absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-brand-600/5 blur-[120px]" />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
      <Footer />
    </main>
  );
}

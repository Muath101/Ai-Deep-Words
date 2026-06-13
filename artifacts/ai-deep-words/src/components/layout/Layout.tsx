import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-hidden">
      <Navbar />
      <main className="flex-1 w-full relative z-10 pt-24">{children}</main>
      <Footer />
      
      {/* Ambient backgrounds */}
      <div className="fixed top-0 left-1/4 w-1/2 h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-1/3 h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
}

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Sidebar /> {/* Fixed on desktop */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

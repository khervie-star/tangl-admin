import { ReactNode } from "react";
import { SideBar, TopBar } from "./_components";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLaoyout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <SideBar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 md:ml-[17.5rem]">
        <header className="sticky top-0 z-10 bg-white">
          <TopBar />
        </header>

        <main className="p-6 overflow-auto container mx-auto">{children}</main>
      </div>
    </div>
  );
};


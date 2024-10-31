import { Outlet } from "react-router-dom";

// components
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex flex-col w-full">
        <Topbar />
        <Outlet />
        <Toaster />
      </main>
    </SidebarProvider>
  );
};

export default App;

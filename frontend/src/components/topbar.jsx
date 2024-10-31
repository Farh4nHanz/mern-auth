import { SidebarTrigger } from "@/components/ui/sidebar";

export const Topbar = () => {
  return (
    <nav className="h-16 flex justify-between items-center px-3">
      <SidebarTrigger className="size-8" />
    </nav>
  );
};

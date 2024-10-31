import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// redux
import { logout } from "@/redux/slices/authSlice";

// context
import { useAuth } from "@/contexts/user-context";

// components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// icons
import {
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  CircleUserRound,
} from "lucide-react";

const Header = () => (
  <SidebarHeader className="group-data-[collapsible=icon]:hidden">
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild className="text-xl font-bold">
          <a href="/">MERN Auth</a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
);

const Content = () => (
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Content</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/">
                <LayoutDashboard />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
);

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (logout.fulfilled.match(res)) return navigate("/login");
  };

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-between cursor-pointer gap-3">
                <Avatar className="rounded-md size-8">
                  <AvatarImage src={user?.photoURL} />
                  <AvatarFallback>
                    <CircleUserRound />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden">
                  <span className="text-sm">
                    {user ? (
                      user.displayName
                    ) : (
                      <Skeleton className="h-3 w-[80px]" />
                    )}
                  </span>
                  <small>
                    {user ? user.email : <Skeleton className="h-3 w-[120px]" />}
                  </small>
                </div>
                <ChevronsUpDown className="ml-auto size-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                <LogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out, and need to log in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarFooter>
  );
};

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <Header />
      <SidebarSeparator />
      <Content />
      <Footer />
    </Sidebar>
  );
};

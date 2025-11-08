import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "..";
import { useAuth } from "@/hooks";
import { Home, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { accessToken, refreshToken, logout } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const isTasks = location.pathname === "/tasks";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!accessToken && !refreshToken) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary via-40% via-background to-background">
      {/* Top Navbar */}
      <nav
        className={cn(
          "h-fit flex justify-between max-sm:items-center p-2 sm:p-4 max-sm:bg-tertiary/60 sm:bg-linear-to-tr via-60% via-transparent from-transparent to-secondary/60 sticky top-0 z-50",
          isScrolled
            ? "h-fit bg-tertiary/80 sm:bg-linear-to-tr via-60% via-transparent from-transparent to-secondary/80 transition-all duration-150"
            : "sm:h-32"
        )}
      >
        <div className="h-fit flex flex-col sm:flex-row gap-0 sm:gap-6">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2 text-xs sm:text-sm",
              isDashboard
                ? "text-background font-medium sm:underline underline-offset-8"
                : "text-white/50 sm:hover:underline underline-offset-8"
            )}
          >
            <Home className="size-3 sm:size-4" /> Dashboard
          </Link>
          <Link
            to="/tasks"
            className={cn(
              "flex items-center gap-2 text-xs sm:text-sm",
              isTasks
                ? "text-background font-medium sm:underline underline-offset-8"
                : "text-white/50 sm:hover:underline underline-offset-8"
            )}
          >
            <List className="size-3 sm:size-4" /> My Tasks
          </Link>
        </div>
        <Button
          onClick={logout}
          variant="destructive"
          size="sm"
          className="px-2 sm:px-3 h-6 sm:h-8 text-xs sm:text-sm"
        >
          Logout
        </Button>
      </nav>
      <Outlet />
    </div>
  );
}

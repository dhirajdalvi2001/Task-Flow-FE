import { getCookie } from "@/lib/cookies";
import { cn } from "@/lib/utils";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { Typography } from "..";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  const [scaleContainer, setScaleContainer] = useState(false);

  const location = useLocation();
  const isLoginPage = location.pathname === "/auth/login";

  //   Variables
  const year = new Date().getFullYear();
  const linkText = isLoginPage ? "Sign up" : "Login";
  const linkTo = isLoginPage ? "/auth/signup" : "/auth/login";
  const helperText = isLoginPage
    ? "Don't have an account?"
    : "Already have an account?";

  useEffect(() => {
    setScaleContainer(true);
  }, [location.pathname]);

  useEffect(() => {
    if (scaleContainer) {
      setTimeout(() => {
        setScaleContainer(false);
      }, 250);
    }
  }, [scaleContainer]);

  if (accessToken || refreshToken) {
    return <Navigate to="/" />;
  }
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center bg-linear-to-br from-primary to-background"
      )}
    >
      <div
        className={cn(
          "w-full min-h-[340px] max-w-md bg-linear-to-br from-primary/30 via-80% via-transparent to-background/60 border-2 border-background/50 p-4 rounded-lg sm:rounded-3xl flex flex-col justify-center gap-4 transition-all duration-500",
          scaleContainer && "scale-[104%]"
        )}
      >
        <Typography variant="h3" className="text-center text-background">
          Task Flow
        </Typography>
        <Outlet />

        <Typography variant="small" className="text-center text-background">
          {helperText}{" "}
          <Link
            to={linkTo}
            className="text-secondary hover:text-primary underline transition-all duration-150 font-medium"
          >
            {linkText}
          </Link>
        </Typography>
      </div>
      <div className="fixed bottom-0 left-0 w-full text-center flex flex-col gap-0 cursor-default">
        <Typography variant="small">
          Copyright ©{year}{" "}
          <span className="text-tertiary font-medium">Task Flow</span>
        </Typography>
        <Typography variant="tiny">
          Created by{" "}
          <a
            href="https://github.com/dhirajdalvi2001"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary underline transition-all duration-150 font-medium"
          >
            Dhiraj Dalvi
          </a>
        </Typography>
      </div>
    </div>
  );
}

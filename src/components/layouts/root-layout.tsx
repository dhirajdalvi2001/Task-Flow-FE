import { getCookie } from "@/lib/cookies";
import { Navigate, Outlet } from "react-router-dom";

export default function RootLayout() {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  if (!accessToken && !refreshToken) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

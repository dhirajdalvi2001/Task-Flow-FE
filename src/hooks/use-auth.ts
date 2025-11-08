import { deleteCookie, getCookie } from '@/lib/cookies';
import { useSetAtom } from 'jotai/react';
import { userDetailsAtom } from '@/lib/global';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export default function useAuth() {
  const navigate = useNavigate();
  const setUserDetails = useSetAtom(userDetailsAtom);

  // Read cookies on every render to check authentication status
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  // Memoize logout function to prevent recreation on every render
  const logout = useCallback(() => {
    setUserDetails(null);
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    navigate("/auth/login");
  }, [setUserDetails, navigate]);

  return { accessToken, refreshToken, logout };
}   
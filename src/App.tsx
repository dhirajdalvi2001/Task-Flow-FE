import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout, AuthLayout } from "./components";
import { Login, SignUp } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

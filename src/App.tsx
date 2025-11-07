import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout, AuthLayout } from "./components";
import { Dashboard, Login, MyTasks, SignUp } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "tasks",
        element: <MyTasks />,
      },
    ],
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

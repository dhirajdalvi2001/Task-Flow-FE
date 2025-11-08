import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 10, // 10 minutes - cache time (increased from 5 minutes)
    },
  },
});

const container = document.getElementById("root")!;

// 👇 only createRoot once
let root = (container as any)._reactRootContainer || null;

if (!root) {
  root = createRoot(container);
  (container as any)._reactRootContainer = root;
}

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
  </QueryClientProvider>
);
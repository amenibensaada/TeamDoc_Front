import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { queryClient } from "./config/client";
import routers from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(routers);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </QueryClientProvider>
  );
}

export default App;

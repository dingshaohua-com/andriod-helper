import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "@/router";
import "./index.less";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

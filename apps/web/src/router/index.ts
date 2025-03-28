import { createHashRouter } from "react-router";
import Root from "@/pages/root";
import { lazy } from "react";
// import Home from "@/pages/home";

const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        // path: "home",
        // Component: Home,
        Component: lazy(() => import("@/pages/home")),
      },
      {
        path: "/decompiler",
        Component: lazy(() => import("@/pages/decompiler")),
      }
    ],
  },
]);

export default router;

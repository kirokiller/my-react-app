import Home from "./pages/Home";
import About from "./pages/About";

export const routes = [
  {
    path: "/about/:id",
    component: About
  },
  {
    path: "/",
    component: Home
  },
];
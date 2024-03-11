import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/callback",
    element: <div>Callback</div>,
  },
]);

export default router;

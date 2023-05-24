import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import router from "../routes";
import "../css/style.css";

function App() {
  return <RouterProvider router={router()} />;
}

export default App;

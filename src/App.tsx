import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/layouts/Root";

import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";

import "./App.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "contact/add", element: <AddContact /> },
      { path: "contact/:contactId/edit", element: <EditContact /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

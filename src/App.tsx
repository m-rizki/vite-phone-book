import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/layouts/Root";

import Home from "./pages/Home";
import NewContact from "./pages/NewContact";
import EditContact from "./pages/EditContact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "contact", element: <NewContact /> },
      { path: "contact/:contactId", element: <EditContact /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

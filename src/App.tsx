import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/layouts/Root";

import Home from "./pages/Home";

import "./App.css";
import ContactForm from "./pages/ContactForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "contact", element: <ContactForm /> },
      { path: "contact/:contactId", element: <ContactForm /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

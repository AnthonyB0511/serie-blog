import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/Homepage/Homepage";
import Admin from "./pages/Admin/Admin";
import Favoris from "./pages/Favoris/Favoris";
import Details from "./pages/Details/Details";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />,

            },
            {
                path: "/admin",
                element: <Admin />
            },
            {
                path: "/favoris",
                element: <Favoris />
            },
            {
                path: "/details/:id",
                element: <Details />
            }
        ]
    }
]);
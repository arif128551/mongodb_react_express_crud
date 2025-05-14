import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Profile from "./pages/Profile.jsx";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App></App>,
	},
	{
		path: "/users/:id",
		loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`),
		element: <Profile></Profile>,
	},
]);
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);

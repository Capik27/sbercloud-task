import { Routes, Route, Navigate, createHashRouter } from "react-router-dom";
import { Main } from "../pages/main/Main";
import { Create } from "../pages/create/Create";
import { MAIN_ROUTE, CREATE_ROUTE } from "./paths";

// const router = createHashRouter([
// 	{
// 		path: "/",
// 		element: <Main />,

// 		children: [
// 			{
// 				path: "team",
// 				element: <Team />,
// 				loader: teamLoader,
// 			},
// 		],
// 	},
// ]);

export function AppRouter() {
	return (
		<Routes>
			<Route path={MAIN_ROUTE} element={<Main />} />
			<Route path={MAIN_ROUTE + CREATE_ROUTE} element={<Create />} />
		</Routes>
	);
}

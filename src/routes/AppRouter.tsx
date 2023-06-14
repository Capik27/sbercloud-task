import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "../pages/main/Main";
import { Create } from "../pages/create/Create";
import { MAIN_ROUTE, CREATE_ROUTE } from "./paths";

export function AppRouter() {
	return (
		<Routes>
			<Route path={MAIN_ROUTE} element={<Main />} />
			<Route path={CREATE_ROUTE} element={<Create />} />
		</Routes>
	);
}

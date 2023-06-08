import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { ERROR_ROUTE } from "./paths";

export function AppRouter() {
	return (
		<Routes>
			{routes.map(({ path, Component }) => (
				<Route key={path} path={path} element={Component} />
			))}
			<Route
				path={"*"}
				element={<Navigate to={ERROR_ROUTE} replace={true} />}
			/>
		</Routes>
	);
}

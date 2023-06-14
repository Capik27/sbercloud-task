import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "pages/main/Main";
import { Create } from "pages/create/Create";
import { Error } from "pages/Error";
import { MAIN_ROUTE, CREATE_ROUTE, ERROR_ROUTE } from "./paths";

export function AppRouter() {
	return (
		<Routes>
			<Route path={MAIN_ROUTE} element={<Main />} />
			<Route path={CREATE_ROUTE} element={<Create />} />
			<Route path={ERROR_ROUTE} element={<Error />} />
			<Route
				path={"*"}
				element={<Navigate to={ERROR_ROUTE} replace={true} />}
			/>
		</Routes>
	);
}

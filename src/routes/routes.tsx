import { Main } from "../pages/main/Main";
import { Create } from "../pages/Create";
import { Error } from "../pages/Error";
import { MAIN_ROUTE, CREATE_ROUTE, ERROR_ROUTE } from "./paths";

export const routes = [
	{
		path: MAIN_ROUTE,
		Component: <Main />,
	},
	{
		path: CREATE_ROUTE,
		Component: <Create />,
	},
	{
		path: ERROR_ROUTE,
		Component: <Error />,
	},
];

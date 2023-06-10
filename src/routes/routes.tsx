import { Outlet, createBrowserRouter } from "react-router-dom";
import { Main } from "../pages/main/Main";
import { Create } from "../pages/create/Create";
import { Step1 } from "../pages/create/Step1";
import { Step2 } from "../pages/create/Step2";
import { Step3 } from "../pages/create/Step3";

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<div>
				<Outlet />
			</div>
		),
		children: [
			{
				path: "main",
				element: <Main />,
			},
			{
				path: "create",
				element: <Create />,
				children: [
					{
						path: "1",
						element: <Step1 />,
					},
					{
						path: "2",
						element: <Step2 />,
					},
					{
						path: "3",
						element: <Step3 />,
					},
				],
			},
		],
	},
]);

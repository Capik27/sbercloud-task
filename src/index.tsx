import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

import { AppRouter } from "./routes/AppRouter";
import { store } from "./store/index";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	</Provider>
);

reportWebVitals();

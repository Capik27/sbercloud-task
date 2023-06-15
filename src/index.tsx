import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
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
		<HashRouter>
			<AppRouter />
		</HashRouter>
	</Provider>
);

reportWebVitals();

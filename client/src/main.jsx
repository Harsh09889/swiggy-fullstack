import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Router>
		<ChakraProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ChakraProvider>
	</Router>
);

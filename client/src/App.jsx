import AllRoutes from "./Components/AllRoutes";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoginSignup from "./Components/Login-Signup/LoginSignup";

function App() {
	const isAuth = useSelector((state) => state.auth.auth.isAuth);
	const [openLoginSignup, setOpenLoginSignup] = useState(false);
	const [loadlogin, setLoadLogin] = useState(true);
	return (
		<>
			<LoginSignup
				open={openLoginSignup}
				loadlogin={loadlogin}
			/>

			<AllRoutes
				setOpenLoginSignup={setOpenLoginSignup}
				setLoadLogin={setLoadLogin}
			/>
		</>
	);
}

export default App;

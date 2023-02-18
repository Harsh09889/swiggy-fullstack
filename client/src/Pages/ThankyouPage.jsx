import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function ThankyouPage({ setOpenLoginSignup, setLoadLogin }) {
	return (
		<>
			<Navbar
				setOpenLoginSignup={setOpenLoginSignup}
				setLoadLogin={setLoadLogin}
			/>
			<img
				style={{ margin: "auto" }}
				src='https://mir-s3-cdn-cf.behance.net/project_modules/1400/761f1b117480989.6076bf3919f1e.gif'
				alt='Thank You'
			/>
			<Footer />
		</>
	);
}
export default ThankyouPage;

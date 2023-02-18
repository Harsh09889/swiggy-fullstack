import React, { useEffect, useRef } from "react";
import {
	Box,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Button,
	Text,
	DrawerCloseButton,
	Image,
	Input,
	useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	login,
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	register,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
} from "../../Redux/Auth/AuthActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addToCart, updateCart } from "../../Redux/Cart/CartActions";
function LoginSignup({ open, loadlogin }) {
	const [switchLogin, setSwitchLogin] = useState(loadlogin);
	const [loginState, setLoginState] = useState({
		phn: 0,
		password: "",
	});

	const [signupState, setSignupState] = useState({
		phn: 0,
		username: "",
		name: "",
		password: "",
	});

	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const auth = useSelector((state) => state.auth.auth.isAuth);
	const error = useSelector((state) => state.auth.auth.error);
	const registerLoading = useSelector(
		(state) => state.auth.register.registerLoading
	);
	const registerStatus = useSelector(
		(state) => state.auth.register.registerStatus
	);
	const registerError = useSelector(
		(state) => state.auth.register.registerError
	);
	const firstRender = useRef(0);
	const dispatch = useDispatch();
	const toast = useToast();
	const [trackSignup, setTrackSignup] = useState(0);

	async function handleLogin() {
		if (!loginState.phn || !loginState.password) {
			toast({
				title: "Please fill all the details...",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top",
			});
		} else if (loginState.phn.length !== 10) {
			toast({
				title: "Enter a valid Phone number",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top",
			});
		} else {
			// dispatch(login({ ...loginState, phn: +loginState.phn }));
			try {
				const { data } = await axios.post(
					"http://localhost:8080/users/login",
					loginState,
					{
						withCredentials: true,
					}
				);

				dispatch({
					type: LOGIN_SUCCESS,
					payload: data,
				});

				try {
					const { data: cart } = await axios.get(
						`http://localhost:8080/cart/${data.username}`,
						{ withCredentials: true }
					);

					dispatch(updateCart(cart));
				} catch (error) {
					console.log(error.message);
				}
			} catch (error) {
				toast({
					title: "User is not Registered",
					status: "error",
					duration: 2000,
					isClosable: true,
					position: "top",
				});
				dispatch({
					type: LOGIN_FAILED,
					payload: { error: error.message },
				});
			}
		}
	}

	async function handleSignup() {
		console.log(signupState.phn.length);
		if (
			!signupState.name ||
			!signupState.phn ||
			!signupState.username ||
			!signupState.password
		) {
			toast({
				title: "Please fill all the details...",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top",
			});
		} else if (signupState.phn.length !== 10) {
			toast({
				title: "Enter a valid Phone number",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top",
			});
		} else {
			// const registerDetails = { ...signupState, phn: +signupState.phn };
			// console.log(registerDetails);
			// dispatch(register(registerDetails));

			try {
				dispatch({ type: REGISTER_REQUEST });
				const { data } = await axios.post(
					"http://localhost:8080/users/register",
					signupState
				);
				console.log(data);
				dispatch({
					type: REGISTER_SUCCESS,
					payload: { registerStatus: 200 },
				});
			} catch (error) {
				console.log(error.response.data);
				dispatch({
					type: REGISTER_FAILED,
					payload: {
						registerStatus: error.response.status,
						error: error.response.data,
					},
				});
			}
		}
		setTrackSignup(trackSignup + 1);
	}

	useEffect(() => {
		if (firstRender.current > 1) {
			console.log(firstRender.current);
			if (auth) {
				toast({
					title: "Login successful!!",
					status: "success",
					duration: 2000,
					isClosable: true,
					position: "top",
				});
				onClose();
				setLoginState({
					phn: 0,
					password: "",
				});
				navigate("/");
			} else {
				error &&
					toast({
						title: error,
						status: "error",
						duration: 2000,
						isClosable: true,
						position: "top",
					});
			}
		}

		firstRender.current++;
	}, [auth, error]);

	useEffect(() => {
		if (firstRender.current > 1) {
			console.log("inside open", firstRender.current);
			if (isOpen) onClose();
			else onOpen();
		}
		firstRender.current++;
	}, [open]);

	useEffect(() => {
		if (
			registerStatus === 201 &&
			registerLoading === false &&
			registerError === false
		) {
			toast({
				title: "Register successful!!",
				status: "success",
				duration: 2000,
				isClosable: true,
				position: "top",
			});

			dispatch(
				login({ phn: +signupState.phn, password: signupState.password })
			);
			setSignupState({
				phn: 0,
				username: "",
				name: "",
				password: "",
			});
		} else if (
			registerStatus !== 201 &&
			registerLoading === false &&
			registerError !== false
		) {
			toast({
				title: registerError,
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top",
			});
		}
	}, [registerLoading, registerError, registerStatus]);

	//signup switch
	const handlespanSignUp = () => {
		setSwitchLogin(false);
	};

	const handlespanClick = () => {
		setSwitchLogin(true);
	};
	return (
		<Box>
			<Drawer
				onClose={onClose}
				isOpen={isOpen}
				size={"md"}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />

					<DrawerHeader></DrawerHeader>

					<DrawerBody>
						{switchLogin ? (
							<>
								<Box
									display={"flex"}
									justifyContent={"space-between"}
									w={"80%"}
									mt={"5%"}>
									<Box>
										<Text
											color={"black"}
											fontSize={"33px"}>
											Login
										</Text>
										<Text>
											or{" "}
											<span
												onClick={handlespanSignUp}
												style={{
													color: "#fc8019",
													cursor: "pointer",
													fontSize: "14px",
												}}>
												create an account
											</span>
										</Text>
									</Box>
									<Box w={"28%"}>
										<Image
											src={
												"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
											}></Image>
									</Box>
								</Box>
								<Box w={"72%"}>
									<Input
										placeholder={"Phone number"}
										padding={"34px"}
										borderRadius={"0px"}
										w={"100%"}
										maxLength={10}
										type={"text"}
										value={loginState.phn || ""}
										name='phn'
										onChange={(e) =>
											setLoginState((p) => ({
												...p,
												[e.target.name]: e.target.value.replace(/[^0-9]/g, ""),
											}))
										}
										mt={"40px"}
									/>
									<Input
										placeholder={"Password"}
										padding={"34px"}
										name='password'
										onChange={(e) =>
											setLoginState((p) => ({
												...p,
												[e.target.name]: e.target.value,
											}))
										}
										value={loginState.password}
										borderRadius={"0px"}
										w={"100%"}
										type={"password"}
										mb={"24px"}
									/>
									<Button
										fontSize={"14px"}
										colorScheme={"#fc8019"}
										fontWeight={"bold"}
										color={"white"}
										borderRadius={"0px"}
										onClick={handleLogin}
										w={"100%"}
										bg={"#fc8019"}
										padding={"27px"}>
										LOGIN
									</Button>
									<Text
										mt={"5px"}
										fontSize={"12px"}>
										By clicking on Login, I accept the Terms & Conditions &
										Privacy Policy
									</Text>
								</Box>
							</>
						) : (
							//SIGNUP
							<>
								<Box
									display={"flex"}
									justifyContent={"space-between"}
									w={"80%"}
									mt={"5%"}>
									<Box>
										<Text
											color={"black"}
											fontSize={"33px"}>
											Sign up
										</Text>
										<Text>
											<span
												onClick={handlespanClick}
												style={{
													color: "#fc8019",
													cursor: "pointer",
													fontSize: "14px",
												}}>
												login to your account
											</span>
										</Text>
									</Box>
									<Box w={"28%"}>
										<Image
											src={
												"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
											}></Image>
									</Box>
								</Box>
								<Box w={"72%"}>
									<Input
										placeholder={"Phone number"}
										padding={"34px"}
										borderRadius={"0px"}
										w={"100%"}
										name='phn'
										maxLength={10}
										value={signupState.phn || ""}
										onChange={(e) =>
											setSignupState((p) => ({
												...p,
												[e.target.name]: e.target.value,
											}))
										}
										type={"text"}
										mt={"40px"}
									/>

									<Input
										placeholder={"User_Name"}
										padding={"34px"}
										borderRadius={"0px"}
										w={"100%"}
										type={"text"}
										name='username'
										value={signupState.username}
										onChange={(e) =>
											setSignupState((p) => ({
												...p,
												[e.target.name]: e.target.value,
											}))
										}
									/>
									<Input
										placeholder={"Name"}
										padding={"34px"}
										borderRadius={"0px"}
										w={"100%"}
										type={"text"}
										name='name'
										value={signupState.name}
										onChange={(e) =>
											setSignupState((p) => ({
												...p,
												[e.target.name]: e.target.value,
											}))
										}
									/>
									<Input
										placeholder={"Password"}
										padding={"34px"}
										borderRadius={"0px"}
										w={"100%"}
										type={"password"}
										name='password'
										value={signupState.password}
										onChange={(e) =>
											setSignupState((p) => ({
												...p,
												[e.target.name]: e.target.value,
											}))
										}
									/>
									<Text
										color={"#5D8ED5"}
										mt={"25px"}
										mb={"16px"}
										fontSize={"16px"}>
										Have a referral code?
									</Text>

									<Button
										colorScheme={"#fc8019"}
										fontSize={"14px"}
										fontWeight={"bold"}
										color={"white"}
										borderRadius={"0px"}
										w={"100%"}
										bg={"#fc8019"}
										padding={"27px"}
										onClick={handleSignup}>
										CONTINUE
									</Button>
									<Text
										mt={"5px"}
										fontSize={"12px"}>
										By creating an account, I accept the Terms & Conditions &
										Privacy Policy
									</Text>
								</Box>
							</>
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Box>
	);
}
export default LoginSignup;

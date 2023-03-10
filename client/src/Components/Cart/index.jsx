import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link, useLocation } from "react-router-dom";

function index({ ischeckout }) {
	let isAuth = useSelector((state) => state.auth.auth.isAuth);
	let curUser = useSelector((state) => state.auth.currentUser);
	const cart = useSelector((state) => state.cart);
	const location = useLocation();
	const isInCheckout = location.pathname.split("/")[1] === "checkout";

	let currentCart = null;
	if (isAuth) {
		[currentCart] = cart.filter((elem) => elem.username === curUser.username);
	}

	// console.log(isAuth);

	const cartItems = currentCart ? currentCart.cartItems : [];

	return isAuth ? (
		cartItems.length > 0 ? (
			<>
				<div className='p-4 border '>
					<h1 className='text-3xl font-bold'> Cart </h1>
					<p className='text-sm text-gray-500'>{cartItems.length} Items</p>
					{cartItems.length > 0 &&
						cartItems?.map((elem) => (
							<CartItem
								key={elem.dishId}
								dish={elem}
							/>
						))}
					<h1 className='text-lg font-bold flex justify-between'>
						<p>Subtotal</p>
						<p className='text-base'>
							₹{" "}
							{(cartItems.length > 0 &&
								cartItems.reduce(
									(total, curr) => total + +curr.totalPrice,
									0
								)) ||
								0}
						</p>
					</h1>
					{!isInCheckout && (
						<Link
							to={"/checkout"}
							className='bg-green-500 text-white w-full block text-center py-3
				 mt-4'>
							{" "}
							Checkout
						</Link>
					)}
				</div>
			</>
		) : (
			<div className='p-4'>
				<h1 className='text-center text-2xl font-bold mb-8 text-slate-400'>
					Empty Cart
				</h1>
				<img
					src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_480/Cart_empty_-_menu_2x_ejjkf2'
					alt='empty cart'
				/>
			</div>
		)
	) : (
		<div className='p-4'>
			<h1 className='text-center text-2xl font-bold mb-8 text-slate-400'>
				Login To see the Cart
			</h1>
			<img
				src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_480/Cart_empty_-_menu_2x_ejjkf2'
				alt='empty cart'
			/>
		</div>
	);
}

export default index;

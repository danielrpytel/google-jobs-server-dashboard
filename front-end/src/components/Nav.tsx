import React from "react";
import { Link } from "react-router-dom";

function Nav() {
	return (
		<nav className=" bg-slate-800 border-b border-slate-700 shadow-lg">
			<div className="flex justify-center items-center w-full h-20">
				<Link
					className="text-xl mx-5 text-gray-300 font-bold hover:text-gray-500"
					to="/all"
				>
					Full List
				</Link>
				<Link
					className="text-xl mx-5 text-gray-300 font-bold hover:text-gray-500"
					to="/boosted"
				>
					Boosted
				</Link>
				<Link
					className="text-xl mx-5 text-gray-300 font-bold hover:text-gray-500"
					to="/flagged"
				>
					Flagged
				</Link>
				<Link
					className="text-xl mx-5 text-gray-300 font-bold hover:text-gray-500"
					to="/applied"
				>
					Applied
				</Link>
			</div>
		</nav>
	);
}

export default Nav;

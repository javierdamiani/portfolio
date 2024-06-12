import Link from "next/link";
import React from "react";

function Logo() {
	return (
		<div className="w-12 sm:w-14 md:w-20">
			<Link href="/">
				<img
					src="/favicon.ico"
					alt="Javier Damiani's logo"
				/>
			</Link>
		</div>
	);
}

export default Logo;

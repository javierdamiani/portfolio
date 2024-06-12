import React from "react";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";

function Header() {
	return (
		<header className="sticky top-0 z-[200] flex w-full flex-wrap items-center justify-between border-b border-gray-100 bg-background p-[2em] font-sans font-bold uppercase text-text-primary backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary">
			<Logo />
			<Nav />
		</header>
	);
}

export default Header;

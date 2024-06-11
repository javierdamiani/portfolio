"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

import Link from "next/link";

const Links = () => {
	return (
		<>
			<Link href="/about">About</Link>
			<Link href="/projects">Projects</Link>
			<Link href="/contact">Contact</Link>
		</>
	);
};

function Nav() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleNavBar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<nav className="flex w-1/3 justify-end">
				<div className="hidden w-full md:flex justify-between">
					<Links />
				</div>
				<div className="md:hidden">
					<button onClick={toggleNavBar}>{isOpen ? <X /> : <Menu />}</button>
				</div>
			</nav>
			{isOpen && (
				<div className="flex basis-full flex-col items-center">
					<Links />
				</div>
			)}
		</>
	);
}

export default Nav;

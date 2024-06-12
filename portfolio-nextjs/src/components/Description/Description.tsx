"use client";
import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Button } from "@mui/material";
import Social from "../Social/Social";

function Description() {
	const [text] = useTypewriter({
		words: [
			"Fullstack Developer",
			"Frontend Developer",
			"Backend Developer",
			"Business Administrator",
		],
		loop: true,
		typeSpeed: 120,
	});

	return (
		<div>
			<div className=" flex flex-col gap-4 px-3 py-4">
				<p className="text-black font-thin text-l">I'm glad you're here</p>
				<p className="text-black text-xl">Hi 👋 I'm Javier Damiani </p>
				<p className="text-black text-2xl font-bold">
					I'm a <span className="text-green-600">{text}</span>
					<span>
						<Cursor cursorColor="#000" />
					</span>
				</p>

				<p>
					I am a skilled Fullstack Web Developer with expertise in JavaScript,
					React, HTML, CSS, Node.js, MongoDB, Webpack, and Git. My background in
					Business Administration and a master's degree from San Martín de
					Porres University enable me to integrate technical skills with
					business acumen.
				</p>
				<Button
					variant="contained"
					className="h-12 w-48"
					color="success"
				>
					Download my CV
				</Button>
			</div>
			<Social />
		</div>
	);
}

export default Description;

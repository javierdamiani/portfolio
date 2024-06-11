import React from "react";
import Lego from "@/icons/Lego";
import JavaScriptLogo from "@/icons/JavaScriptLogo";
import TypescriptLogo from "@/icons/TypescriptLogo";
import ReactLogo from "@/icons/ReactLogo";
import MongoDBLogo from "@/icons/MongoDBLogo";
import NodeJSLogo from "@/icons/NodeJSLogo";
import WebpackLogo from "@/icons/WebpackLogo";
import GitLogo from "@/icons/GitLogo";
import HtmlLogo from "@/icons/HtmlLogo";
import CssLogo from "@/icons/CssLogo";

function About() {
	return (
		<div className="container flex flex-col sm:flex-row-reverse gap-3 p-4 sm:p-6">
			<img
				src="/images/hello.png"
				alt="A memoji of me saying hello"
			/>
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-1">
					<Lego /> <span className="text-lg">About me</span>
				</div>
				<h3 className="text-2xl font-bold">Meet Javier Damiani</h3>
				<p className="text-sm">
					I'm a Fullstack Web Developer based in Lima, Perú 🇵🇪. Proficient in
					the technologies shown below. Completed coursework for a master's
					degree in Business Administration. When not coding, I enjoy Football
					Manager and Call of Duty Mobile. Cat lover with Igor by my side.
					Unwinding with mate and music enthusiast. Let’s chat!
					javierdamiani74@gmail.com or social media.
				</p>
				<div className="flex flex-wrap justify-between mt-2">
					<HtmlLogo />
					<CssLogo />
					<JavaScriptLogo />
					<TypescriptLogo />
					<ReactLogo />
					<MongoDBLogo />
					<NodeJSLogo />
					<WebpackLogo />
					<GitLogo />
				</div>
			</div>
		</div>
	);
}

export default About;

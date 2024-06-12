import React from "react";
import LinkedInLogo from "@/icons/LinkedInLogo";
import GithubLogo from "@/icons/GithubLogo";

function Social() {
	return (
		<div className="flex flex-col gap-3">
			<h4 className="ml-3 justify-center items-center text-md">
				You can find me on the following social media
			</h4>
			<div className="flex flex-row gap-5 items-center ml-2 justify-center sm:justify-start">
				<a
					href="https://www.linkedin.com/in/javierluisdamianiarellano/"
					target="_blank"
				>
					<LinkedInLogo />
				</a>
				<a
					href="https://github.com/javierdamiani"
					target="_blank"
				>
					<GithubLogo />
				</a>
			</div>
		</div>
	);
}

export default Social;

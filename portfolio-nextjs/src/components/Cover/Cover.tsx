import React from "react";
import Description from "../Description/Description";

function Cover() {
	return (
		<div className="container mx-auto w-screen sm:w-full sm:flex-row sm:items-center sm:justify-center flex flex-col justify-between">
			<img
				className="drop-shadow-custom mask-image-gradient"
				src="/images/me.png"
				alt="A picture of me"
			/>
			<Description />
		</div>
	);
}

export default Cover;

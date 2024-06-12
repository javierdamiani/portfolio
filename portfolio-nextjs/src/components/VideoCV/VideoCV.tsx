import React from "react";

const VideoCV = () => {
	return (
		<div className="w-full flex flex-col items-center">
			<h3>This is me</h3>
			<div className="relative overflow-hidden pb-[40%] mx-auto w-full max-w-[800px]">
				<iframe
					src="https://player.vimeo.com/video/957347553?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
					allow="fullscreen; picture-in-picture; clipboard-write"
					className="absolute top-0 left-0 w-full h-full"
					title="Video_CV"
				></iframe>
			</div>
		</div>
	);
};

export default VideoCV;

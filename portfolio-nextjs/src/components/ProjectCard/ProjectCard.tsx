import React from "react";
import Carousel from "../Carousel/Carousel";

interface ProjectCardProps {
	title: string;
	description: string;
	img: string;
	img1: string;
	img2: string;
	img3: string;
	img4: string;
	img5: string;
}

function ProjectCard({
	title,
	description,
	img,
	img1,
	img2,
	img3,
	img4,
	img5,
}: ProjectCardProps) {
	console.log(img1, "card");

	return (
		<div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
			<a
				href="#"
				className=""
			>
				{/* <img
					src={img}
					alt=""
					className="w-full rounded-t-lg "
				/> */}
				<div className="w-full rounded-t-lg">
					<Carousel
						img1={img1}
						img2={img2}
						img3={img3}
						img4={img4}
						img5={img5}
					/>
				</div>
				<div className="flex flex-col justify-between p-4 leading-normal">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{title}
					</h5>
					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{description}
					</p>
				</div>
			</a>
		</div>
	);
}

export default ProjectCard;
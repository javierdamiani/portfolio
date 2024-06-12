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
	return (
		<div className="relative flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
			{/* Carrusel de imágenes */}
			<div className="h-full rounded-t-lg md:rounded-t-none">
				<Carousel
					img1={img1}
					img2={img2}
					img3={img3}
					img4={img4}
					img5={img5}
				/>
			</div>

			{/* Contenido de texto */}
			<div className="flex flex-col justify-between p-4 leading-normal w-full">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{title}
				</h5>
				<p className="mb-3 font-normal text-base md:text-sm text-gray-700 dark:text-gray-400">
					{description}
				</p>
			</div>
		</div>
	);
}

export default ProjectCard;

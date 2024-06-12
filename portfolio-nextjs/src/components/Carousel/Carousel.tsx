"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface CarouselProps {
	img1: string;
	img2: string;
	img3: string;
	img4: string;
	img5: string;
}

const Carousel: React.FC<CarouselProps> = ({
	img1,
	img2,
	img3,
	img4,
	img5,
}) => {
	const images = [img1, img2, img3, img4, img5];
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === images.length - 1 ? 0 : prevIndex + 1
			);
		}, 9000);

		return () => clearInterval(interval);
	}, [images.length]);

	const handlePrevClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
	};

	const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
	};

	const handleIndicatorClick = (
		event: React.MouseEvent<HTMLButtonElement>,
		index: number
	) => {
		event.preventDefault();
		setCurrentIndex(index);
	};

	return (
		<div>
			<div
				id="default-carousel"
				className="relative w-full"
			>
				<div className="relative h-56 md:h-96 top-0 mt-0">
					{images.map((img, index) => (
						<div
							key={index}
							className={`duration-700 ease-in-out absolute inset-0 ${
								index === currentIndex ? "block" : "hidden"
							}`}
							data-carousel-item
						>
							<Image
								src={img}
								className="block w-full h-full object-cover"
								alt=""
								layout="fill"
							/>
						</div>
					))}
				</div>
				<div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
					{images.map((_, index) => (
						<button
							key={index}
							type="button"
							className={`w-3 h-3 rounded-full ${
								index === currentIndex ? "bg-blue-600" : "bg-white"
							}`}
							aria-current={index === currentIndex ? "true" : "false"}
							aria-label={`Slide ${index + 1}`}
							onClick={(event) => handleIndicatorClick(event, index)}
							data-carousel-slide-to={index}
						></button>
					))}
				</div>
				<button
					type="button"
					className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
					onClick={handlePrevClick}
					data-carousel-prev
				>
					<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
						<svg
							className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 1 1 5l4 4"
							/>
						</svg>
						<span className="sr-only">Previous</span>
					</span>
				</button>
				<button
					type="button"
					className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
					onClick={handleNextClick}
					data-carousel-next
				>
					<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
						<svg
							className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 9 4-4-4-4"
							/>
						</svg>
						<span className="sr-only">Next</span>
					</span>
				</button>
			</div>
		</div>
	);
};

export default Carousel;

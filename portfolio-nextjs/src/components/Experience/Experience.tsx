import React from "react";

function Experience() {
	return (
		<div className="display flex flex-col px-8 py-10 gap-4  max-w-[1024px]">
			<h2 className="font-bold">Experience</h2>
			<ol className="relative border-s border-gray-200 dark:border-gray-700">
				<li className="mb-10 ms-4">
					<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						February 2024 - Present
					</time>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						[Academic] FullStack Developer - NoCountry
					</h3>
					<p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
						I participated in a work simulation at NoCountry, where I
						collaborated in a multidisciplinary team to develop a comic
						eCommerce project. I learned to work with technologies like React,
						Node.js, MongoDB, and Cloudinary, contributing to the design and
						development of the site. Additionally, I gained skills in agile
						methodologies, effective communication, and teamwork in a practical
						learning environment.
					</p>
					{/* <a
						href="#"
						className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
					>
						Learn more{" "}
						<svg
							className="w-3 h-3 ms-2 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</a> */}
				</li>
				<li className="mb-10 ms-4">
					<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						Nov 2023 - Jan 2024
					</time>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						[Internship] Frontend Developer - BeActtive
					</h3>
					<p className="text-base font-normal text-gray-500 dark:text-gray-400">
						During my time at BeActtive, I took on a prominent role as a Web
						Development Intern. My contribution was pivotal in refactoring the
						code using NextJS and Typescript, achieving significant improvements
						in codebase efficiency and readability. Moreover, I led technical
						team 3, where we focused on translating the website using the
						i18next i18n framework. This project allowed me to research and
						select the best technology for efficient translation implementation.
						I actively participated in weekly strategic meetings, contributing
						innovative ideas and strengthening my project management and
						teamwork skills. These experiences have prepared me to take on
						challenging responsibilities in dynamic and fast-growing
						environments, and I am excited to apply these skills to future
						projects.
					</p>
				</li>
				<li className="ms-4">
					<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						Mar 2022 - Aug 2022
					</time>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						General Manager - BioSelva S.A.C.
					</h3>
					<p className="text-base font-normal text-gray-500 dark:text-gray-400">
						During my tenure in the position, I served as responsible for
						billing and overseeing product dispatch in Lima and provinces. I
						maintained constant coordination with suppliers and was in charge of
						personnel, supervising both the logistics and production areas. I
						also handled the renewal of security and operating licenses, as well
						as product traceability. Notably, during this period, we received
						the annual visit and supervision of a major supermarket chain in the
						country, to which we supplied products. Thanks to the efforts made
						during my tenure as manager and main person in charge of the
						production plant, we successfully passed this evaluation,
						demonstrating our commitment to excellence and regulatory
						compliance.
					</p>
				</li>
			</ol>
		</div>
	);
}

export default Experience;

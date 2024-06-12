import React from "react";

function Experience() {
	return (
		<div className="display flex flex-col px-8 py-10 gap-4">
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
						Participé en una simulación laboral en No Country, donde colaboré en
						un equipo multidisciplinario para desarrollar un proyecto de
						eCommerce de cómics. Aprendí a trabajar con tecnologías como React,
						Node.js, MongoDB y Cloudinary, contribuyendo al diseño y desarrollo
						del sitio. Además, adquirí habilidades en metodologías ágiles,
						comunicación efectiva y trabajo en equipo en un entorno de
						aprendizaje práctico.
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
						Durante mi experiencia en BeActtive, asumí un rol destacado como
						Practicante Web Developer. Mi contribución fue clave en la
						refactorización del código utilizando NextJS y Typescript, logrando
						mejoras significativas en la eficiencia y legibilidad del código
						base. Además, lideré el equipo técnico 3, donde nos enfocamos en la
						traducción de la página web utilizando el framework i18next i18n.
						Este proyecto me permitió investigar y seleccionar la mejor
						tecnología para llevar a cabo la traducción de manera eficiente.
						Participé activamente en reuniones estratégicas semanales, donde
						aporté ideas innovadoras y fortalecí mis habilidades en gestión de
						proyectos y trabajo en equipo. Estas experiencias me han preparado
						para asumir responsabilidades desafiantes en entornos dinámicos y de
						rápido crecimiento, y estoy emocionado por aplicar estas habilidades
						en futuros proyectos.
					</p>
				</li>
				<li className="ms-4">
					<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
					<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
						Mar 2022 - Aug 2022
					</time>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						Administrador general - BioSelva S.A.C.
					</h3>
					<p className="text-base font-normal text-gray-500 dark:text-gray-400">
						Durante mi tiempo en el cargo, me desempeñé como responsable de
						facturación y supervisión del despacho de productos en Lima y
						provincias. Mantuve una coordinación constante con los proveedores y
						estuve a cargo del personal, supervisando tanto el área logística
						como productiva. También me encargué de la renovación de licencias
						de seguridad y funcionamiento, así como de la trazabilidad de los
						productos. Destacadamente, durante este periodo, recibimos la visita
						y supervisión anual de una importante cadena de supermercados del
						país, a la cual suministrábamos productos. Gracias a las gestiones
						realizadas durante mi gestión como administrador y encargado
						principal de la planta de producción, aprobamos satisfactoriamente
						esta evaluación, demostrando nuestro compromiso con la excelencia y
						el cumplimiento normativo.
					</p>
				</li>
			</ol>
		</div>
	);
}

export default Experience;

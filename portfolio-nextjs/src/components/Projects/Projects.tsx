import React from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import { project_info } from "@/utils/projects_info";

function Projects() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
			{project_info.slice(0, 3).map((project) => (
				<ProjectCard
					key={project.title}
					title={project.title}
					description={project.description}
					img={project.img}
					img1={project.img1}
					img2={project.img2}
					img3={project.img3}
					img4={project.img4}
					img5={project.img5}
				/>
			))}
		</div>
	);
}

export default Projects;

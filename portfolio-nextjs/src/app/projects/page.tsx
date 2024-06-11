import React from "react";
import { project_info } from "@/utils/projects_info";
import ProjectCard from "@/components/ProjectCard/ProjectCard";

function ProjectsPage() {
	return (
		<div className="container mx-auto flex flex-wrap justify-between gap-y-14">
			{project_info.map((project) => (
				<ProjectCard
					key={project.title}
					title={project.title}
					description={project.description}
					img={project.img}
				/>
			))}
		</div>
	);
}

export default ProjectsPage;

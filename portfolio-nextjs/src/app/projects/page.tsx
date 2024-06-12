import React from "react";
import { project_info } from "@/utils/projects_info";
import ProjectCard from "@/components/ProjectCard/ProjectCard";

function ProjectsPage() {
	return (
		<div className="container mx-auto flex flex-wrap justify-between gap-y-10 my-14">
			{project_info.map((project) => (
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

export default ProjectsPage;

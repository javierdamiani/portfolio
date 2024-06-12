import About from "@/components/About/About";
import Cover from "@/components/Cover/Cover";
import Experience from "@/components/Experience/Experience";
import Projects from "@/components/Projects/Projects";
import VideoCV from "@/components/VideoCV/VideoCV";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<Cover />
			<About />
			<Projects />
			<Experience />
			<VideoCV />
		</main>
	);
}

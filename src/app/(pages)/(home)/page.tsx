import { Header } from "@/components/header";
import { PostsList } from "@/components/posts-list";

export default function Home() {
	return (
		<div className="p-2 relative flex flex-col h-screen">
			<Header />

			<main className="mt-5 flex flex-col flex-1">
				<PostsList />
			</main>
		</div>
	)
}

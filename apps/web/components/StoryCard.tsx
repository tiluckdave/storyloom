import Image from "next/image";

interface StoryCardProps {
	story: {
		id: string;
		title: string;
		description: string;
		duration: string;
		ageRange: string;
		theme: string;
		image: string;
		author: string;
		isNew: boolean;
		category: "community" | "recommended" | "trending";
		storyText: string;
	};
	onPlay: (story: StoryCardProps["story"]) => void;
	className?: string;
}

export default function StoryCard({
	story,
	onPlay,
	className = "",
}: StoryCardProps) {
	return (
		<div
			className={`bg-white rounded-xl p-4 hover:shadow-xl transition-all duration-300 cursor-pointer group relative border border-gray-200 hover:border-orange-300 ${className}`}
			onClick={() => onPlay(story)}
		>
			{/* Story Image */}
			<div className='relative mb-4'>
				<Image
					src={story.image}
					alt={story.title}
					className='w-full aspect-square object-cover rounded-lg'
					width={100}
					height={100}
				/>

				{/* Play button - only visible on hover */}
				<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
					<div className='w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-all duration-200 shadow-lg hover:scale-110'>
						<svg
							className='w-6 h-6 text-white ml-0.5'
							fill='currentColor'
							viewBox='0 0 24 24'
						>
							<path d='M8 5v14l11-7z' />
						</svg>
					</div>
				</div>

				{/* Theme Badge */}
				<div className='absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm'>
					{story.theme}
				</div>
			</div>

			{/* Story Info */}
			<div className='text-gray-900'>
				<h3 className='font-bold text-base mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors'>
					{story.title}
				</h3>

				<p className='text-gray-600 text-sm mb-3 line-clamp-2'>
					{story.description}
				</p>
			</div>
		</div>
	);
}

"use client";

import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useState } from "react";
import StoryCard from "@/components/StoryCard";
import StoryPlayer from "@/components/StoryPlayer";

// Mock story data - will be replaced with real data later
const mockStories = [
	{
		id: "1",
		title: "The Honest Little Fox",
		description:
			"A tale about a fox who learns the importance of telling the truth",
		duration: "8:45",
		ageRange: "4-8",
		theme: "Honesty",
		image:
			"https://images.unsplash.com/photo-1554990349-170b9e4bdf3b?w=300&h=300&fit=crop",
		author: "Sarah M.",
		isNew: true,
		category: "community" as const,
		storyText:
			"Once upon a time, in a peaceful forest, there lived a little fox named Felix. Felix was known throughout the forest for being very clever, but he had one big problem - he often told lies.\n\nOne sunny morning, Felix was playing near the river when he accidentally broke Mama Bear's favorite honey pot. The golden pot shattered into pieces, and honey spilled everywhere.\n\nWhen Mama Bear found the broken pot, she asked all the forest animals who had done it. Felix was scared and said, 'It wasn't me! I saw Rabbit playing here earlier.'\n\nPoor Rabbit got in trouble, even though he had done nothing wrong. Felix felt terrible watching his friend being scolded, but he was too afraid to speak up.\n\nThat night, Felix couldn't sleep. He kept thinking about Rabbit's sad face. The next morning, Felix decided to be brave and tell Mama Bear the truth.\n\n'Mama Bear,' Felix said with tears in his eyes, 'I'm sorry. I broke your honey pot and blamed Rabbit. I was scared, but lying made everything worse.'\n\nMama Bear was upset about the broken pot, but she was proud of Felix for telling the truth. She forgave him and they worked together to make things right with Rabbit.\n\nFrom that day on, Felix always told the truth, and he became known as the most honest fox in the entire forest.",
	},
	{
		id: "3",
		title: "Gentle Giant's Lesson",
		description:
			"A story about using gentle words instead of hitting when upset",
		duration: "7:15",
		ageRange: "4-7",
		theme: "Kindness",
		image:
			"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop",
		author: "Mike T.",
		isNew: false,
		category: "trending" as const,
		storyText:
			"Deep in the Enchanted Valley lived Eddie, a young elephant who was bigger and stronger than all his friends. Eddie had a kind heart, but sometimes when he got upset or frustrated, he would use his trunk to push other animals or stomp his big feet.\n\nOne day, while playing by the watering hole, little Monkey accidentally splashed water on Eddie while swinging from a vine. Eddie felt angry and used his trunk to push Monkey into the water. Monkey started to cry, and all the other animals looked scared.\n\nOld Wise Owl, who had been watching from a nearby tree, flew down to talk to Eddie. 'Eddie,' said Owl gently, 'I can see you're upset, but pushing Monkey wasn't the right thing to do. When we're angry, we can use words instead of our bodies to solve problems.'\n\nEddie felt ashamed. He had hurt his friend's feelings and scared the other animals. 'But Owl,' said Eddie, 'I don't know what words to use when I'm mad!'\n\nWise Owl smiled. 'When someone upsets you, try saying: I feel angry when you splash me. Please be more careful.' Eddie practiced these magic words with Owl.\n\nThe next day, when Squirrel accidentally knocked down Eddie's mud castle, Eddie felt that familiar anger rising. But instead of pushing, he took a deep breath and said, 'Squirrel, I feel upset that my castle was knocked down. Can you help me build it again?'\n\nSquirrel was so happy that Eddie used kind words! Together, they built an even better castle. All the animals cheered for Eddie, and he felt proud that he had used his words, not his strength, to solve the problem.\n\nFrom that day forward, Eddie became known as the Gentle Giant, and all the animals loved playing with their kind and thoughtful friend.",
	},
	{
		id: "4",
		title: "The Magic of Sorry",
		description: "Learning how to apologize and make things right",
		duration: "5:45",
		ageRange: "3-8",
		theme: "Apologies",
		image:
			"https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=300&fit=crop",
		author: "StoryLoom Team",
		isNew: false,
		category: "recommended" as const,
		storyText:
			"In Rainbow Gardens, there lived a little rabbit who learned the most powerful magic word of all. Rosie Rabbit was playing in the garden when she accidentally knocked over her friend Bella Butterfly's beautiful flower arrangement.\n\nBella had spent all morning carefully arranging the prettiest flowers for the Garden Tea Party. When she saw her flowers scattered everywhere, tears began to fill her eyes. Rosie felt terrible but was too embarrassed to say anything, so she hopped away quickly.\n\nAll day long, Rosie felt a heavy feeling in her tummy. She couldn't enjoy playing or eating her favorite carrots. She saw Bella sitting sadly by herself, and it made Rosie feel even worse.\n\nThat evening, Rosie's mama noticed she seemed upset. 'What's wrong, little one?' Mama Rabbit asked gently. Rosie told her mama what had happened. 'I feel awful, but I don't know how to fix it,' Rosie sniffled.\n\nMama Rabbit hugged Rosie close. 'There's a very special magic word that can help heal hurt feelings and fix friendships. It's called Sorry. But it only works when you really mean it and when you try to make things better.'\n\nThe next morning, Rosie gathered the most beautiful flowers she could find. She hopped over to Bella and said, 'Bella, I'm really sorry I knocked over your flower arrangement. I should have been more careful and helped clean up right away. I brought these flowers to help make a new arrangement together.'\n\nBella's face brightened immediately. 'Thank you for saying sorry, Rosie. I forgive you!' Together, they created the most magnificent flower arrangement Rainbow Gardens had ever seen.\n\nFrom that day on, Rosie remembered the magic power of 'Sorry' and used it whenever she made mistakes. She learned that saying sorry and making things right made friendships even stronger than before.",
	},
];

export default function DashboardPage() {
	const { data: session } = useSession();
	const [currentStory, setCurrentStory] = useState<
		(typeof mockStories)[0] | null
	>(null);

	const handleLogout = async () => {
		toast.success("Signing out...");
		await signOut({
			callbackUrl: "/auth/signin",
			redirect: true,
		});
	};

	const firstName =
		session?.user?.name?.split(" ")[0] ||
		session?.user?.email?.split("@")[0] ||
		"Parent";

	const handlePlayStory = (story: (typeof mockStories)[0]) => {
		setCurrentStory(story);
	};

	const handleClosePlayer = () => {
		setCurrentStory(null);
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Clean Header */}
			<header className='bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm'>
				<div className='max-w-6xl mx-auto px-6 py-4'>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-8'>
							<h1 className='text-2xl font-bold text-gray-900'>StoryLoom</h1>
						</div>
						<div className='flex items-center gap-4'>
							<span className='text-sm text-gray-600 hidden sm:block'>
								{session?.user?.email}
							</span>
							<button
								onClick={handleLogout}
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200'
							>
								Sign out
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className='max-w-6xl mx-auto px-6 py-8 pb-32'>
				{/* Generate Story Section */}
				<section className='mb-12'>
					<div className='bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden'>
						<div className='relative z-10'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl'>
									✨
								</div>
								<h2 className='text-3xl font-bold'>
									Create a magical story for {firstName}!
								</h2>
							</div>
							<p className='text-lg mb-6 text-white/90 max-w-2xl'>
								Tell us about your child&apos;s interests and any behaviors
								you&apos;d like to address. Our AI will craft a personalized
								bedtime story just for them.
							</p>
							<button className='bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors duration-200 shadow-lg'>
								🪄 Generate New Story
							</button>
						</div>
						{/* Decorative elements */}
						<div className='absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20' />
						<div className='absolute right-12 bottom-0 w-24 h-24 bg-white/5 rounded-full -mb-12' />
						<div className='absolute left-12 bottom-4 w-6 h-6 bg-white/20 rounded-full' />
						<div className='absolute left-24 top-12 w-4 h-4 bg-white/15 rounded-full' />
					</div>
				</section>

				{/* Stories Grid */}
				<section>
					<div className='flex items-center justify-between mb-8'>
						<h2 className='text-2xl font-bold text-gray-900'>
							✨ Discover magical stories
						</h2>
						<div className='flex items-center gap-2 text-sm text-gray-600'>
							<span>💡 Click any story to start listening</span>
						</div>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{mockStories.map((story) => (
							<StoryCard
								key={story.id}
								story={story}
								onPlay={handlePlayStory}
								className='transform hover:scale-105 transition-all duration-200'
							/>
						))}
					</div>
				</section>
			</main>

			{/* Story Player */}
			<StoryPlayer story={currentStory} onClose={handleClosePlayer} />
		</div>
	);
}

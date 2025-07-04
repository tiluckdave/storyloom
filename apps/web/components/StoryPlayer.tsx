"use client";

import { useState } from "react";
import Image from "next/image";

interface StoryPlayerProps {
	story: {
		id: string;
		title: string;
		description: string;
		duration: string;
		image: string;
		theme: string;
		storyText: string;
		audioUrl?: string;
	} | null;
	onClose: () => void;
}

export default function StoryPlayer({ story, onClose }: StoryPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime] = useState(0);
	const [duration] = useState(0);
	const [showText, setShowText] = useState(false);

	if (!story) return null;

	const togglePlay = () => {
		setIsPlaying(!isPlaying);
		// Audio playback logic will be implemented later
	};

	const handleNext = () => {
		// Next story logic
		console.log("Next story");
	};

	const handlePrevious = () => {
		// Previous story logic
		console.log("Previous story");
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<>
			{/* Story Player Bar - Light Theme */}
			<div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg'>
				<div className='flex items-center justify-between px-6 py-4 max-w-6xl mx-auto'>
					{/* Story Info */}
					<div className='flex items-center gap-4 flex-1 min-w-0 max-w-xs'>
						<Image
							src={story.image}
							alt={story.title}
							width={48}
							height={48}
							className='w-12 h-12 rounded-lg object-cover shadow-sm'
						/>
						<div className='min-w-0 flex-1'>
							<h4 className='text-gray-900 font-semibold text-sm truncate'>
								{story.title}
							</h4>
							<p className='text-gray-600 text-xs truncate'>
								{story.description}
							</p>
						</div>
					</div>

					{/* Player Controls */}
					<div className='flex flex-col items-center gap-2 flex-1 max-w-2xl mx-8'>
						{/* Control Buttons */}
						<div className='flex items-center gap-6'>
							<button
								onClick={handlePrevious}
								className='text-gray-600 hover:text-gray-900 transition-colors p-1'
								title='Previous story'
							>
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M6 6h2v12H6zm3.5 6l8.5 6V6z' />
								</svg>
							</button>

							<button
								onClick={togglePlay}
								className='w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105'
							>
								{isPlaying ? (
									<svg
										className='w-6 h-6 text-white'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
									</svg>
								) : (
									<svg
										className='w-6 h-6 text-white ml-0.5'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M8 5v14l11-7z' />
									</svg>
								)}
							</button>

							<button
								onClick={handleNext}
								className='text-gray-600 hover:text-gray-900 transition-colors p-1'
								title='Next story'
							>
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z' />
								</svg>
							</button>
						</div>

						{/* Progress Bar */}
						<div className='flex items-center gap-3 w-full'>
							<span className='text-xs text-gray-500 min-w-[35px] text-right'>
								{formatTime(currentTime)}
							</span>
							<div className='flex-1 bg-gray-200 rounded-full h-2 cursor-pointer hover:h-3 transition-all duration-200'>
								<div
									className='bg-orange-500 h-2 rounded-full transition-all duration-150 hover:h-3'
									style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
								/>
							</div>
							<span className='text-xs text-gray-500 min-w-[35px]'>
								{story.duration}
							</span>
						</div>
					</div>

					{/* Additional Controls */}
					<div className='flex items-center gap-4 flex-1 justify-end max-w-xs'>
						{/* Story Text Button */}
						<button
							onClick={() => setShowText(!showText)}
							className={`p-3 rounded-full transition-colors ${
								showText
									? "bg-orange-500 text-white shadow-lg"
									: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
							}`}
							title='Read story text'
						>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
								/>
							</svg>
						</button>

						{/* Volume Control */}
						<div className='flex items-center gap-2'>
							<svg
								className='w-5 h-5 text-gray-600'
								fill='currentColor'
								viewBox='0 0 24 24'
							>
								<path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
							</svg>
							<div className='w-24 bg-gray-200 rounded-full h-2'>
								<div className='bg-orange-500 h-2 rounded-full w-3/4' />
							</div>
						</div>

						{/* Close Button */}
						<button
							onClick={onClose}
							className='text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full'
							title='Close player'
						>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Full-Screen Story Text Viewer (Spotify Lyrics Style) */}
			{showText && (
				<div className='fixed inset-0 bg-white z-30 overflow-y-auto pb-32'>
					{/* Header - Sticks to navbar */}
					<div className='sticky top-[68px] bg-white border-b border-gray-200 z-10'>
						<div className='flex items-center justify-between px-6 py-4 max-w-4xl mx-auto'>
							<div className='flex items-center gap-3'>
								<Image
									src={story.image}
									alt={story.title}
									width={40}
									height={40}
									className='w-10 h-10 rounded-lg object-cover'
								/>
								<div>
									<h3 className='text-gray-900 font-semibold text-base'>
										{story.title}
									</h3>
									<p className='text-gray-600 text-sm'>{story.description}</p>
								</div>
							</div>
							<button
								onClick={() => setShowText(false)}
								className='text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100'
							>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>
					</div>

					{/* Story Text - Large but readable text */}
					<div className='max-w-4xl mx-auto px-6 py-12 mt-12'>
						<div className='space-y-6'>
							{story.storyText.split("\n\n").map((paragraph, index) => (
								<p
									key={index}
									className={`text-2xl md:text-3xl font-semibold leading-relaxed transition-all duration-300 ${
										index === 0
											? "text-orange-600"
											: "text-gray-800 hover:text-gray-900"
									}`}
									style={{
										fontFamily:
											'"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
										lineHeight: "1.4",
									}}
								>
									{paragraph}
								</p>
							))}
						</div>

						{/* Footer Hint */}
						<div className='mt-16 text-center'>
							<div className='inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm'>
								<span>✨</span>
								<span>
									Text will highlight and auto-scroll as the story plays
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

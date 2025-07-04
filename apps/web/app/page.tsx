import GetStartedButton from "@/components/GetStartedButton";

export default function Home() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100'>
			{/* Hero Section */}
			<section className='relative overflow-hidden'>
				{/* Background Gradient */}
				<div
					className='absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700'
					style={{
						background:
							"linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)",
					}}
				/>

				{/* Decorative Elements */}
				<div className='absolute inset-0 bg-black/20' />
				<div
					className='absolute inset-0 opacity-30'
					style={{
						backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 2px, transparent 2px),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 60% 20%, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
						backgroundSize: "40px 40px, 30px 30px, 25px 25px",
					}}
				/>

				<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32'>
					<div className='text-center'>
						{/* Logo/Brand */}
						<h1 className='text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight'>
							StoryLoom
						</h1>

						{/* Tagline */}
						<p className='text-xl sm:text-2xl text-white/90 mb-4 font-light'>
							AI-Powered Bedtime Stories for Kids
						</p>

						{/* Hero Description */}
						<p className='text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed'>
							Create personalized bedtime stories that entertain your child
							while gently teaching valuable life lessons. Our AI crafts unique
							tales based on your child&apos;s interests and helps address
							behavioral challenges through storytelling.
						</p>

						{/* CTA Button */}
						<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
							<GetStartedButton size='large' />

							<button className='px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm'>
								Learn More
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-24 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-gray-900 mb-4'>
							The magic of personalized storytelling
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Discover how AI-powered stories can transform bedtime into
							meaningful learning moments for your child
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-12'>
						{/* Feature 1 */}
						<div className='text-center group'>
							<div
								className='w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110'
								style={{
									background:
										"linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
									boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
								}}
							>
								✨
							</div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								AI-Powered Personalization
							</h3>
							<p className='text-gray-600 leading-relaxed'>
								Stories tailored to your child&apos;s age, interests, and
								personality. Every tale is unique and created just for them.
							</p>
						</div>

						{/* Feature 2 */}
						<div className='text-center group'>
							<div
								className='w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110'
								style={{
									background:
										"linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
									boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
								}}
							>
								🌱
							</div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								Behavioral Development
							</h3>
							<p className='text-gray-600 leading-relaxed'>
								Gently address challenges like lying, stealing, or aggression
								through engaging stories that teach valuable life lessons.
							</p>
						</div>

						{/* Feature 3 */}
						<div className='text-center group'>
							<div
								className='w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110'
								style={{
									background:
										"linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
									boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
								}}
							>
								🎧
							</div>
							<h3 className='text-xl font-semibold text-gray-900 mb-3'>
								Audio & Community Stories
							</h3>
							<p className='text-gray-600 leading-relaxed'>
								Enjoy beautifully narrated audio stories and discover amazing
								tales shared by our community of parents.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section
				className='py-24 relative overflow-hidden'
				style={{
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
				}}
			>
				{/* Decorative Background */}
				<div
					className='absolute inset-0 opacity-20'
					style={{
						backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
						backgroundSize: "50px 50px, 30px 30px",
					}}
				/>

				<div className='relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
					<h2 className='text-4xl sm:text-5xl font-bold text-white mb-6'>
						Ready to transform bedtime?
					</h2>
					<p className='text-xl text-white/90 mb-10 leading-relaxed'>
						Join thousands of parents who have already discovered the magic of
						personalized storytelling. Your child&apos;s next favorite bedtime
						story is just a click away.
					</p>

					<GetStartedButton size='large' className='mx-auto' />
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-gray-900 text-white py-12'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold mb-4'>StoryLoom</h3>
						<p className='text-gray-400 mb-6'>
							Creating magical bedtime moments for families worldwide
						</p>
						<p className='text-sm text-gray-500'>
							© {new Date().getFullYear()} StoryLoom. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useState, useEffect, Suspense } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const emailSchema = z.string().email();

function SignInForm() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const searchParams = useSearchParams();

	// Handle authentication errors from URL parameters
	useEffect(() => {
		const error = searchParams.get("error");
		if (error) {
			let errorMessage = "An error occurred during sign in.";

			switch (error) {
				case "GoogleAccountRequired":
					errorMessage =
						"This email is registered with Google. Please use Google Sign-In instead.";
					break;
				case "EmailAccountRequired":
					errorMessage =
						"This email is registered with magic link. Please use email sign-in instead.";
					break;
				case "OAuthAccountNotLinked":
					errorMessage =
						"This email is already registered with a different sign-in method. Please use your original sign-in method.";
					break;
				case "EmailSignin":
					errorMessage = "Failed to send magic link. Please try again.";
					break;
				case "AccessDenied":
					errorMessage =
						"Access denied. Please contact support if this continues.";
					break;
				default:
					errorMessage = "Sign in failed. Please try again.";
			}

			toast.error(errorMessage);

			// Clean up the URL to remove the error parameter
			const url = new URL(window.location.href);
			url.searchParams.delete("error");
			window.history.replaceState({}, "", url.toString());
		}
	}, [searchParams]);

	const handleEmailSignIn = async () => {
		const result = emailSchema.safeParse(email);
		if (!result.success) {
			toast.error("Please enter a valid email address.");
			return;
		}

		setLoading(true);
		const res = await signIn("email", {
			email,
			redirect: false,
			callbackUrl: "/dashboard",
		});

		setLoading(false);

		if (res?.error) {
			toast.error(res.error);
		} else {
			toast.success("Check your email for a magic link!");
		}
	};

	const handleGoogleSignIn = async () => {
		setLoading(true);

		const result = await signIn("google", {
			callbackUrl: "/dashboard",
			redirect: false,
		});

		setLoading(false);

		if (result?.error) {
			let errorMessage = "Google sign-in failed.";

			switch (result.error) {
				case "GoogleAccountRequired":
					errorMessage =
						"This email is registered with Google. Please use Google Sign-In instead.";
					break;
				case "EmailAccountRequired":
					errorMessage =
						"This email is registered with magic link. Please use email sign-in instead.";
					break;
				case "OAuthAccountNotLinked":
					errorMessage =
						"This email is already registered with a different sign-in method. Please use your original sign-in method.";
					break;
				default:
					errorMessage = "Google sign-in failed. Please try again.";
			}

			toast.error(errorMessage);
		} else if (result?.url) {
			// Successful sign-in, redirect to dashboard
			window.location.href = result.url;
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4'>
			{/* Background Pattern */}
			<div
				className='absolute inset-0 opacity-5'
				style={{
					backgroundImage: `
						radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.2) 2px, transparent 2px),
						radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.2) 1px, transparent 1px)
					`,
					backgroundSize: "50px 50px, 30px 30px",
				}}
			/>

			{/* Main Card */}
			<div className='relative z-10 w-full max-w-md'>
				<div className='bg-white rounded-2xl shadow-2xl p-8 border border-gray-100'>
					{/* Header */}
					<div className='text-center mb-8'>
						<h1 className='text-3xl font-bold text-gray-900 mb-2'>
							Welcome back
						</h1>
						<p className='text-gray-600'>Sign in to your StoryLoom account</p>
					</div>

					{/* Google Sign In Button */}
					<button
						onClick={handleGoogleSignIn}
						disabled={loading}
						className='w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6'
					>
						<svg width='20' height='20' viewBox='0 0 24 24'>
							<path
								fill='#4285F4'
								d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
							/>
							<path
								fill='#34A853'
								d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
							/>
							<path
								fill='#FBBC05'
								d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
							/>
							<path
								fill='#EA4335'
								d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
							/>
						</svg>
						{loading ? "Connecting..." : "Continue with Google"}
					</button>

					{/* Divider */}
					<div className='relative my-8'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-gray-200' />
						</div>
						<div className='relative flex justify-center text-sm'>
							<span className='px-4 bg-white text-gray-500 font-medium'>
								or
							</span>
						</div>
					</div>

					{/* Email Form */}
					<div className='space-y-6'>
						<div>
							<Label
								htmlFor='email'
								className='block text-sm font-semibold text-gray-700 mb-2'
							>
								Email Address
							</Label>
							<Input
								id='email'
								type='email'
								placeholder='Enter your email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={loading}
								className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200'
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleEmailSignIn();
									}
								}}
							/>
						</div>

						<button
							onClick={handleEmailSignIn}
							disabled={loading || !email}
							className='w-full py-3 px-6 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
							style={{
								background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
								boxShadow: "0 4px 15px rgba(255, 107, 53, 0.4)",
							}}
							onMouseEnter={(e) => {
								if (!loading && email) {
									e.currentTarget.style.transform = "translateY(-1px)";
									e.currentTarget.style.boxShadow =
										"0 8px 25px rgba(255, 107, 53, 0.6)";
								}
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
								e.currentTarget.style.boxShadow =
									"0 4px 15px rgba(255, 107, 53, 0.4)";
							}}
						>
							{loading ? (
								<span className='flex items-center justify-center gap-2'>
									<svg
										className='animate-spin h-4 w-4'
										fill='none'
										viewBox='0 0 24 24'
									>
										<circle
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
											className='opacity-25'
										/>
										<path
											fill='currentColor'
											d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
											className='opacity-75'
										/>
									</svg>
									Sending magic link...
								</span>
							) : (
								"Send magic link"
							)}
						</button>
					</div>

					{/* Footer */}
					<div className='mt-8 text-center'>
						<p className='text-sm text-gray-500'>
							New to StoryLoom?{" "}
							<span className='text-orange-600 font-semibold'>
								Sign up with any method above
							</span>
						</p>
					</div>
				</div>

				{/* Back to Home Link */}
				<div className='text-center mt-6'>
					<Link
						href='/'
						className='text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium'
					>
						← Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function SignInPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SignInForm />
		</Suspense>
	);
}

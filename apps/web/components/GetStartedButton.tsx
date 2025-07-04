"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface GetStartedButtonProps {
	className?: string;
	size?: "default" | "large";
}

export default function GetStartedButton({
	className = "",
	size = "default",
}: GetStartedButtonProps) {
	const { status } = useSession();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleGetStarted = async () => {
		setIsLoading(true);

		if (status === "authenticated") {
			// User is signed in, go to dashboard
			router.push("/dashboard");
		} else {
			// User is not signed in, go to signin page
			router.push("/auth/signin");
		}

		setIsLoading(false);
	};

	const baseClasses = `
    inline-block cursor-pointer
    text-white font-semibold text-center
    border-none rounded-full
    transition-all duration-300 ease-in-out
    hover:transform hover:-translate-y-1
    hover:shadow-lg hover:shadow-orange-500/50
    active:transform active:translate-y-0
    disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden
  `;

	const sizeClasses =
		size === "large"
			? "text-lg px-8 py-4 min-w-[200px]"
			: "text-base px-6 py-3 min-w-[160px]";

	const buttonText =
		status === "authenticated" ? "Go to Dashboard" : "Get Started";

	return (
		<button
			onClick={handleGetStarted}
			disabled={isLoading || status === "loading"}
			className={`${baseClasses} ${sizeClasses} ${className}`}
			style={{
				background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
				boxShadow: "0 4px 15px rgba(255, 107, 53, 0.4)",
			}}
		>
			{isLoading || status === "loading" ? (
				<span className='flex items-center justify-center gap-2'>
					<svg className='animate-spin h-4 w-4' fill='none' viewBox='0 0 24 24'>
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
					Loading...
				</span>
			) : (
				buttonText
			)}
		</button>
	);
}

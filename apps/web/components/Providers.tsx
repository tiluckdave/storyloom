"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<SessionProvider>
			{children}
			{/* Toast notifications */}
			<Toaster richColors theme='light' position='top-right' />
		</SessionProvider>
	);
}

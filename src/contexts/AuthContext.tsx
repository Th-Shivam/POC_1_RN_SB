import {
    getAuthSession,
    hydrateAuthSession,
    subscribeToAuthSession,
} from "@/services/authSession";
import { router, usePathname } from "expo-router";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { AuthSession, AuthUser } from "@/services/authSession";

type AuthContextValue = {
	session: AuthSession | null;
	user: AuthUser | null;
	token: string | null;
	isReady: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const [session, setSession] = useState<AuthSession | null>(getAuthSession());
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const unsubscribe = subscribeToAuthSession((nextSession) => {
			setSession(nextSession);
			setIsReady(true);
		});

		void hydrateAuthSession().then((hydratedSession) => {
			setSession(hydratedSession);
			setIsReady(true);
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		if (!isReady) {
			return;
		}

		const isPublicRoute = pathname === "/login" || pathname === "/signup";

		if (!session && !isPublicRoute) {
			router.replace("/login");
			return;
		}

		if (session && isPublicRoute) {
			router.replace("/profile" as never);
		}
	}, [isReady, pathname, session]);

	const value = useMemo<AuthContextValue>(
		() => ({
			session,
			user: session?.user ?? null,
			token: session?.token ?? null,
			isReady,
		}),
		[isReady, session],
	);

	if (!isReady) {
		return null;
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}
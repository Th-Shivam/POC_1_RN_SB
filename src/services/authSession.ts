import AsyncStorage from "@react-native-async-storage/async-storage";

export type AuthUser = {
	userId: number;
	name: string;
	email: string;
};

export type AuthSession = {
	user: AuthUser;
	token: string;
};

const AUTH_SESSION_STORAGE_KEY = "auth.session.v1";

let currentSession: AuthSession | null = null;
let isHydrated = false;
const listeners = new Set<(session: AuthSession | null) => void>();

const notifyListeners = () => {
	listeners.forEach((listener) => listener(currentSession));
};

const persistSession = async (session: AuthSession | null) => {
	if (session) {
		await AsyncStorage.setItem(
			AUTH_SESSION_STORAGE_KEY,
			JSON.stringify(session),
		);
		return;
	}

	await AsyncStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
};

export const getAuthSession = (): AuthSession | null => currentSession;

export const getAuthToken = (): string | null => currentSession?.token ?? null;

export const getAuthUser = (): AuthUser | null => currentSession?.user ?? null;

export const subscribeToAuthSession = (
	listener: (session: AuthSession | null) => void,
) => {
	listeners.add(listener);
	listener(currentSession);

	return () => {
		listeners.delete(listener);
	};
};

export const hydrateAuthSession = async (): Promise<AuthSession | null> => {
	if (isHydrated) {
		return currentSession;
	}

	isHydrated = true;

	const storedSession = await AsyncStorage.getItem(AUTH_SESSION_STORAGE_KEY);

	if (!storedSession) {
		currentSession = null;
		notifyListeners();
		return currentSession;
	}

	try {
		const parsedSession = JSON.parse(storedSession) as AuthSession;
		if (
			parsedSession &&
			typeof parsedSession.token === "string" &&
			parsedSession.user &&
			typeof parsedSession.user.userId === "number" &&
			typeof parsedSession.user.name === "string" &&
			typeof parsedSession.user.email === "string"
		) {
			currentSession = parsedSession;
		} else {
			currentSession = null;
			await AsyncStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
		}
	} catch {
		currentSession = null;
		await AsyncStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
	}

	notifyListeners();
	return currentSession;
};

export const saveAuthSession = async (session: AuthSession): Promise<void> => {
	currentSession = session;
	isHydrated = true;
	await persistSession(session);
	notifyListeners();
};

export const clearAuthSession = async (): Promise<void> => {
	currentSession = null;
	isHydrated = true;
	await persistSession(null);
	notifyListeners();
};
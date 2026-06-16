import { AUTH_ENDPOINTS } from "@/constants/config";
import { apiRequest } from "./api";

export type SignUpRequest = {
	name: string;
	email: string;
	password: string;
};

export type SignUpResponse = {
	message: string;
	success: boolean;
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	message: string;
	success: boolean;
	userId: number | null;
	name: string | null;
	email: string | null;
	token: string | null;
};

export const authService = {
	signUp: (payload: SignUpRequest) =>
		apiRequest<SignUpResponse>(AUTH_ENDPOINTS.signup, {
			method: "POST",
			public: true,
			body: payload,
		}),
	login: (payload: LoginRequest) =>
		apiRequest<LoginResponse>(AUTH_ENDPOINTS.login, {
			method: "POST",
			public: true,
			body: payload,
		}),
};

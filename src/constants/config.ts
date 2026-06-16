const configuredBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

export const API_BASE_URL = configuredBaseUrl
	? configuredBaseUrl.replace(/\/+$/, "")
	: "http://10.136.236.48:8080";

export const AUTH_ENDPOINTS = {
	signup: "/api/auth/signup",
	login: "/api/auth/login",
} as const;

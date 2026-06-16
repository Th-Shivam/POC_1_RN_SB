import { API_BASE_URL } from "@/constants/config";
import { clearAuthSession, getAuthToken } from "@/services/authSession";

type ApiRequestOptions = Omit<RequestInit, "body"> & {
	body?: unknown;
	public?: boolean;
};

export class ApiError extends Error {
	status?: number;

	constructor(message: string, status?: number) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

const buildUrl = (path: string): string => {
	if (path.startsWith("http://") || path.startsWith("https://")) {
		return path;
	}

	return `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
	const contentType = response.headers.get("content-type") ?? "";

	if (contentType.includes("application/json")) {
		return response.json();
	}

	return response.text();
};

export async function apiRequest<T>(
	path: string,
	options: ApiRequestOptions = {},
): Promise<T> {
	const requestHeaders = new Headers(options.headers);
	requestHeaders.set("Accept", "application/json");
	requestHeaders.set("Content-Type", "application/json");

	if (!options.public) {
		const token = getAuthToken();
		if (token) {
			requestHeaders.set("Authorization", `Bearer ${token}`);
		}
	}

	const response = await fetch(buildUrl(path), {
		...options,
		headers: requestHeaders,
		body:
			options.body === undefined ? undefined : JSON.stringify(options.body),
	});

	const responseBody = await parseResponseBody(response);

	if (!response.ok) {
		if (response.status === 401 || response.status === 403) {
			await clearAuthSession();
		}

		const message =
			typeof responseBody === "object" &&
			responseBody !== null &&
			"message" in responseBody
				? String((responseBody as { message: unknown }).message)
				: `Request failed with status ${response.status}`;

		throw new ApiError(message, response.status);
	}

	return responseBody as T;
}
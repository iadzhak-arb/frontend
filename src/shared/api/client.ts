import createClient, {type Middleware} from "openapi-fetch"
import {type paths} from "./schema.ts";

const baseUrl = import.meta.env.VITE_BASE_URL || '';

let refreshTokenPromise: Promise<void> | null = null;

export type ApiError = {
    status: number;
    data: any;
    url: string;
    statusText: string;
}

function refreshToken() {
    if (!refreshTokenPromise) {
        refreshTokenPromise = (async (): Promise<void> => {
            const response = await fetch(baseUrl + 'api/auth/token/refresh/', {
                method: 'POST',
                credentials: 'include'
            })
            if (!response.ok) throw new Error('Refresh token failed');

        })()
        refreshTokenPromise.finally(() => {
            refreshTokenPromise = null;
        })
    }
}

const authMiddleware: Middleware = {
    onRequest({request}) {
        // @ts-expect-error hot fix
        request._retryRequest = request.clone();
        return request;
    },
    async onResponse({request, response}) {
        if (response.ok) return response
        if (!response.ok && response.status !== 401) {
            throw {
                status: response.status,
                data: JSON.parse(await response.text()),
                url: response.url,
                statusText: response.statusText,
            } as ApiError;
        }
        try {
            await refreshToken();
            // @ts-expect-error ignore it
            const originalRequest: Request = request._retryRequest;
            const retryRequest = new Request(originalRequest, {credentials: 'include'});
            return fetch(retryRequest);
        } catch {
            return response;
        }
    },
    onError() {
        console.log('No connection')
    }
}

export const client = createClient<paths>({
    baseUrl: baseUrl,
    credentials: 'include'
});
client.use(authMiddleware);

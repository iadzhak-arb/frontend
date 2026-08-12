import createClient, {type Middleware} from "openapi-fetch"
import {type paths as authPaths} from "./schema-auth.ts"
import {type paths as arbPaths} from "./schema-arb.ts"

const baseUrl = '';
const authPrefix = '/api/auth';
const arbPrefix = '/api/arb';

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
            const response = await fetch(baseUrl + authPrefix + '/refresh', {
                method: 'GET',
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
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetch(request.url, {
                method: request.method,
                headers: request.headers,
                body: request.body,
                credentials: 'include'
            })
            // return fetch(retryRequest, {credentials: 'include'});
        } catch {
            return response;
        }
    },
    onError() {
        console.log('No connection')
    }
}


export const authClient = createClient<authPaths>({
    baseUrl: baseUrl + authPrefix,
    credentials: 'include'
});

export const arbClient = createClient<arbPaths>({
    baseUrl: baseUrl + arbPrefix,
    credentials: 'include'
});

authClient.use(authMiddleware);
arbClient.use(authMiddleware);

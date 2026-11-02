import type { SessionTokens, UpcProduct } from '@shopbot/shared'

export class ShopbotApiError extends Error {
	readonly status: number

	constructor(message: string, status: number) {
		super(message)
		this.name = 'ShopbotApiError'
		this.status = status
	}
}

export interface ShopbotClientOptions {
	/** Base URL of the API, e.g. http://localhost:4200 */
	baseUrl: string
	/** Called before each request; return the current access token, if any. */
	getAccessToken?: () => string | null | undefined | Promise<string | null | undefined>
	/** Override the fetch implementation (tests, custom runtimes). */
	fetch?: typeof fetch
}

export function createShopbotClient(options: ShopbotClientOptions) {
	const baseUrl = options.baseUrl.replace(/\/+$/, '')
	const doFetch: typeof fetch = (input, init) => (options.fetch ?? fetch)(input, init)

	async function request<T>(path: string): Promise<T> {
		const headers = new Headers()
		const token = await options.getAccessToken?.()
		if (token) headers.set('Authorization', `Bearer ${token}`)

		const res = await doFetch(`${baseUrl}${path}`, { headers })
		if (!res.ok) {
			throw new ShopbotApiError(`Request to ${path} failed with status ${res.status}`, res.status)
		}
		return (await res.json()) as T
	}

	return {
		/** GET /session/start: no auth required. */
		startSession: () => request<SessionTokens>('/session/start'),
		/** GET /barcode?search=...: requires an access token. */
		lookupBarcode: (barcode: string) => request<UpcProduct>(`/barcode?search=${encodeURIComponent(barcode)}`),
	}
}

export type ShopbotClient = ReturnType<typeof createShopbotClient>

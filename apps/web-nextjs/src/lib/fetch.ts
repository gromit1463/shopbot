import { configureRefreshFetch } from 'refresh-fetch'
import { get, multiPut } from '@/lib/storage'
import { JSONValue, QueryStringData } from '@/types'

const allowedPaths = ['/session/start']

export function clone(obj: JSONValue) {
	if (obj === undefined) {
		return obj
	}
	try {
		return JSON.parse(JSON.stringify(obj))
	} catch (_err) {
		throw new TypeError('Object not serializable as JSON')
	}
}

function needsRefresh(error: Response) {
	return error.status === 401
}

function convertToQueryString(obj: QueryStringData): string {
	const output: Array<string> = []

	for (const k in obj) {
		const key = encodeURIComponent(k)
		const value = encodeURIComponent(obj[k])
		output.push(`${key}=${value}`)
	}

	return output.join('&')
}

function doRefresh(): Promise<void> {
	return get('RefreshToken').then((refreshToken) => {
		return fetchJSON(`${process.env.NEXT_PUBLIC_API_URL}/session/refresh`, {
			method: 'GET',
			headers: {
				//'Origin': origin,
				'Access-Token': String(refreshToken),
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
		}).then((res) => {
			try {
				const jsonRes = JSON.parse(res.body)
				multiPut([
					{ key: 'AuthToken', value: jsonRes.access },
					{ key: 'RefreshToken', value: jsonRes.refresh },
				])
			} catch (err) {
				console.error(err)
			}
		})
	})
}

function doFetch(
	method: string,
	url: string,
	data?: QueryStringData | undefined | null
): Promise<string | object | null> {
	return get('AuthToken').then(function (authToken) {
		if (authToken || allowedPaths.includes(url)) {
			const args: RequestInit = {
				method,
				headers: {
					Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				},
			}

			if (data && method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'HEAD') {
				args.body = convertToQueryString(data)
			}

			return fetchJSON(`${process.env.NEXT_PUBLIC_API_URL}${url}`, args).then(
				(res) => {
					return res.body
				}
			)
		} else {
			return null
		}
	})
}

export const fetchapi = configureRefreshFetch({
	shouldRefreshToken: needsRefresh,
	refreshToken: doRefresh,
	fetch: doFetch,
})

// from refresh-fetch/src/fetchJSON.js
const fetchJSON = (url: string, options?: RequestInit | undefined) => {
	return fetch(url, options)
		.then(function (response) {
			return getResponseBody(response).then(function (body) {
				return {
					response: response,
					body: body,
				}
			})
		})
		.then(checkStatus)
}

const getResponseBody = (response: Response) => {
	const contentType = response.headers.get('content-type')
	return contentType && contentType.indexOf('json') >= 0
		? response.clone().text().then(tryParseJSON)
		: response.clone().text()
}

const tryParseJSON = (json: string) => {
	if (!json) {
		return null
	}

	try {
		return JSON.parse(json)
	} catch (err) {
		console.error(err)
		throw new Error(`Failed to parse unexpected JSON response: ${json}`)
	}
}

class ResponseError extends Error {
	status: number
	response: Response
	body: string

	constructor(status: number, response: Response, body: string) {
		super(`HTTP ${status}`)
		this.name = 'ResponseError'
		this.status = status
		this.response = response
		this.body = body
	}
}

const checkStatus = ({ response, body }: { response: Response; body: string }) => {
	if (response.ok) {
		return { response, body }
	} else {
		throw new ResponseError(response.status, response, body)
	}
}

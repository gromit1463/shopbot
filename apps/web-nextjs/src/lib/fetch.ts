import { configureRefreshFetch } from 'refresh-fetch'
import { get, multiPut } from '@/lib/storage'

const allowedPaths = ['/session/start']

export function clone(obj) {
	if (obj) {
		return JSON.parse(JSON.stringify(obj))
	} else {
		return obj
	}
}

function needsRefresh(error) {
	return error.status === 401
}

function convertToQueryString(obj) {
	let output = []

	for (let k in obj) {
		output.push(`${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
	}

	return output.join('&')
}

function doRefresh() {
	return get('RefreshToken').then(function (refreshToken) {
		return fetchJSON(`${process.env.NEXT_PUBLIC_API_URL}/session/refresh`, {
			method: 'GET',
			headers: {
				//'Origin': origin,
				'Access-Token': refreshToken,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
		}).then((res) => {
			return multiPut([
				{ key: 'AuthToken', value: res.body.access },
				{ key: 'RefreshToken', value: res.body.refresh },
			])
		})
	})
}

function doFetch(method, url, data) {
	return get('AuthToken').then(function (authToken) {
		if (authToken || allowedPaths.includes(url)) {
			const args = {
				method,
				headers: {
					Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				},
			}

			if (data && method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'HEAD') {
				args.body = convertToQueryString(data)
			}

			console.log('SERVER', process.env.NEXT_PUBLIC_API_URL)
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
const fetchJSON = (url, options) => {
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

const getResponseBody = (response) => {
	const contentType = response.headers.get('content-type')
	return contentType && contentType.indexOf('json') >= 0
		? response.clone().text().then(tryParseJSON)
		: response.clone().text()
}

const tryParseJSON = (json) => {
	if (!json) {
		return null
	}

	try {
		return JSON.parse(json)
	} catch (e) {
		throw new Error(`Failed to parse unexpected JSON response: ${json}`)
	}
}

function ResponseError(status, response, body) {
	this.name = 'ResponseError'
	this.status = status
	this.response = response
	this.body = body
}

ResponseError.prototype = Error.prototype

const checkStatus = ({ response, body }) => {
	if (response.ok) {
		return { response, body }
	} else {
		throw new ResponseError(response.status, response, body)
	}
}

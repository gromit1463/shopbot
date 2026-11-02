/** Returned by GET /session/start. */
export interface SessionTokens {
	success: true
	access: string
	refresh: string
}

/** Returned by the API when a request fails. */
export interface ApiFailure {
	success: false
}

/** A product record from the UPC lookup service, as cached in MongoDB. */

interface UpcProductStore {
	store: string
	price: string
	url?: string
}

export interface UpcProduct {
	/** Zero-padded to BARCODE_LENGTH digits (see padBarcode). */
	added_time: string
	modified_time: string
	title: string
	barcode: string
	alias?: string
	description?: string
	brand?: string
	manufacturer?: string
	msrp?: string
	ASIN?: string
	category?: string
	categories?: string
	stores?: UpcProductStore[]
	metadata?: Record<string, string>
	images?: string[]
	reviews?: {
		thumbsup: number
		thumbsdown: number
	}
}

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
export interface UpcProduct {
	success: true
	/** Zero-padded to BARCODE_LENGTH digits (see padBarcode). */
	barcode: string
	title?: string
	alias?: string
	description?: string
	brand?: string
	manufacturer?: string
	category?: string
	[key: string]: unknown
}

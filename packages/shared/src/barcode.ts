/** Barcodes are stored in MongoDB zero-padded to this length. */
export const BARCODE_LENGTH = 20

/** Zero-pad a barcode to the stored length so lookups match. */
export function padBarcode(barcode: string): string {
	return barcode.padStart(BARCODE_LENGTH, '0')
}

/** True for an unpadded numeric code of 8-14 digits (EAN-8, UPC-A, EAN-13, GTIN-14). */
export function isValidBarcode(barcode: string): boolean {
	return /^\d{8,14}$/.test(barcode)
}

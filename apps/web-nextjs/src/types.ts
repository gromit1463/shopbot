import type { ReactNode } from 'react'

export type QueryStringValue = string | number | boolean

export type QueryStringData = Record<string, QueryStringValue>

export type JSONValue =
	| string
	| number
	| boolean
	| null
	| JSONValue[]
	| { [key: string]: JSONValue }

export type AppFrameProps = {
	children: ReactNode
}

export type KeypadProps = {
	title?: ReactNode | null | undefined
	onChange?: (value: number) => void
}

export type SettingsDrawerProps = {
	open: boolean
	title?: string
	height?: string
	onClose?: () => void
	children: ReactNode
}

export type BarcodeReaderResults = {
	barcode: string
	title: string
	msrp: number
}
export type BarcodeReaderProps = {
	onScan: (results: BarcodeReaderResults) => void
	onError?: (msg: string) => void
}

export type DrawerProps = {
	open: boolean
	title?: string
	onClose?: () => void
	onError?: (msg: string) => void
}

export type ShoppingListItemType = {
	barcode: string
	name: string
	quantity: number
	unitPrice: number
}

export type ShoppingListItemProps = {
	item: ShoppingListItemType
}

export type GlobalContextType = {
	items: ShoppingListItemType[]
	budget: number
	subTotal: number
	taxRate: number
	taxAmount: number
	total: number
}

export type GlobalProviderProps = {
	children: ReactNode
}

export interface ShoppingListState {
	cart: ShoppingListItemType[]
	budget: number
	taxRate: number
	taxAmount: number
	subTotal: number
	total: number
	addItem: (item: ShoppingListItemType) => boolean
	removeItem: (id: number) => boolean
	editItem: (id: number, item: ShoppingListItemType) => boolean
	setBudget: (amt: number) => boolean
	setTaxRate: (rate: number) => boolean
	clearList: () => void
}

export interface ShoppingListStorage {
	getItem: (name: string) => object | string | number | null
	setItem: (name: string, value: string) => void
	removeItem: (name: string) => void
}

export const QrcodeSupportedFormats = {
	0: 'QR_CODE',
	1: 'AZTEC',
	2: 'CODABAR',
	3: 'CODE_39',
	4: 'CODE_93',
	5: 'CODE_128',
	6: 'DATA_MATRIX',
	7: 'MAXICODE',
	8: 'ITF',
	9: 'EAN_13',
	10: 'EAN_8',
	11: 'PDF_417',
	12: 'RSS_14',
	13: 'RSS_EXPANDED',
	14: 'UPC_A',
	15: 'UPC_E',
	16: 'UPC_EAN_EXTENSION',
}
export const ALL_BARCODE_FORMATS = 17

export type StorageItem = {
	key: string
	value: string | undefined
}

export type SessionResponse = {
	success: boolean
	access?: string
	refresh?: string
}

export type UpcDatabaseResponse = {
	_id: string
	added_time: string
	modified_time: string
	title: string | null
	alias: string | null
	description: string | null
	brand: string | null
	manufacturer: string | null
	msrp: string | null
	ASIN: string | null
	category: string | null
	categories: string | null
	stores: string[] | null
	barcode: string | null
	success: boolean
	timestamp: number | null
	images: string[] | null
	metadata: UpcDatabaseMetadata | null
	metanutrition: UpcDatabaseMetaNutrition | null
}

type UpcDatabaseMetadata = {
	quantity?: string
	countries?: string
	ingredients?: string
}

type UpcDatabaseMetaNutrition = {
	fat_unit: string | null
	salt_unit: string | null
	fiber_unit: string | null
	'nova-group': string | null
	energy_unit: string | null
	sodium_unit: string | null
	sugars_unit: string | null
	alcohol_unit: string | null
	proteins_unit: string | null
	'nova-group_100g': string | null
	'energy-kcal_unit': string | null
	carbohydrates_unit: string | null
	'nova-group_serving': string | null
	'saturated-fat_unit': string | null
}

import type { ReactNode } from 'react'

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

export type DrawerProps = {
	open: boolean
	title?: string
	onClose?: () => void
	onScan: ({
		barcode: string
		title: string
		msrp: number
	}) => void
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
	value: any
}

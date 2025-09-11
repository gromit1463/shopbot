import type { ReactNode } from 'react'

export type AppFrameProps = {
	children: ReactNode
}

export type KeypadProps = {
	title?: ReactNode | null | undefined
	initialValue?: number
	onChange?: (value: number) => void
}

export type SettingsDrawerProps = {
	open: boolean
	title?: string
	height?: string = 'auto'
	children: ReactNode
}

export type DrawerProps = {
	open: boolean
	onClose: () => void
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

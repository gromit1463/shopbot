import type { ReactNode } from 'react'

export type AppFrameProps = {
	children: ReactNode
}

export type KeypadProps = {
	title?: ReactNode | null | undefined
	initialValue?: number
	onAccept?: (value: number) => void
	onCancel?: () => void
}

export type BudgetDialogProps = {
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

export type ShoppingListState = {
	cart: ShoppingListItemType[]
	budget: number
	taxRate: number
	subTotal: number
	total: number
	addItem: (item: ShoppingListItemType) => boolean
	removeItem: (id: number) => boolean
	editItem: (id: number, item: ShoppingListItemType) => boolean
	setBudget: (amt: number) => boolean
	setTaxRate: (rate: number) => boolean
	clearList: () => void
}

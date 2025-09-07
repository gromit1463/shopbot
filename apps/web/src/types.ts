export type AppFrameProps = {
	children: ReactElement
}

export type KeypadProps = {
	title: HTMLElement | string | null | undefined
	initialValue: Number
	onChange: (value: Number) => void
}

export type BudgetDialogProps = {
	open: boolean
	children: ReactElement
}

export type ShoppingListItemType = {
	barcode: string
	name: string
	quantity: Number
	unitPrice: Number
}

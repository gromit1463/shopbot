export type AppFrameProps = {
	children: ReactElement
}

export type KeypadProps = {
	title: HTMLElement | string | null | undefined
	initialValue: number
	onChange: (value: number) => void
}

export type BudgetDialogProps = {
	open: boolean
	children: ReactElement
}

export type ShoppingListItemType = {
	barcode: string
	name: string
	quantity: number
	unitPrice: number
}

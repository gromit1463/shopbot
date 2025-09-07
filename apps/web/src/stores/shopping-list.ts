import { ShoppingListItemType } from '@/types'
import { create } from 'zustand'

const shoppingList = (set, get) => ({
	budget: 0,
	taxRate: 0,
	subTotal: 0,
	total: 0,
	cart: [],
	addItem: ({ barcode, name, qty, unitPrice }: ShoppingListItemType): boolean => {},
	removeItem: (id: Number): boolean => {},
	editItem: (
		id: Number,
		{ barcode, name, qty, unitPrice }: ShoppingListItemType
	): boolean => {},
	setBudget: (amt: Number): boolean => {
		set((state) => ({
			budget: amt,
		}))
	},
	setTaxRate: (rate: Number): boolean => {},
	clearList: (): boolean => {},
})

const useShoppingListStore = create(shoppingList)
export default useShoppingListStore

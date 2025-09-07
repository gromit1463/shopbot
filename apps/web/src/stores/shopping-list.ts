import { ShoppingListItemType, ShoppingListState } from '@/types'
import { create } from 'zustand'

export const useShoppingListStore = create<ShoppingListState>((set, get) => ({
	budget: 0,
	taxRate: 0,
	subTotal: 0,
	total: 0,
	cart: [],
	addItem: ({ barcode, name, quantity, unitPrice }: ShoppingListItemType): boolean => {
		return true
	},
	removeItem: (id: number): boolean => {
		return true
	},
	editItem: (
		id: number,
		{ barcode, name, quantity, unitPrice }: ShoppingListItemType
	): boolean => {
		return true
	},
	setBudget: (amt: number): boolean => {
		set((state) => ({
			budget: amt,
		}))
		return true
	},
	setTaxRate: (rate: number): boolean => {
		return true
	},
	clearList: (): boolean => {
		return true
	},
}))

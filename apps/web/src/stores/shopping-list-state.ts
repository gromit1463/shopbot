import { ShoppingListItemType, ShoppingListState } from '@/types'
import { create } from 'zustand'
import { persist, PersistStorage, StorageValue } from 'zustand/middleware'
import { Preferences } from '@capacitor/preferences'

const storage: PersistStorage<ShoppingListState> = {
	getItem: async (name) => {
		const { value } = await Preferences.get({ key: name })
		return value ? (JSON.parse(value) as StorageValue<ShoppingListState>) : null
	},
	setItem: async (name: string, value: StorageValue<ShoppingListState>) => {
		await Preferences.set({ key: name, value: JSON.stringify(value) })
	},
	removeItem: async (name: string) => {
		await Preferences.remove({ key: name })
	},
}

export const useShoppingListState = create(
	persist<ShoppingListState>(
		(set, get) => ({
			budget: 0,
			taxRate: 0,
			taxAmount: 0,
			subTotal: 0,
			total: 0,
			cart: [],
			addItem: ({
				barcode,
				name,
				quantity,
				unitPrice,
			}: ShoppingListItemType): boolean => {
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
				set((state) => ({
					taxRate: rate,
				}))
				return true
			},
			clearList: (): boolean => {
				return true
			},
		}),
		{
			name: 'shopbot',
			storage,
		}
	)
)

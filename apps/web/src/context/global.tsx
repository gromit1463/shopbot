'use client'

import { ShoppingListItemType } from '@/types'
import { useState, useEffect, createContext, useContext } from 'react'
import { BottomNavigation } from '@mui/material'

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

export default function GlobalProvider({ children }) {
	const [selectedPage, setSelectedPage] = useState<string | null>(null)
	const [items, setItems] = useState<ShoppingListItemType[]>([])
	const [budget, setBudget] = useState<Number>(null)
	const [subTotal, setSubTotal] = useState<Number>(null)
	const [taxRate, setTaxRate] = useState<Number>(null)
	const [taxAmount, setTaxAmount] = useState<Number>(null)
	const [total, setTotal] = useState<Number>(null)

	useEffect(() => {
		setItems([
			{ barcode: '12345678', name: 'Apple', quantity: 20, unitPrice: 30.99 },
			{ barcode: '23456789', name: 'Banana', quantity: 1.8, unitPrice: 0.49 },
			{ barcode: '34567890', name: 'Carrot', quantity: 3.2, unitPrice: 0.79 },
			{ barcode: '45678901', name: 'Tomato', quantity: 4.1, unitPrice: 1.29 },
			{ barcode: '56789012', name: 'Lettuce', quantity: 1.5, unitPrice: 1.09 },
			{ barcode: '67890123', name: 'Orange', quantity: 2.7, unitPrice: 1.19 },
			{ barcode: '78901234', name: 'Cucumber', quantity: 3.4, unitPrice: 0.89 },
			{ barcode: '89012345', name: 'Strawberry', quantity: 1.2, unitPrice: 2.99 },
			{ barcode: '90123456', name: 'Grapes', quantity: 2.8, unitPrice: 2.49 },
			{ barcode: '01234567', name: 'Spinach', quantity: 1.9, unitPrice: 1.79 },
			{ barcode: '11234567', name: 'Pineapple', quantity: 1.3, unitPrice: 3.49 },
			{ barcode: '12234567', name: 'Mango', quantity: 2.6, unitPrice: 1.99 },
			{ barcode: '13234567', name: 'Potato', quantity: 4.5, unitPrice: 0.59 },
			{ barcode: '14234567', name: 'Onion', quantity: 3.1, unitPrice: 0.69 },
			{ barcode: '15234567', name: 'Bell Pepper', quantity: 2.2, unitPrice: 1.39 },
			{ barcode: '16234567', name: 'Blueberry', quantity: 1.7, unitPrice: 3.29 },
			{ barcode: '17234567', name: 'Watermelon', quantity: 1.9, unitPrice: 4.99 },
			{ barcode: '18234567', name: 'Kiwi', quantity: 2.4, unitPrice: 0.89 },
			{ barcode: '19234567', name: 'Cherry', quantity: 1.5, unitPrice: 5.99 },
			{ barcode: '20234567', name: 'Pear', quantity: 2.3, unitPrice: 1.29 },
			{ barcode: '21234567', name: 'Plum', quantity: 3.0, unitPrice: 1.49 },
			{ barcode: '22234567', name: 'Raspberry', quantity: 1.8, unitPrice: 4.29 },
			{ barcode: '23234567', name: 'Cabbage', quantity: 2.7, unitPrice: 0.99 },
			{ barcode: '24234567', name: 'Cauliflower', quantity: 1.4, unitPrice: 1.59 },
			{ barcode: '25234567', name: 'Peach', quantity: 2.9, unitPrice: 1.79 },
			{ barcode: '26234567', name: 'Ginger', quantity: 1.1, unitPrice: 2.49 },
			{ barcode: '27234567', name: 'Garlic', quantity: 3.2, unitPrice: 0.99 },
			{ barcode: '28234567', name: 'Avocado', quantity: 1.6, unitPrice: 1.49 },
			{ barcode: '29234567', name: 'Tomatillo', quantity: 2.5, unitPrice: 1.09 },
			{ barcode: '30234567', name: 'Cantaloupe', quantity: 1.3, unitPrice: 3.29 },
		])
		setTaxRate(6)
		setBudget(200)
	}, [])

	useEffect(() => {
		const subT: Number = items.reduce(
			(acc, item) => acc + item.quantity * item.unitPrice,
			0
		)
		setSubTotal(subT)

		const taxA: Number = (subT * taxRate) / 100
		setTaxAmount(taxA)

		setTotal(subT + taxA)
	}, [items])

	return (
		<GlobalContext.Provider
			value={{
				items,
				budget,
				subTotal,
				taxRate,
				taxAmount,
				total,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

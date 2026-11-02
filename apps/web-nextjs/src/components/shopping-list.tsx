'use client'

import { ReactElement } from 'react'
import { TableContainer, Table, TableBody } from '@mui/material'
import ShoppingListItem from './shopping-list-item'
import { ShoppingListItemType } from '@/types'
import { useShoppingListState } from '@/stores/shopping-list-state'

export default function ShoppingList(): ReactElement {
	//const { cart } = useShoppingListState()
	const cart = [
		{
			barcode: '4011',
			name: 'Bananas',
			quantity: 2,
			unitPrice: 0.69,
		},
		{
			barcode: '3283',
			name: 'Honeycrisp Apples',
			quantity: 1.5,
			unitPrice: 1.39,
		},
		{
			barcode: '0065633302051',
			name: 'Cinnamon Toast Crunch',
			quantity: 1,
			unitPrice: 3.59,
		},
	]

	return (
		<TableContainer
			sx={{
				height: 'calc(100dvh - 150px)',
			}}
		>
			<Table stickyHeader>
				<TableBody>
					{cart.map((item: ShoppingListItemType, i: number) => (
						<ShoppingListItem item={item} key={i} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

'use client'

import { ReactElement } from 'react'
import { TableContainer, Table, TableBody } from '@mui/material'
import ShoppingListItem from './shopping-list-item'
import { ShoppingListItemType } from '@/types'
import { useShoppingListState } from '@/stores/shopping-list-state'

export default function ShoppingList(): ReactElement {
	const { cart } = useShoppingListState()

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

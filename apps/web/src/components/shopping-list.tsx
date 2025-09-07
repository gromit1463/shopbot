'use client'

import { ReactElement } from 'react'
import { TableContainer, Table, TableBody } from '@mui/material'
import ShoppingListItem from './shopping-list-item'
import { GlobalContextType, ShoppingListItemType } from '@/types'
import { useGlobalContext } from '@/context/global'

export default function ShoppingList(): ReactElement {
	const { items } = useGlobalContext() as GlobalContextType

	return (
		<TableContainer
			sx={{
				height: 'calc(100dvh - 150px)',
			}}
		>
			<Table stickyHeader>
				<TableBody>
					{items.map((item: ShoppingListItemType, i: number) => (
						<ShoppingListItem item={item} key={i} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

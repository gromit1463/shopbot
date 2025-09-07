'use client'

import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from '@mui/material'
import ShoppingListItem from './shopping-list-item'
import { ShoppingListItemType } from '@/types'
import { useGlobalContext } from '@/context/global'

export default function ShoppingList(): ReactElement {
	const { items } = useGlobalContext()

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

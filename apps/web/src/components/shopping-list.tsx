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
		<TableContainer sx={{ height: 'calc(100dvh - 150px)' }}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell className='w-full whitespace-nowrap'>Item Name</TableCell>
						<TableCell className='whitespace-nowrap'>Quantity</TableCell>
						<TableCell className='whitespace-nowrap'>Unit Price</TableCell>
						<TableCell className='whitespace-nowrap'>Item Price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map((item: ShoppingListItemType, i: Number) => (
						<ShoppingListItem item={item} key={i} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

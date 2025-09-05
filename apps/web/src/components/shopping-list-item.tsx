import { ReactElement } from 'react'
import { TableRow, TableCell } from '@mui/material'
import { ShoppingListItemProps } from '@/types'

export default function ShoppingListItem({ item }: ShoppingListItemProps): ReactElement {
	return (
		<TableRow className='hover:bg-gray-200'>
			<TableCell>{item.name}</TableCell>
			<TableCell align='right'>{item.quantity}</TableCell>
			<TableCell align='right'>{item.unitPrice.toFixed(2)}</TableCell>
			<TableCell align='right'>
				{(item.quantity * item.unitPrice).toFixed(2)}
			</TableCell>
		</TableRow>
	)
}

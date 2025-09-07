import { useState, ReactElement, MouseEvent } from 'react'
import {
	TableRow,
	TableCell,
	Button,
	Icon,
	Menu,
	MenuItem,
	Fade,
	Grid,
	useMediaQuery,
} from '@mui/material'
import { ShoppingListItemProps } from '@/types'

export default function ShoppingListItem({ item }: ShoppingListItemProps): ReactElement {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<TableRow className='md:hidden! hover:bg-gray-200'>
				<TableCell colSpan={4}>
					<Grid container spacing={1}>
						<Grid size={12}>{item.name}</Grid>
						<Grid size={2} className='text-gray-400 text-xs text-right'>
							Qty:
						</Grid>
						<Grid size={2} className='text-gray-400 text-xs text-right'>
							{item.quantity}
						</Grid>
						<Grid size={2} className='text-gray-400 text-xs text-right'>
							Unit:
						</Grid>
						<Grid size={2} className='text-gray-400 text-xs text-right'>
							{item.unitPrice.toFixed(2)}
						</Grid>
						<Grid size={2} className='text-gray-400 text-xs text-right'>
							Total:
						</Grid>
						<Grid size={2} className='text-gray-400 text-xs text-right'>
							{(item.quantity * item.unitPrice).toFixed(2)}
						</Grid>
					</Grid>
				</TableCell>
				<TableCell>
					<Button className='w-[24px]! min-w-[24px]!' onClick={handleClick}>
						<Icon fontSize='small' className='material-symbols-rounded'>
							more_vert
						</Icon>
					</Button>
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						slotProps={{
							list: {
								'aria-labelledby': 'fade-button',
							},
						}}
						slots={{ transition: Fade }}
					>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>My account</MenuItem>
						<MenuItem onClick={handleClose}>Logout</MenuItem>
					</Menu>
				</TableCell>
			</TableRow>
			<TableRow className='hidden! md:table-row! hover:bg-gray-200'>
				<TableCell className='w-full'>{item.name}</TableCell>
				<TableCell align='right'>{item.quantity}</TableCell>
				<TableCell align='right'>{item.unitPrice.toFixed(2)}</TableCell>
				<TableCell align='right'>
					{(item.quantity * item.unitPrice).toFixed(2)}
				</TableCell>
				<TableCell>
					<Button className='w-[24px]! min-w-[24px]!' onClick={handleClick}>
						<Icon fontSize='small' className='material-symbols-rounded'>
							more_vert
						</Icon>
					</Button>
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						slotProps={{
							list: {
								'aria-labelledby': 'fade-button',
							},
						}}
						slots={{ transition: Fade }}
					>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>My account</MenuItem>
						<MenuItem onClick={handleClose}>Logout</MenuItem>
					</Menu>
				</TableCell>
			</TableRow>
		</>
	)
}

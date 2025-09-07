import { useState, ReactElement } from 'react'
import { Drawer, Container, Box, Stack, Grid, Button } from '@mui/material'
import Keypad from './keypad'
import { BudgetDialogProps } from '@/types'

export default function BudgetDialog({ open, onClose }: BudgetDialogProps): ReactElement {
	const [value, setValue] = useState<number>(0)

	return (
		<Drawer
			PaperProps={{
				sx: {
					borderTopLeftRadius: '0.75rem',
					borderTopRightRadius: '0.75rem',
					overflow: 'hidden',
					padding: '30px 15px',
				},
			}}
			open={open}
			anchor='bottom'
			onClose={onClose}
		>
			<Container maxWidth={false} className='flex justify-center'>
				<Stack spacing={2}>
					<Keypad
						title={<Box className='text-xl'>What is your budget?</Box>}
						onCancel={() => onClose && onClose()}
					/>
					<Grid container spacing={1}>
						<Grid size={6}>
							<Button variant='contained' className='w-full bg-green-400'>
								Set Budget
							</Button>
						</Grid>
						<Grid size={6}>
							<Button
								variant='outlined'
								className='w-full border-gray-400! text-gray-500!'
								onClick={() => onClose && onClose()}
							>
								Cancel
							</Button>
						</Grid>
					</Grid>
				</Stack>
			</Container>
		</Drawer>
	)
}

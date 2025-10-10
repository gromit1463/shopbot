import { useState, ReactElement } from 'react'
import { Stack, Grid, Button } from '@mui/material'
import Keypad from './keypad'
import SettingsDrawer from './settings-drawer'
import { useShoppingListState } from '@/stores/shopping-list-state'
import { DrawerProps } from '@/types'

export default function Budget({ open, onClose }: DrawerProps): ReactElement {
	const { setBudget } = useShoppingListState()
	const [value, setValue] = useState<number>(0)

	return (
		<SettingsDrawer open={open} title='Set your budget' onClose={onClose}>
			<Stack spacing={2}>
				<Keypad onChange={setValue} />
				<Grid container spacing={1}>
					<Grid size={6}>
						<Button
							variant='contained'
							className='w-full bg-green-400'
							onClick={() => {
								setBudget(value)
								onClose?.()
							}}
						>
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
		</SettingsDrawer>
	)
}

import { useState, ReactElement } from 'react'
import { Box, Stack, Grid, Button } from '@mui/material'
import Keypad from './keypad'
import SettingsDrawer from './settings-drawer'
import { useShoppingListState } from '@/stores/shopping-list-state'
import { DrawerProps } from '@/types'

export default function TaxRate({ open, onClose }: DrawerProps): ReactElement {
	const { setTaxRate } = useShoppingListState()
	const [value, setValue] = useState<number>(0)

	return (
		<SettingsDrawer open={open} title='Set your tax rate (%)' onClose={onClose}>
			<Stack spacing={2}>
				<Keypad onChange={setValue} />
				<Grid container spacing={1}>
					<Grid size={6}>
						<Button
							variant='contained'
							className='w-full bg-green-400 pl-1! pr-1!'
							onClick={() => {
								setTaxRate(value)
								onClose && onClose()
							}}
						>
							Set Tax Rate
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

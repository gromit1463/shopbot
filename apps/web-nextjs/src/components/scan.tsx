'use client'

import React, { useState, ReactElement } from 'react'
import { Stack, Button, Box } from '@mui/material'
// import Keypad from './keypad'
import SettingsDrawer from './settings-drawer'
//import { useShoppingListState } from '@/stores/shopping-list-state'
import { DrawerProps } from '@/types'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function Scan({ open, onClose }: DrawerProps): ReactElement {
	const [scanToggle, setScanToggle] = useState<string>('scan')
	const [scanError, setScanError] = useState<boolean>(false)

	const closeDrawer = async () => {
		onClose?.()
	}

	function handleScanToggle(_evt: React.MouseEvent<HTMLElement>, newValue: string) {
		if (newValue === 'scan') {
			//startScan()
		}

		setScanToggle(newValue)
	}

	return (
		<SettingsDrawer open={open} onClose={closeDrawer} title='Scan Item' height='100vh'>
			<Stack spacing={6}>
				<ToggleButtonGroup value={scanToggle} exclusive onChange={handleScanToggle}>
					<ToggleButton className='w-[50%]' value='scan' aria-label='Scan Barcode'>
						Scan Barcode
					</ToggleButton>
					<ToggleButton
						className='w-[50%]'
						value='manual'
						aria-label='Enter Manually'
					>
						Enter Manually
					</ToggleButton>
				</ToggleButtonGroup>
				{scanError && (
					<Stack spacing={2} alignItems='center'>
						<Box>Something went wrong with the scan.</Box>
						<Button
							variant='contained'
							onClick={() => {
								setScanError(false)
								//startScan()
							}}
						>
							Try again
						</Button>
						<Box>— or —</Box>
						<Button
							variant='contained'
							onClick={() => {
								setScanError(false)
								setScanToggle('manual')
							}}
						>
							Enter manually
						</Button>
					</Stack>
				)}
			</Stack>
		</SettingsDrawer>
	)
}

import React, { useState, useEffect, ReactElement } from 'react'
import { Stack, Button, Icon } from '@mui/material'
import Keypad from './keypad'
import SettingsDrawer from './settings-drawer'
import { useShoppingListState } from '@/stores/shopping-list-state'
import { DrawerProps } from '@/types'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function Scan({ open, onClose }: DrawerProps): ReactElement {
	const [scanToggle, setScanToggle] = useState<string>('scan')

	const startScan = async () => {
		// Check camera permission
		// This is just a simple example, check out the better checks below
		const status = await BarcodeScanner.checkPermission({ force: true })

		// make background of WebView transparent
		// note: if you are using ionic this might not be enough, check below
		//BarcodeScanner.hideBackground()

		await BarcodeScanner.prepare()
		const result = await BarcodeScanner.startScan() // start scanning and wait for a result

		// if the result has content
		if (result.hasContent) {
			console.log('barcode', result.content) // log the raw scanned content
			BarcodeScanner.showBackground()
			BarcodeScanner.stopScan()
		}
	}

	const closeDrawer = async () => {
		BarcodeScanner.showBackground()
		BarcodeScanner.stopScan()
		onClose && onClose()
	}

	function handleScanToggle(_evt: React.MouseEvent<HTMLElement>, newValue: string) {
		if (newValue === 'scan') {
			startScan()
		}

		setScanToggle(newValue)
	}

	useEffect(() => {
		if (open) {
			startScan()
		}
	}, [open])

	return (
		<SettingsDrawer open={open} onClose={closeDrawer} title='Scan Item' height='100vh'>
			<Stack spacing={2}>
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
			</Stack>
		</SettingsDrawer>
	)
}

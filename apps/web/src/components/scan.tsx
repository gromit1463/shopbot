import React, { useState, useEffect, ReactElement } from 'react'
import { Stack, Button, Box, CircularProgress } from '@mui/material'
import Keypad from './keypad'
import SettingsDrawer from './settings-drawer'
import { useShoppingListState } from '@/stores/shopping-list-state'
import { DrawerProps, ALL_BARCODE_FORMATS } from '@/types'
import { Capacitor } from '@capacitor/core'
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function Scan({ open, onClose }: DrawerProps): ReactElement {
	const [scanToggle, setScanToggle] = useState<string>('scan')
	const [cameraLoading, setCameraLoading] = useState<boolean>(true)
	const [loadingProduct, setLoadingProduct] = useState<boolean>(false)
	const [scanError, setScanError] = useState<boolean>(false)

	const startScan = async () => {
		// Request permission
		// const status = await CapacitorBarcodeScanner.checkPermission({ force: true })
		// if (!status.granted) {
		// 	console.warn('Camera permission not granted')
		// 	return
		// }

		setCameraLoading(false)

		// Call scan
		const result = await CapacitorBarcodeScanner.scanBarcode({
			hint: ALL_BARCODE_FORMATS,
		})

		if (result && result.ScanResult) {
			console.log('Scanned content:', result.ScanResult)
			console.log('Format:', result.format)
		} else {
			setScanError(true)
			console.log('Scan cancelled or no barcode found')
		}
	}

	const closeDrawer = async () => {
		//await CapacitorBarcodeScanner.stopScan()
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
				{cameraLoading && (
					<>
						<Box>Preparing the barcode scanner...</Box>
						<CircularProgress />
					</>
				)}
				{scanError && (
					<Stack spacing={2} alignItems='center'>
						<Box>Something went wrong with the scan.</Box>
						<Button
							variant='contained'
							onClick={() => {
								setScanError(false)
								startScan()
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

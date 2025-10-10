'use client'

import React, { useRef, useState, useEffect, ReactElement } from 'react'
import { Stack, Button, Box, CircularProgress } from '@mui/material'
import Keypad from './keypad'
import SettingsDrawer from './settings-drawer'
import { useShoppingListState } from '@/stores/shopping-list-state'
import { DrawerProps, ALL_BARCODE_FORMATS } from '@/types'
import { Capacitor } from '@capacitor/core'
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner'
import { BrowserMultiFormatReader } from '@zxing/browser'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function Scan({ open, onClose }: DrawerProps): ReactElement {
	const [scanToggle, setScanToggle] = useState<string>('scan')
	const [cameraLoading, setCameraLoading] = useState<boolean>(true)
	const [loadingProduct, setLoadingProduct] = useState<boolean>(false)
	const [scanError, setScanError] = useState<boolean>(false)
	const videoRef = useRef<HTMLVideoElement>(null)

	let webScanner = null

	// const startScan = async () => {
	// 	if (Capacitor.getPlatform() === 'web') {
	// 	} else {
	// 		setCameraLoading(false)

	// 		// Call scan
	// 		const result = await CapacitorBarcodeScanner.scanBarcode({
	// 			hint: ALL_BARCODE_FORMATS,
	// 		})

	// 		if (result && result.ScanResult) {
	// 			console.log('Scanned content:', result.ScanResult)
	// 			console.log('Format:', result.format)
	// 		} else {
	// 			setScanError(true)
	// 			console.log('Scan cancelled or no barcode found')
	// 		}
	// 	}
	// }

	const closeDrawer = async () => {
		webScanner && webScanner.stop()
		onClose && onClose()
	}

	function handleScanToggle(_evt: React.MouseEvent<HTMLElement>, newValue: string) {
		if (newValue === 'scan') {
			startScan()
		}

		setScanToggle(newValue)
	}

	const codeReader = new BrowserMultiFormatReader()
	let stop = false
	let controls = null

	const startScanner = async () => {
		try {
			if (Capacitor.getPlatform() === 'web') {
				const devices = await BrowserMultiFormatReader.listVideoInputDevices()
				if (!devices.length) {
					console.error('No camera devices found')
					return
				}
				// console.log('devices', devices)

				const selectedDeviceId = devices[0].deviceId

				controls = await codeReader.decodeFromConstraints(
					{
						video: {
							deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
							width: { ideal: 1280 },
							height: { ideal: 720 },
						},
					},
					videoRef.current,
					(res, err, ctrl) => {
						if (stop) return
						if (res) {
							const text = res.getText()
							//setResult(text)
							console.log('text', text)

							// optionally stop after first successful scan
							ctrl.stop()
						}
						if (err) {
							if (err.name !== 'NotFoundException') {
								console.error(err)
							} else {
								console.log('Waiting for a barcode...')
							}
						}
					}
				)
			} else {
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
		} catch (err) {
			console.error('Error starting scanner:', err)
		}
	}

	useEffect(() => {
		if (open) {
			startScanner()
		} else {
			stop = true
			controls && controls.stop()
			const stream = videoRef.current?.srcObject as MediaStream | null
			stream?.getTracks().forEach((track) => track.stop())
		}
	}, [open])

	return (
		<SettingsDrawer open={open} onClose={closeDrawer} title='Scan Item' height='100vh'>
			<Stack spacing={6}>
				<div className='barcode-scanner flex flex-col items-center space-y-4'>
					<video ref={videoRef} className='rounded shadow' />
				</div>
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

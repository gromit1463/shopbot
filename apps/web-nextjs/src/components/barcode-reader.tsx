/*
 *	ref: https://medium.com/@riteshnzee/zxing-barcode-qr-code-scanner-using-next-js-45a55783c0bb
 *
 * Borrowed heavliy from this website to make the barcode scanner work.
 */

'use client'

import React, { useRef, useEffect, useCallback, ReactElement } from 'react'
import {
	BarcodeReaderProps,
	BarcodeReaderResults,
	UpcDatabaseResponse,
	ALL_BARCODE_FORMATS,
} from '@/types'
import { Capacitor } from '@capacitor/core'
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { Result } from '@zxing/library'
import { fetchapi } from '@/lib/fetch'

// Aspect ratio and crop size factor
const DESIRED_CROP_ASPECT_RATIO = 1 / 1
const CROP_SIZE_FACTOR = 0.4

export default function BarcodeReader({
	onScan,
	onError,
}: BarcodeReaderProps): ReactElement {
	const videoRef = useRef<HTMLVideoElement>(null)
	const displayCroppedCanvasRef = useRef<HTMLCanvasElement>(null)
	const cropOverlayRef = useRef<HTMLDivElement>(null)
	const codeReader = useRef(new BrowserMultiFormatReader())

	const lookupBarcode = useCallback(
		async (barcode: string) => {
			const res = (await fetchapi('GET', `${process.env.API_URL}/barcode`, {
				search: barcode,
			})) as UpcDatabaseResponse

			if (res?.success) {
				onScan?.({
					barcode: res.barcode,
					title: res.title,
					msrp: parseFloat(res.msrp || '0'),
				} as BarcodeReaderResults)
			}
		},
		[onScan]
	)

	useEffect(() => {
		;(async () => {
			try {
				if (Capacitor.getPlatform() === 'web') {
					let intervalId: NodeJS.Timeout | null = null

					const startCamera = async () => {
						try {
							const stream = await navigator.mediaDevices.getUserMedia({
								video: { facingMode: { ideal: 'environment' } },
							})
							if (videoRef.current) {
								videoRef.current.srcObject = stream
								videoRef.current.onloadedmetadata = () => {
									videoRef.current?.play()
									intervalId = setInterval(captureFrameAndCrop, 100)
								}
							}
						} catch (err) {
							console.error('Camera error:', err)
							onError?.('Unable to access the camera. Please check permissions.')
						}
					}

					const captureFrameAndCrop = () => {
						if (
							!videoRef.current ||
							!displayCroppedCanvasRef.current ||
							!cropOverlayRef.current
						)
							return

						const video = videoRef.current
						const displayCanvas = displayCroppedCanvasRef.current
						const displayContext = displayCanvas.getContext('2d')
						const overlayDiv = cropOverlayRef.current

						if (!displayContext) return

						const tempCanvas = document.createElement('canvas')
						const tempContext = tempCanvas.getContext('2d')
						if (!tempContext) return

						tempCanvas.width = video.videoWidth
						tempCanvas.height = video.videoHeight
						tempContext.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height)

						let cropWidth, cropHeight
						const videoRatio = video.videoWidth / video.videoHeight

						if (videoRatio / DESIRED_CROP_ASPECT_RATIO > 1) {
							cropHeight = video.videoHeight * CROP_SIZE_FACTOR
							cropWidth = cropHeight * DESIRED_CROP_ASPECT_RATIO
						} else {
							cropWidth = video.videoWidth * CROP_SIZE_FACTOR
							cropHeight = cropWidth / DESIRED_CROP_ASPECT_RATIO
						}

						cropWidth = Math.min(cropWidth, video.videoWidth)
						cropHeight = Math.min(cropHeight, video.videoHeight)

						const MIN_CROP_WIDTH = 240
						const MAX_CROP_WIDTH = 600
						const MIN_CROP_HEIGHT = 240
						const MAX_CROP_HEIGHT = 600

						cropWidth = Math.max(
							MIN_CROP_WIDTH,
							Math.min(MAX_CROP_WIDTH, cropWidth)
						)
						cropHeight = Math.max(
							MIN_CROP_HEIGHT,
							Math.min(MAX_CROP_HEIGHT, cropHeight)
						)

						const cropX = (video.videoWidth - cropWidth) / 2
						const cropY = (video.videoHeight - cropHeight) / 2

						displayCanvas.width = cropWidth
						displayCanvas.height = cropHeight

						displayContext.drawImage(
							tempCanvas,
							cropX,
							cropY,
							cropWidth,
							cropHeight,
							0,
							0,
							cropWidth,
							cropHeight
						)

						overlayDiv.style.position = 'absolute'
						overlayDiv.style.left = `${(cropX / video.videoWidth) * 100}%`
						overlayDiv.style.top = `${(cropY / video.videoHeight) * 100}%`
						overlayDiv.style.width = `${(cropWidth / video.videoWidth) * 100}%`
						overlayDiv.style.height = `${(cropHeight / video.videoHeight) * 100}%`
						overlayDiv.style.border = '2px solid white'
						overlayDiv.style.borderRadius = '0.5rem'
						overlayDiv.style.pointerEvents = 'none'
						overlayDiv.style.boxSizing = 'border-box'

						const decodeCanvas = async () => {
							try {
								const result: Result =
									await codeReader.current.decodeFromCanvas(displayCanvas)
								lookupBarcode(result.getText())
							} catch (err: unknown) {
								if (err instanceof Error && err.name !== 'NotFoundException') {
									console.error('Decoding error:', err)
								}
							}
						}

						decodeCanvas() // Call the async function
					}

					startCamera()

					return () => {
						if (videoRef.current?.srcObject) {
							const tracks = (
								videoRef.current.srcObject as MediaStream
							).getTracks()
							tracks.forEach((track) => track.stop())
						}
						if (intervalId) clearInterval(intervalId)
					}
				} else {
					// Call scan
					const result = await CapacitorBarcodeScanner.scanBarcode({
						hint: ALL_BARCODE_FORMATS,
					})

					if (!result || !result.ScanResult) {
						console.log('Scan cancelled or no barcode found')
					}
				}
			} catch (err) {
				console.error('Error starting scanner:', err)
			}
		})()
	}, [lookupBarcode, onError])

	return (
		<>
			<div
				style={{
					position: 'relative',
					width: '100%',
					maxWidth: '400px',
					overflow: 'hidden',
				}}
			>
				<video
					ref={videoRef}
					autoPlay
					playsInline
					muted
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
				<div ref={cropOverlayRef}></div>
			</div>
			<canvas
				ref={displayCroppedCanvasRef}
				style={{
					border: '2px solid #3b82f6',
					borderRadius: '0.5rem',
					boxShadow:
						'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
					maxWidth: '100%',
					height: 'auto',
					display: 'none',
					minWidth: '240px',
					minHeight: '80px',
				}}
			>
				Your browser does not support the canvas element.
			</canvas>
		</>
	)
}

import { useState, ReactElement } from 'react'
import { KeypadProps } from '@/types'
import { Grid, Button, Icon, Box, Stack } from '@mui/material'

export default function Keypad({
	title,
	initialValue,
	onAccept,
	onCancel,
}: KeypadProps): ReactElement {
	const buttonClass = 'w-[80px]! min-w-[80px]! h-[50px]! font-bold text-2xl!'
	const [value, setValue] = useState<string>('0')

	return (
		<Stack spacing={2}>
			{title !== undefined && title !== null && title}
			<Box className='text-3xl text-right p-2 border rounded-sm'>{value}</Box>
			<Grid container spacing={1} className='w-[260px]'>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						7
					</Button>
				</Grid>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						8
					</Button>
				</Grid>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						9
					</Button>
				</Grid>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						4
					</Button>
				</Grid>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						5
					</Button>
				</Grid>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						6
					</Button>
				</Grid>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						1
					</Button>
				</Grid>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						2
					</Button>
				</Grid>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						3
					</Button>
				</Grid>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						<Icon fontSize='small' className='material-symbols-rounded'>
							backspace
						</Icon>
					</Button>
				</Grid>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						0
					</Button>
				</Grid>
				<Grid size={4}>
					<Button variant='outlined' className={buttonClass}>
						.
					</Button>
				</Grid>
			</Grid>
		</Stack>
	)
}

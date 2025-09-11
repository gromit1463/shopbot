import { useState, useEffect, ReactElement } from 'react'
import { KeypadProps } from '@/types'
import { Grid, Button, Icon, Box, Stack } from '@mui/material'

export default function Keypad({
	title,
	initialValue,
	onChange,
}: KeypadProps): ReactElement {
	const buttonClass = 'w-[80px]! min-w-[80px]! h-[50px]! font-bold text-2xl!'
	const [value, setValue] = useState<string>('0')

	function addDigit(digit: string) {
		if ((digit === '.' && value.indexOf('.') > -1) || value.length >= 10) {
			return
		}

		if (/^[0-9]$/.test(digit) || digit === '.') {
			setValue((prev) => {
				if (prev === '0') {
					if (digit === '.') {
						return '0.'
					} else {
						return digit
					}
				} else {
					return prev + digit
				}
			})
		}
	}

	function removeDigit() {
		setValue((prev) => {
			if (prev.length <= 1) {
				return '0'
			} else {
				return prev.substring(0, prev.length - 1)
			}
		})
	}

	useEffect(() => {
		onChange && onChange(parseFloat(value))
	}, [value])

	return (
		<Stack spacing={2}>
			{title !== undefined && title !== null && title}
			<Box className='text-3xl text-right min-w-[260px] max-w-[260px] m-auto! p-2 border rounded-sm'>
				{value}
			</Box>
			<Grid container spacing={1} className='w-[260px] m-auto! py-3'>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => addDigit('7')}
					>
						7
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => addDigit('8')}
					>
						8
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => addDigit('9')}
					>
						9
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => addDigit('4')}
					>
						4
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => addDigit('5')}
					>
						5
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => addDigit('6')}
					>
						6
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => addDigit('1')}
					>
						1
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => addDigit('2')}
					>
						2
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => addDigit('3')}
					>
						3
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => removeDigit()}
					>
						<Icon fontSize='small' className='material-symbols-rounded'>
							backspace
						</Icon>
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => addDigit('0')}
					>
						0
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						className={buttonClass}
						onClick={() => addDigit('.')}
					>
						.
					</Button>
				</Grid>
			</Grid>
		</Stack>
	)
}

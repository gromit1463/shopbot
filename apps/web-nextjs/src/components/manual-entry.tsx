import { ReactElement, useState } from 'react'
import { ManualEntryProps } from '@/types'
import { TextField } from '@mui/material'
import Keypad from './keypad'

export default function ManualEntry({ onDone }: ManualEntryProps): ReactElement {
	const [name, setName] = useState<string>('')
	const [price, setPrice] = useState<number>(0)
	return (
		<>
			<TextField
				label='Product Name'
				variant='outlined'
				value={name}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setName(e.target.value)
				}}
			/>
			<Keypad title='Product Price' onChange={setPrice} />
		</>
	)
}

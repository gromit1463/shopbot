import { ReactElement } from 'react'
import { Table, TableBody, TableRow, TableCell } from '@mui/material'
import { ShoppingListState } from '@/types'
import { useShoppingListState } from '@/stores/shopping-list-state'

export default function ProgressBar(): ReactElement {
	const { budget, subTotal, taxRate, taxAmount, total } =
		useShoppingListState() as ShoppingListState

	const subTotalW: number = (subTotal / budget) * 100
	const taxAmountW: number = (taxAmount / budget) * 100

	return (
		<div className='w-full sticky z-1 bg-white' style={{ top: 0 }}>
			<Table size='small'>
				<TableBody>
					<TableRow>
						<TableCell className='w-[1%] whitespace-nowrap'>Subtotal:</TableCell>
						<TableCell className='w-[49%]' align='right'>
							{subTotal?.toFixed(2)}
						</TableCell>
						<TableCell className='w-[1%] whitespace-nowrap'>Budget:</TableCell>
						<TableCell className='w-[49%]' align='right'>
							<span
								className={total > budget ? 'font-bold px-1 -mr-1' : 'px-1 -mr-1'}
							>
								{budget?.toFixed(2)}
							</span>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='w-[1%] whitespace-nowrap'>
							Tax ({taxRate}%):
						</TableCell>
						<TableCell className='w-[49%]' align='right'>
							{taxAmount?.toFixed(2)}
						</TableCell>
						<TableCell className='w-[1%] whitespace-nowrap'>Total:</TableCell>
						<TableCell className='w-[49%]' align='right'>
							<span
								className={
									total > budget
										? 'text-white font-bold bg-red-500 px-1 -mr-1'
										: ' px-1 -mr-1'
								}
							>
								{total?.toFixed(2)}
							</span>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<div className='w-full h-6 overflow-hidden bg-green-300 whitespace-nowrap'>
				<div
					className='h-6 bg-red-400 inline-block transition-[width] delay-250 duration-1000'
					style={{ width: `${subTotalW}%` }}
				></div>
				<div
					className='h-6 bg-yellow-400 inline-block transition-[width] delay-250 duration-1000'
					style={{ width: `${taxAmountW}%` }}
				></div>
			</div>
		</div>
	)
}

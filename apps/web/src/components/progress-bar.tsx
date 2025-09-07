import { useGlobalContext } from '@/context/global'
import { Table, TableBody, TableRow, TableCell } from '@mui/material'

export default function ProgressBar(): ReactElment {
	const { budget, subTotal, taxRate, taxAmount, total } = useGlobalContext()

	const subTotalW: number = (subTotal / budget) * 100
	const taxAmountW: number = (taxAmount / budget) * 100

	return (
		<div className='w-full sticky z-1 bg-white' style={{ top: 0 }}>
			<Table size='small'>
				<TableBody>
					<TableRow>
						<TableCell>Subtotal:</TableCell>
						<TableCell align='right'>{subTotal?.toFixed(2)}</TableCell>
						<TableCell>Budget:</TableCell>
						<TableCell align='right'>
							<span
								className={total > budget ? 'font-bold px-1 -mr-1' : 'px-1 -mr-1'}
							>
								{budget?.toFixed(2)}
							</span>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Tax ({taxRate}%):</TableCell>
						<TableCell align='right'>{taxAmount?.toFixed(2)}</TableCell>
						<TableCell>Total:</TableCell>
						<TableCell align='right'>
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

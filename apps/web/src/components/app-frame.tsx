'use client'

import { useState } from 'react'
import { AppFrameProps } from '@/types'
import { Container, BottomNavigation, BottomNavigationAction, Icon } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'
import BudgetDialog from './budget'

export default function AppFrame({ children }: AppFrameProps): ReactElement {
	const [budgetOpen, setBudgetOpen] = useState<boolean>(false)

	return (
		<ThemeProvider theme={theme}>
			<Container className='p-0!'>
				{children}
				<BottomNavigation showLabels className='z-1 border-t border-gray-300'>
					<BottomNavigationAction
						sx={{
							minWidth: '55px',
							maxWidth: '55px',
						}}
						label='Budget'
						icon={
							<Icon fontSize='medium' className='material-symbols-rounded'>
								wallet
							</Icon>
						}
						onClick={() => setBudgetOpen(true)}
					/>
					<BottomNavigationAction
						sx={{
							minWidth: '55px',
							maxWidth: '55px',
						}}
						label='Tax'
						icon={
							<Icon fontSize='medium' className='material-symbols-rounded'>
								percent
							</Icon>
						}
					/>
					<BottomNavigationAction
						sx={{
							'& .MuiSvgIcon-root': {
								fontSize: '2rem', // make the icon bigger
							},
							minWidth: '55px',
							maxWidth: '70px',
							minHeight: '55px',
							maxHeight: '70px',
							backgroundColor: 'primary.main',
							color: 'white',
							borderRadius: '50%',
							p: 1,
							mx: 2,
							mt: -2, // move up so it "floats"
						}}
						label='Scan'
						icon={
							<Icon fontSize='medium' className='material-symbols-rounded'>
								barcode_scanner
							</Icon>
						}
					/>
					<BottomNavigationAction
						sx={{
							minWidth: '55px',
							maxWidth: '55px',
						}}
						label='Settings'
						icon={
							<Icon fontSize='medium' className='material-symbols-rounded'>
								settings
							</Icon>
						}
					/>
					<BottomNavigationAction
						sx={{
							minWidth: '55px',
							maxWidth: '55px',
						}}
						label='Clear'
						icon={
							<Icon fontSize='medium' className='material-symbols-rounded'>
								delete
							</Icon>
						}
					/>
				</BottomNavigation>
				<BudgetDialog open={budgetOpen} onClose={() => setBudgetOpen(false)} />
			</Container>
		</ThemeProvider>
	)
}

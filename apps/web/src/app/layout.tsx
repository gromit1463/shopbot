import type { Metadata } from 'next'
import './globals.css'
import GlobalProvider from '@/context/global'
import { Container, BottomNavigation, BottomNavigationAction, Icon } from '@mui/material'

export const metadata: Metadata = {
	title: 'ShopBot',
	description: 'Your partner for shopping with a budget',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<link
					href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded'
					rel='stylesheet'
				/>
			</head>
			<body>
				<GlobalProvider>
					<Container>
						{children}
						<BottomNavigation showLabels className='z-1 border-t border-gray-300'>
							<BottomNavigationAction
								sx={{
									maxWidth: '80px',
								}}
								label='Budget'
								icon={
									<Icon fontSize='large' className='material-symbols-rounded'>
										wallet
									</Icon>
								}
							/>

							<BottomNavigationAction
								sx={{
									maxWidth: '80px',
								}}
								label='Tax Rate'
								icon={
									<Icon fontSize='large' className='material-symbols-rounded'>
										percent
									</Icon>
								}
							/>
							<BottomNavigationAction
								sx={{
									'& .MuiSvgIcon-root': {
										fontSize: '3rem', // make the icon bigger
									},
									maxWidth: '80px',
									maxHeight: '80px',
									backgroundColor: 'primary.main',
									color: 'white',
									borderRadius: '50%',
									p: 1,
									mx: 2,
									mt: -3, // move up so it "floats"
								}}
								label='Scan'
								icon={
									<Icon fontSize='large' className='material-symbols-rounded'>
										barcode_scanner
									</Icon>
								}
							/>
							<BottomNavigationAction
								sx={{
									maxWidth: '80px',
								}}
								label='Tax Rate'
								icon={
									<Icon fontSize='large' className='material-symbols-rounded'>
										percent
									</Icon>
								}
							/>
							<BottomNavigationAction
								sx={{
									maxWidth: '80px',
								}}
								label='Clear List'
								icon={
									<Icon fontSize='large' className='material-symbols-rounded'>
										delete
									</Icon>
								}
							/>
						</BottomNavigation>
					</Container>
				</GlobalProvider>
			</body>
		</html>
	)
}

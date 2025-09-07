import type { Metadata } from 'next'
import './globals.css'
import GlobalProvider from '@/context/global'
import AppFrame from '@/components/app-frame'

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
					<AppFrame>{children}</AppFrame>
				</GlobalProvider>
			</body>
		</html>
	)
}

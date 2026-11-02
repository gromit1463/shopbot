import type { Metadata } from 'next'
import 'material-symbols/rounded.css'
import './globals.css'
import AppFrame from '@/components/app-frame'

export const metadata: Metadata = {
	title: 'ShopBot',
	description: 'Your partner for shopping with a budget',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head></head>
			<body>
				<AppFrame>{children}</AppFrame>
			</body>
		</html>
	)
}

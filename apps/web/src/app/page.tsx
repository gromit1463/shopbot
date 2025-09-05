'use client'

import ProgressBar from '@/components/progress-bar'
import ShoppingList from '@/components/shopping-list'

export default function Home(): ReactElement {
	return (
		<>
			<ProgressBar />
			<ShoppingList />
		</>
	)
}

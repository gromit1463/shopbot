import { Platform, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks/use-theme'

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { BottomTabInset, Spacing } from '@/constants/theme'
import styles from '@/components/styles/styles'

export default function CartContents() {
	const safeAreaInsets = useSafeAreaInsets()
	const insets = {
		...safeAreaInsets,
		bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
	}
	const theme = useTheme()

	const contentPlatformStyle = Platform.select({
		android: {
			paddingTop: insets.top,
			paddingLeft: insets.left,
			paddingRight: insets.right,
			paddingBottom: insets.bottom,
		},
		web: {
			paddingTop: Spacing.six,
			paddingBottom: Spacing.four,
		},
	})

	return (
		<ScrollView
			style={[styles.scrollView, { backgroundColor: theme.background }]}
			contentInsetAdjustmentBehavior='automatic'
			contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}
		>
			<ThemedView style={styles.container}>
				<ThemedView style={styles.titleContainer}>
					<ThemedText type='subtitle'>Cart Contents</ThemedText>
				</ThemedView>
			</ThemedView>
		</ScrollView>
	)
}

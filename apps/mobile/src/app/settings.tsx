import { Image } from 'expo-image'
import { SymbolView } from 'expo-symbols'
import { Platform, Pressable, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ExternalLink } from '@/components/external-link'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Collapsible } from '@/components/ui/collapsible'
import { WebBadge } from '@/components/web-badge'
import { BottomTabInset, Spacing } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import styles from '@/components/styles/styles'

export default function SettingsScreen() {
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
			contentInset={insets}
			contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}
		>
			<ThemedView style={styles.container}>
				<ThemedView style={styles.titleContainer}>
					<ThemedText type='subtitle'>Settings</ThemedText>
				</ThemedView>
			</ThemedView>
		</ScrollView>
	)
}

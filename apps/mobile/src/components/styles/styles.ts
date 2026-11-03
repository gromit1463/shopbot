import { StyleSheet } from 'react-native'
import { MaxContentWidth, Spacing } from '@/constants/theme'

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		paddingVertical: 0,
	},
	contentContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	container: {
		maxWidth: MaxContentWidth,
		flexGrow: 1,
	},
	titleContainer: {
		alignItems: 'flex-start',
		paddingHorizontal: Spacing.three,
		paddingVertical: Spacing.two,
	},
	centerText: {
		textAlign: 'center',
	},
	pressed: {
		opacity: 0.7,
	},
	linkButton: {
		flexDirection: 'row',
		paddingHorizontal: Spacing.three,
		paddingVertical: Spacing.two,
		borderRadius: Spacing.five,
		justifyContent: 'center',
		gap: Spacing.one,
		alignItems: 'center',
	},
	sectionsWrapper: {
		gap: Spacing.five,
		paddingHorizontal: Spacing.three,
		paddingTop: Spacing.three,
	},
	collapsibleContent: {
		alignItems: 'center',
	},
})

export default styles

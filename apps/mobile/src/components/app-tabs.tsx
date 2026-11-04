import { NativeTabs } from 'expo-router/native-tabs'
import { useColorScheme } from 'react-native'

import { Colors } from '@/constants/theme'

export default function AppTabs() {
	const scheme = useColorScheme()
	const colors = Colors[scheme === 'dark' ? 'dark' : 'light']

	return (
		<NativeTabs
			backgroundColor={colors.background}
			indicatorColor={colors.backgroundElement}
			labelStyle={{ selected: { color: colors.text } }}
		>
			<NativeTabs.Trigger name='list'>
				<NativeTabs.Trigger.Label>List</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon
					src={require('@/assets/images/tabIcons/list.png')}
					renderingMode='template'
				/>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name='cart'>
				<NativeTabs.Trigger.Label>Cart</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon
					src={require('@/assets/images/tabIcons/cart.png')}
					renderingMode='template'
				/>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name='settings'>
				<NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon
					src={require('@/assets/images/tabIcons/settings.png')}
					renderingMode='template'
				/>
			</NativeTabs.Trigger>
		</NativeTabs>
	)
}

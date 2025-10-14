import { Preferences } from '@capacitor/preferences'
import { StorageItem } from '@/types'
;(async () => {
	await Preferences.configure({
		group: 'ShopBot',
	})
})()

// async function
export function put({ key, value }: StorageItem) {
	return Preferences.set({ key, value: JSON.stringify(value) })
}

//async function
export function multiPut(multiValue: StorageItem[]) {
	const tasks = multiValue.map(({ key, value }) =>
		Preferences.set({ key, value: JSON.stringify(value) })
	)

	return Promise.all(tasks)
}

export function has(key: string) {
	;(async () => {
		const result = await Preferences.keys()

		return result?.keys?.includes(key)
	})()
}

// async function
export function get(key: string) {
	return new Promise((resolve, reject) => {
		try {
			;(async () => {
				const result = await Preferences.get({ key })
				if (result) {
					try {
						resolve(JSON.parse(result?.value || ''))
					} catch (err) {
						resolve(null)
					}
				} else {
					resolve(null)
				}
			})()
		} catch (err) {
			console.error(err)
			reject(err)
		}
	})
}

export function remove(key: string) {
	;(async () => {
		await Preferences.remove({ key })
	})()
}

import { Preferences } from '@capacitor/preferences'
import { StorageItem } from '@/types/'
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

export function has(key) {
	;(async () => {
		const keys = await Preferences.keys()

		return keys.includes(key)
	})()
}

// async function
export function get(key: string) {
	// eslint-disable-next-line no-unused-vars
	return new Promise((resolve, reject) => {
		try {
			;(async () => {
				const value = await Preferences.get({ key })
				if (value) {
					try {
						resolve(JSON.parse(value.value))
					} catch (err) {
						resolve(null)
					}
				} else {
					resolve(null)
				}
			})()
		} catch (err) {
			console.log(err)
			resolve(null)
		}
	})
}

export function remove(key) {
	;(async () => {
		await Preferences.remove({ key })
	})()
}

// theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
	typography: {
		fontSize: 14,
	},
})

// Wrap the theme with responsive font sizes
theme = responsiveFontSizes(theme)

export default theme

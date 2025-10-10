import { ReactElement } from 'react'
import { Box, Drawer, Container, Stack, Button, Icon } from '@mui/material'
import { SettingsDrawerProps } from '@/types'

export default function SettingsDrawer({
	open,
	title,
	height,
	onClose,
	children,
}: SettingsDrawerProps): ReactElement {
	return (
		<Drawer
			PaperProps={{
				sx: {
					borderTopLeftRadius: '0.75rem',
					borderTopRightRadius: '0.75rem',
					overflow: 'hidden',
					height,
					padding: '15px 0',
				},
			}}
			open={open}
			anchor='bottom'
		>
			<Container>
				<Stack className='w-full content-center'>
					<Stack className='drawer-header pb-3' direction='row' spacing={2}>
						<Button
							className='self-start max-w-[36px]! min-w-[36px]!'
							variant='text'
							onClick={() => onClose && onClose()}
						>
							<Icon fontSize='large' className='material-symbols-rounded'>
								close
							</Icon>
						</Button>
						<Box className='w-full text-xl/11 text-center font-bold'>
							{title || ''}
						</Box>
						<Box className='self-start max-w-[36px]! min-w-[36px]!'></Box>
					</Stack>
					<div>{children}</div>
				</Stack>
			</Container>
		</Drawer>
	)
}

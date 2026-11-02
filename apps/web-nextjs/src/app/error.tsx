'use client'

import { NextPage } from 'next'
import Link from 'next/link'

interface ErrorProps {
	statusCode?: number
}

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
	return (
		<div style={{ textAlign: 'center', padding: '4rem' }}>
			<h1>{statusCode ? `Error ${statusCode}` : 'An unexpected error occurred'}</h1>
			<p>
				{statusCode === 404
					? "The page you're looking for could not be found."
					: 'Something went wrong on our end.'}
			</p>
			<Link href='/'>
				<a style={{ color: 'blue', textDecoration: 'underline' }}>Go back home</a>
			</Link>
		</div>
	)
}

// Only needed for SSG/SSR, optional for static export
ErrorPage.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default ErrorPage

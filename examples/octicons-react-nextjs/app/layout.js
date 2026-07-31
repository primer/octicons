export const metadata = {
  title: 'Octicons React',
  description: 'A Next.js example using @primer/octicons-react',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/primer/build/build.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}

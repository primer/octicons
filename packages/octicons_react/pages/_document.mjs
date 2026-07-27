import React from 'react'
import Document, {Head, Html, Main, NextScript} from 'next/document'

export default class PrimerDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://unpkg.com/primer/build/build.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

import React from 'react'
import Document, { Head, Main, NextScript, DocumentContext, DocumentProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

interface Props extends DocumentProps {
  styleTags: JSX.Element
}

export default class CustomDocument extends Document<Props> {
  static async getInitialProps({ renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet()

    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="ko">
        <Head>
          <title>Nodelab</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

import {Box, Breadcrumb, Button, Flex, Grid} from '@primer/components'
import {Container, Head, Header, Sidebar} from '@primer/gatsby-theme-doctocat'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import {H1, H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import Paragraph from '@primer/gatsby-theme-doctocat/src/components/paragraph'
import blobStream from 'blob-stream'
import copy from 'copy-to-clipboard'
import download from 'downloadjs'
import {Link} from 'gatsby'
import PDFDocument from 'pdfkit/js/pdfkit.standalone'
import React from 'react'
import svgToPdf from 'svg-to-pdfkit'
import icons from '../../../lib/build/data.json'
import Icon from '../components/icon'
import IconViewer from '../components/icon-viewer'

export default function IconPage({pageContext}) {
  const icon = icons[pageContext.name]
  const svg = getSvg(icon)
  const [pdf, setPdf] = React.useState(null)

  React.useEffect(
    () => {
      getPdf(icon).then(blob => setPdf(blob))
    },
    [icon]
  )

  const [copied, setCopied] = React.useState(false)

  React.useEffect(
    () => {
      const timeout = setTimeout(() => {
        if (copied) setCopied(false)
      }, 1000)

      return () => clearTimeout(timeout)
    },
    [copied]
  )

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Head title={pageContext.name} />
      <Header />
      <Flex flex="1 1 auto" flexDirection="row" css={{zIndex: 0}}>
        <Box display={['none', null, null, 'block']}>
          <Sidebar />
        </Box>
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item as={Link} to="/">
              Octicons
            </Breadcrumb.Item>
            <Breadcrumb.Item as={Link} to={pageContext.name} selected>
              {pageContext.name}
            </Breadcrumb.Item>
          </Breadcrumb>
          <H1>{pageContext.name}</H1>
          <IconViewer>
            <Icon name={pageContext.name} />
          </IconViewer>

          <Grid mt={3} gridGap={3} gridTemplateColumns={[null, 'repeat(3, 1fr)']}>
            <Button
              onClick={() => {
                copy(svg)
                setCopied(true)
              }}
            >
              {copied ? 'Copied' : 'Copy SVG'}
            </Button>
            <Button onClick={() => download(svg, `${pageContext.name}.svg`, 'image/svg+xml')}>Download SVG</Button>
            <Button disabled={!pdf} onClick={() => download(pdf, `${pageContext.name}.pdf`, 'application/pdf')}>
              Download PDF
            </Button>
          </Grid>

          <H2>Rails and Jekyll examples</H2>
          <Paragraph>
            You can use the Octicons Rails helper or the Jekyll helper to include Octicons on your site. Below are code
            examples for each.
          </Paragraph>

          <H3>Ruby</H3>
          <Code>{`<%= octicon "${pageContext.name}" %>`}</Code>

          <H3>Jekyll</H3>
          <Code>{`{% octicon ${pageContext.name} %}`}</Code>
        </Container>
      </Flex>
    </Flex>
  )
}

function getSvg(icon) {
  // eslint-disable-next-line github/unescaped-html-literal
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.width} ${icon.height}" width="${
    icon.width
  }" height="${icon.height}">${icon.path}</svg>`
}

function getPdf(icon) {
  const svg = getSvg(icon)
  return new Promise(resolve => {
    const doc = new PDFDocument({size: [icon.width, icon.height]})
    const stream = doc.pipe(blobStream())
    svgToPdf(doc, svg, 0, 0, {assumePt: true})
    doc.end()
    stream.on('finish', function() {
      resolve(stream.toBlob('application/pdf'))
    })
  })
}

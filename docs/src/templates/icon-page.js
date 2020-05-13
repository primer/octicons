import {Box, Breadcrumb, Button, Flex, Grid, Heading, Link, TabNav, Text} from '@primer/components'
import {Container, Head, Header, Sidebar} from '@primer/gatsby-theme-doctocat'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import Paragraph from '@primer/gatsby-theme-doctocat/src/components/paragraph'
import blobStream from 'blob-stream'
import copy from 'copy-to-clipboard'
import download from 'downloadjs'
import {Link as GatsbyLink} from 'gatsby'
import {pascalCase} from 'pascal-case'
import PDFDocument from 'pdfkit/js/pdfkit.standalone'
import React from 'react'
import svgToPdf from 'svg-to-pdfkit'
import Icon from '../components/icon'
import IconViewer from '../components/icon-viewer'
import UIExamples16 from '../components/ui-examples-16'
import UIExamples24 from '../components/ui-examples-24'

export default function IconPage({pageContext}) {
  const icon = {
    name: pageContext.name,
    keywords: pageContext.keywords,
    width: pageContext.width,
    height: pageContext.height,
    path: pageContext.svgPath
  }
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
            <Breadcrumb.Item as={GatsbyLink} to="/">
              Octicons
            </Breadcrumb.Item>
            <Breadcrumb.Item as={GatsbyLink} to={`/${icon.name}-${icon.height}`} selected>
              {icon.name}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Heading as="h1" mt={2} mb={3}>
            {icon.name}
          </Heading>
          <TabNav mb={4}>
            {pageContext.heights.map(height => (
              <TabNav.Link
                key={height}
                as={GatsbyLink}
                to={`/${icon.name}-${height}`}
                selected={height === icon.height}
              >
                {height}
                px
              </TabNav.Link>
            ))}
          </TabNav>

          <IconViewer>
            <Icon width={icon.width} height={icon.height} path={icon.path} />
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

          <H2>Usage</H2>
          <Paragraph>
            You can use the{' '}
            <Link as={GatsbyLink} to="/packages/rails">
              Rails helper
            </Link>
            ,{' '}
            <Link as={GatsbyLink} to="/packages/jekyll">
              Jekyll helper
            </Link>
            , or{' '}
            <Link as={GatsbyLink} to="/packages/react">
              React package
            </Link>{' '}
            to include Octicons on your site. Below are code examples for each:
          </Paragraph>

          <H3>Ruby</H3>
          <Code>{`<%= octicon "${pageContext.name}", :height => ${icon.height} %>`}</Code>

          <H3>Jekyll</H3>
          <Code>{`{% octicon ${pageContext.name} height:${icon.height} %}`}</Code>

          <H3>React</H3>
          <Code className="language-jsx">{`<${pascalCase(pageContext.name)}Icon size={${icon.height}} />`}</Code>

          <H2>UI examples</H2>
          <UIExamples
            size={icon.height}
            icon={props => <Icon width={icon.width} height={icon.height} path={icon.path} {...props} />}
          />
        </Container>
      </Flex>
    </Flex>
  )
}

function UIExamples({size, icon}) {
  switch (size) {
    case 16:
      return <UIExamples16 icon={icon} />
    case 24:
      return <UIExamples24 icon={icon} />
    default:
      return <Text>No examples available</Text>
  }
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

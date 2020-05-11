import {
  BorderBox,
  Button,
  ButtonDanger,
  ButtonOutline,
  ButtonPrimary,
  Flex,
  Grid,
  Text,
  Timeline,
  UnderlineNav
} from '@primer/components'
import React from 'react'

export default function UIExamples16({icon: Icon}) {
  return (
    <BorderBox p={3}>
      <Grid gridGap={3} sx={{justifyItems: 'start'}}>
        <Text>
          <Icon />
          <Text ml={2} contentEditable>
            Inline text
          </Text>
        </Text>
        <Text>
          <Icon />
          <Text ml={2} fontSize={1} contentEditable>
            Small inline text
          </Text>
        </Text>
        <Timeline>
          <Timeline.Item>
            <Timeline.Badge>
              <Icon />
            </Timeline.Badge>
            <Timeline.Body>
              <Text color="text.gray.8" contentEditable spellCheck="false">
                Monalisa created one hot potato
              </Text>
            </Timeline.Body>
          </Timeline.Item>
        </Timeline>
        <Flex>
          <Button mr={2}>
            <Icon />
            <Text ml={2} contentEditable>
              Button
            </Text>
          </Button>
          <ButtonPrimary mr={2}>
            <Icon />
            <Text ml={2} contentEditable>
              Button
            </Text>
          </ButtonPrimary>
          <ButtonDanger mr={2}>
            <Icon />
            <Text ml={2} contentEditable>
              Button
            </Text>
          </ButtonDanger>
          <ButtonOutline mr={2}>
            <Icon />
            <Text ml={2} contentEditable>
              Button
            </Text>
          </ButtonOutline>
        </Flex>
        <UnderlineNav sx={{width: '100%'}}>
          <UnderlineNav.Link href="#" selected onClick={event => event.preventDefault()}>
            <Icon />
            <Text ml={2} contentEditable>
              Home
            </Text>
          </UnderlineNav.Link>
        </UnderlineNav>
      </Grid>
    </BorderBox>
  )
}

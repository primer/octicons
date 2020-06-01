import {BorderBox, CircleBadge, Grid} from '@primer/components'
import React from 'react'

export default function UIExamples24({icon: Icon}) {
  return (
    <BorderBox p={3}>
      <Grid gridGap={3} sx={{justifyItems: 'start'}}>
        <CircleBadge>
          <Icon />
        </CircleBadge>
      </Grid>
    </BorderBox>
  )
}

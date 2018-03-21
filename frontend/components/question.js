import React from 'react'
import Split, { SplitItem } from '@typeform/kitt/lib/components/split'
import Container from '@typeform/kitt/lib/components/container'
import Text from '@typeform/kitt/lib/components/text'
import Spacer from '@typeform/kitt/lib/components/spacer'
import Block from '@typeform/kitt/lib/components/block'
import ChartBar from './chart-bar'

const Question = ({ title, dropoutsAmount, visitsAmount, blockType, blockIndex }) => (
  <Split>
    <SplitItem padRight={1.5}>
      <Block
        blockType={blockType}
        size='smWide'
        blockIndex={blockIndex}
      />
    </SplitItem>
    <SplitItem width='remaining'>
      <Spacer bottom={2}>
        <Text size='size1' fontWeight='medium'>
          {title}
        </Text>
      </Spacer>
      <Container padRight={8}>
        <ChartBar dropoutsAmount={dropoutsAmount} visitsAmount={visitsAmount} />
      </Container>
    </SplitItem>
  </Split>
)

export default Question

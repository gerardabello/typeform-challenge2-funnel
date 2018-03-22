import React from 'react'
import Split, { SplitItem } from '@typeform/kitt/lib/components/split'
import Container from '@typeform/kitt/lib/components/container'
import Text from '@typeform/kitt/lib/components/text'
import Spacer from '@typeform/kitt/lib/components/spacer'
import Block from '@typeform/kitt/lib/components/block'
import ChartBar from './chart-bar'
import styled from 'styled-components'
import { colors } from '@typeform/kitt/lib/variables'

const BlockWrapper = styled.div`
  position: relative;
`
const RequiredWrapper = styled.div`
  position: absolute;
  right: 100%;
  top: 0;
  width: 32px;
`

const Question = ({ title, dropoutsAmount, visitsAmount, blockType, blockIndex, isRequired }) => (
  <Split>
    <SplitItem padRight={1.5}>
      <BlockWrapper>
        <Block
          blockType={blockType}
          size='smWide'
          blockIndex={blockIndex}
        />
        {isRequired &&
          <RequiredWrapper>
            <Text color={colors.error} align='center' size='size2'>
              *
            </Text>
          </RequiredWrapper>
        }
      </BlockWrapper>
    </SplitItem>
    <SplitItem width='remaining' padRight={8}>
      <Spacer bottom={1}>
        <Text size='size1' fontWeight='medium'>
          {title}
        </Text>
      </Spacer>
      <Container>
        <ChartBar dropoutsAmount={dropoutsAmount} visitsAmount={visitsAmount} />
      </Container>
    </SplitItem>
  </Split>
)

export default Question

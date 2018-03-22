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

  @media (max-width: 700px) {
    margin-bottom: 8px;
  }
`
const RequiredWrapper = styled.div`
  position: absolute;
  right: calc(100% + 8px);
  top: 0;
`

const QuestionWrapper = styled.div`
  display: flex;

  @media (min-width: 700px) {
    padding-right: 64px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const BlockSection = styled.div`
  padding-right: 12px;
  flex-shrink: 0;
`

const ContentSection = styled.div`
  flex: 1;
`

const Question = ({ title, dropoutsAmount, visitsAmount, blockType, blockIndex, isRequired }) => (
  <QuestionWrapper>
    <BlockSection padRight={1.5}>
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
    </BlockSection>
    <ContentSection width='remaining' padRight={8}>
      <Spacer bottom={1}>
        <Text size='size1' fontWeight='medium'>
          {title}
        </Text>
      </Spacer>
      <Container>
        <ChartBar dropoutsAmount={dropoutsAmount} visitsAmount={visitsAmount} />
      </Container>
    </ContentSection>
  </QuestionWrapper>
)

export default Question

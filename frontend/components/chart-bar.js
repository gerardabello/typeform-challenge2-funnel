import React from 'react'
import Text from '@typeform/kitt/lib/components/text'
import Spread from '@typeform/kitt/lib/components/spread'
import styled from 'styled-components'
import { xxlight, dark } from '@typeform/kitt/lib/utils'
import { colors } from '@typeform/kitt/lib/variables'

const ChartBarWrapper = styled.div`
  background-color: rgba(0,0,0,.04);
  padding: 10px 16px;
  border-radius: 3px;
  position: relative;
  color: ${props => props.dropoutsAmount ? dark(colors.error) : colors.grey5};
`
const Fill = styled.div`
  background-color: ${xxlight(colors.error)};
  width: ${props => props.dropoutsAmount}%;
  border-radius: 3px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`
const ChartBarContent = styled.div`
  position: relative;
  z-index: 1;
`

const ChartBar = ({ dropoutsAmount, visitsAmount }) => (
  <ChartBarWrapper dropoutsAmount={dropoutsAmount}>
    <ChartBarContent>
      <Spread>
        <div>
          <Text fontWeight='bold' inline>
            {dropoutsAmount}%
          </Text> of views drops out
        </div>

        <div>
          <Text fontWeight='bold' inline>
            {visitsAmount}
          </Text> visitors
        </div>
      </Spread>
    </ChartBarContent>
    <Fill dropoutsAmount={dropoutsAmount} />
  </ChartBarWrapper>
)

export default ChartBar

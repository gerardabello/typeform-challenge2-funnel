import React from 'react'
import { render } from 'react-dom'
import BaseStyles from '@typeform/kitt/lib/components/base-styles'
import ScrollContent from '@typeform/kitt/lib/components/scroll-content'
import Container from '@typeform/kitt/lib/components/container'
import Distribute from '@typeform/kitt/lib/components/distribute'
import Card from '@typeform/kitt/lib/components/card'
import Text from '@typeform/kitt/lib/components/text'
import Spacer from '@typeform/kitt/lib/components/spacer'
import { colors } from '@typeform/kitt/lib/variables'
import Question from './components/question'
import TabList, { Tab } from '@typeform/kitt/lib/components/tab-list'
import Button from '@typeform/kitt/lib/components/button'
import PopoverMenu from '@typeform/kitt/lib/components/popover-menu'
import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    margin: 0;
  }
`

const FilterBar = () => (
  <div>
    <PopoverMenu
      trigger={
        <Button iconSvg={require('@typeform/kitt/lib/iconsv2/caret-down')} iconPosition='right'>
          Order by
        </Button>
      }
      options={[
        { 'title': 'Highest dropout' },
        { 'title': 'Questions order' }
      ]}
    />
  </div>
)

const App = () => (
  <BaseStyles>
    <Container backgroundColor={colors.grey0}>
      <ScrollContent
        topSection={
          <div>
            <Container borderSide='bottom' height='xsm' backgroundColor='white' />
            <Container borderSide='bottom' height='48px' backgroundColor='white' >
              <Distribute position='center'>
                <Container width='1024px'>
                  <TabList size='small' value='insights' type='line'>
                    <Tab value='summary' label='Summary' />
                    <Tab value='responses' label='Responses' />
                    <Tab value='insights' label='Insights' />
                  </TabList>
                </Container>
              </Distribute>
            </Container>
          </div>
        }
      >
        <Distribute position='center'>
          <Container width='1024px'>
            <Spacer top={4} bottom={2}>
              <Text size='size2'>
                Dropouts
              </Text>
            </Spacer>

            <Spacer bottom={3}>
              <FilterBar />
            </Spacer>

            <Container width='768'>
              <Card>
                <Spacer bottom={1}>
                  <Distribute vertical space={4} >
                    <Question
                      title='How are you?'
                      dropoutsAmount={71}
                      visitsAmount={120}
                      blockType='picture-choice'
                      blockIndex='2'
                    />
                    <Question
                      title='Are you really you?'
                      dropoutsAmount={42}
                      visitsAmount={68}
                      blockType='yes-no'
                      blockIndex='10'
                    />
                    <Question
                      title='Are you here?'
                      dropoutsAmount={12}
                      visitsAmount={41}
                      blockType='dropdown'
                      blockIndex='10'
                    />
                  </Distribute>
                </Spacer>
              </Card>
            </Container>
          </Container>
        </Distribute>
      </ScrollContent>
    </Container>
  </BaseStyles>
)

console.log('hello world')

render(<App />, document.getElementById('root'))

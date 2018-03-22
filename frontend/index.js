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
import getData from './parse'
import { sortBy, prop, reverse, compose } from 'ramda'

const sortTypes = {
  dropout: 'dropout',
  index: 'index'
}

injectGlobal`
  body {
    margin: 0;
  }
`

const FilterBar = () => (
  <div>
    <PopoverMenu
      trigger={
        <Button
          iconSvg={require('@typeform/kitt/lib/iconsv2/caret-down')}
          iconPosition='right'
        >
          Order by
        </Button>
      }
      options={[{ title: 'Highest dropout' }, { title: 'Questions order' }]}
    />
  </div>
)

const round2decimals = num => Math.round(num * 100) / 100

const sortByDropout = compose(reverse, sortBy(f => f.dropout / f.uniqueViews))
const sortByIndex = sortBy(prop('index'))
const sortData = (type, fields) => {
  const sort = type === sortTypes.index ? sortByIndex : sortByDropout
  return sort(fields)
}

const App = ({ data }) => (
  <BaseStyles>
    <Container backgroundColor={colors.grey0}>
      <ScrollContent
        topSection={
          <div>
            <Container
              borderSide='bottom'
              height='xsm'
              backgroundColor='white'
            />
            <Container
              borderSide='bottom'
              height='48px'
              backgroundColor='white'
            >
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
              <Text size='size2'>Dropouts</Text>
            </Spacer>

            <Spacer bottom={3}>
              <FilterBar />
            </Spacer>

            <Container width='768'>
              <Card>
                <Spacer bottom={1}>
                  <Distribute vertical space={4}>
                    {sortData(sortTypes.dropout, data).map(field => {
                      return (
                        <Question
                          key={field.ref}
                          title={field.title}
                          dropoutsAmount={round2decimals(
                            field.uniqueViews === 0
                              ? 0
                              : field.dropout / field.uniqueViews * 100
                          )}
                          visitsAmount={field.uniqueViews}
                          blockType='yes-no'
                          blockIndex={field.index}
                        />
                      )
                    })}
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
getData().then(data => {
  render(<App data={data} />, document.getElementById('root'))
})

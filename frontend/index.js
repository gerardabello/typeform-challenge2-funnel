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
import Header from './components/header'
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
const titles = {
  [sortTypes.dropout]: 'Highest dropout',
  [sortTypes.index]: 'Questions order'
}
const FilterBar = ({onClick, currentFilter}) => (
  <div>
    <PopoverMenu
      trigger={
        <Button
          iconSvg={require('@typeform/kitt/lib/iconsv2/caret-down')}
          iconPosition='right'
        >
          <Text dimmed inline>Order by:</Text> {titles[currentFilter]}
        </Button>
      }
      options={[
        { title: titles[sortTypes.dropout], onClick: () => onClick(sortTypes.dropout) },
        { title: titles[sortTypes.index], onClick: () => onClick(sortTypes.index) }
      ]}
    />
  </div>
)

const round2decimals = num => Math.round(num * 100) / 100

const getPercentageDropout = (dropout, uniqueViews) =>
  round2decimals(uniqueViews === 0 ? 0 : dropout / uniqueViews * 100)

const sortByDropout = compose(
  reverse,
  sortBy(f => getPercentageDropout(f.dropout, f.uniqueViews))
)
const sortByIndex = sortBy(prop('index'))
const sortData = (type, fields) => {
  const sort = type === sortTypes.index ? sortByIndex : sortByDropout
  return sort(fields)
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sortType: sortTypes.dropout
    }
  }
  render() {
    const {data} = this.props
    return <BaseStyles>
      <Container backgroundColor={colors.grey0}>
        <ScrollContent
          topSection={
            <Header />
          }
        >
          <Distribute position='center'>
            <Container width='1024px' padBottom={8} >
              <Spacer top={4} bottom={2}>
                <Text size='size2'>Dropouts</Text>
              </Spacer>

              <Spacer bottom={3}>
                <FilterBar currentFilter={this.state.sortType} onClick={(val)=>this.setState({sortType:val})} />
              </Spacer>

              <Container width='768'>
                <Card>
                  <Spacer bottom={1}>
                    <Distribute vertical space={5}>
                      {sortData(this.state.sortType, data).map(field => {
                        return (
                          <Question
                            key={field.ref}
                            title={field.title}
                            dropoutsAmount={getPercentageDropout(
                              field.dropout,
                              field.uniqueViews
                            )}
                            visitsAmount={field.uniqueViews}
                            blockType={field.type}
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
  }
}
getData().then(data => {
  render(<App data={data} />, document.getElementById('root'))
})

import uniqBy from 'ramda/src/uniqBy'
import groupBy from 'ramda/src/groupBy'
import last from 'ramda/src/last'
import prop from 'ramda/src/prop'
import map from 'ramda/src/map'
import values from 'ramda/src/values'
import 'whatwg-fetch'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const getSessionId = prop('sessionId')
const getBlockRef = prop('blockRef')
const groupByRef = groupBy(getBlockRef)
const uniqBySession = uniqBy(getSessionId)

const getUniqueViewsCount = (ref, viewsByBlock) =>
  viewsByBlock[ref] ? uniqBySession(viewsByBlock[ref]).length : 0

const getDropoutByBlock = (ref, dropoutEvents) => {
  const list = groupByRef(
    values(map(last, groupBy(getSessionId, dropoutEvents)))
  )
  return list[ref] ? list[ref].length : 0
}

const parseData = (formId, formDefinition, dropoutEvents) => {
  const viewsByBlock = groupByRef(dropoutEvents)
  let blockIndex = 1
  let statementIndex = 0

  let data = formDefinition.fields.map((field, index) => {
    return {
      ref: field.ref,
      type: field.type,
      index: index + 1,
      indexText:
        field.type === 'statement' ? alphabet[statementIndex++] : blockIndex++,
      title: field.title,
      uniqueViews: getUniqueViewsCount(field.ref, viewsByBlock), // quantes sessions han vist aquest field
      dropout: getDropoutByBlock(field.ref, dropoutEvents) // quantes sessions han acabat en aquest field
    }
  })

  if (formDefinition.welcome_screens[0]) {
    const screen = formDefinition.welcome_screens[0]
    data = [
      {
        ref: screen.ref,
        type: 'welcome_screen',
        index: 0,
        indexText: '',
        title: screen.title,
        uniqueViews: getUniqueViewsCount(screen.ref, viewsByBlock), // quantes sessions han vist aquest field
        dropout: getDropoutByBlock(screen.ref, dropoutEvents) // quantes sessions han acabat en aquest field
      },
      ...data
    ]
  }

  return data
}

const getData = () =>
  Promise.all([
    fetch('/data').then(value => value.json()),
    fetch('/definition').then(value => value.json())
  ]).then(values => {
    return parseData(values[1].id, values[1], values[0])
  })

export default getData

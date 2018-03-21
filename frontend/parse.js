import uniqBy from 'ramda/src/uniqBy'
import groupBy from 'ramda/src/groupBy'
import last from 'ramda/src/last'
import map from 'ramda/src/map'
import values from 'ramda/src/values'
import formDefinition from './form-definition'
import dropoutEvents from './dropout-data'
import 'whatwg-fetch'

const getUniqueViewsCount = (ref, viewsByBlock) =>
  viewsByBlock[ref]
  ? uniqBy((evt) => evt.sessionId)(viewsByBlock[ref]).length
  : 0

const getDropoutByBlock = (ref, dropoutEvents) => {
  const list = groupBy((evt)=>evt.blockRef, values(map(last, groupBy((evt) => evt.sessionId)(dropoutEvents))))
  return list[ref]
    ? list[ref].length
    : 0
}

const parseData = (formId, formDefinition, dropoutEvents) => {
  const total = uniqBy((evt) => evt.sessionId)(dropoutEvents).length
  const viewsByBlock = groupBy((evt) => evt.blockRef)(dropoutEvents)

  return formDefinition.fields.map((field, index) => {
    return {
      ref: field.ref,
      type: field.type,
      index,
      title: field.title,
      uniqueViews: getUniqueViewsCount(field.ref, viewsByBlock), // quantes sessions han vist aquest field
      dropout: getDropoutByBlock(field.ref, dropoutEvents) // quantes sessions han acabat en aquest field
    }
  })

}

const getData = () =>
  Promise.all([
    fetch('/data').then(value => value.json()),
    fetch('/definition').then(value => value.json())
  ]).then((values) => {
    return parseData(values[1].id, values[1], values[0])
  })

export default getData
import uniqBy from 'ramda/src/uniqBy'
import groupBy from 'ramda/src/groupBy'
import formDefinition from './form-definition'
import dropoutEvents from './dropout-data'
console.log("hello world");
console.log(formDefinition)

const getUniqueViewsCount = (ref, viewsByBlock) =>
  viewsByBlock[ref]
  ? uniqBy((evt) => evt.sessionId)(viewsByBlock[ref]).length
  : 0

const parse = () => {
  const total = uniqBy((evt) => evt.sessionId)(dropoutEvents).length
  const viewsByBlock = groupBy((evt) => evt.blockRef)(dropoutEvents)

  return formDefinition.fields.map((field, index) => {
    return {
      type: field.type,
      index,
      title: field.title,
      uniqueViews: getUniqueViewsCount(field.ref, viewsByBlock), // quantes sessions han vist aquest field
      dropout: 0.78 // quantes sessions han acabat en aquest field
    }
  })

}
import { Model } from 'mongoose'

type TOptions = {
  model: Model<any>
  prefix: string
  fieldName: string
}

// Date object
export const dateObject: {
  date: string
  week: string
  month: string
  range: string
} = {
  date: 'date',
  week: 'date',
  month: 'date',
  range: 'date',
}


export const generateId = async ({ model, prefix, fieldName }: TOptions): Promise<string> => {
  const lastDocument = await model.findOne({}, { [fieldName]: 1 })
    .sort({ [fieldName]: -1 })
    .lean()

  if (!lastDocument) {
    return `${prefix}-001`
  }

  const lastId = parseInt((lastDocument as any)[fieldName].split('-')[1])
  const nextId = lastId + 1

  let numberPart: string
  if (nextId >= 100) {
    numberPart = nextId.toString()
  } else if (nextId >= 10) {
    numberPart = '0' + nextId
  } else {
    numberPart = '00' + nextId
  }

  return `${prefix}-${numberPart}`
}


type RecordItem = {
  id: number,
  tagName: string,
  account: number,
  createdAt: string,
  note: string,
}

type saveRecordsArgs = {
  tagName: string,
  account: number,
  note: string,
  type: 's' | 'z'
}

export {RecordItem, saveRecordsArgs}
// 生成当前时间
export const createAt = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1)
  const day = now.getDate().toString()
  let dayStr = day.toString()
  let monthStr = month.toString()
  if (month < 10) {
    monthStr = '0' + month
  }
  if (day < '10') {
    dayStr = '0' + day
  }

  return `${year}-${monthStr}-${dayStr}`
}

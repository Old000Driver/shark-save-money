// 自动生成id
export const createId = (): number => {
  let id = parseInt(window.localStorage.getItem('idMax') || '0')
  id += 1
  window.localStorage.setItem('idMax', id.toString())
  return id
}


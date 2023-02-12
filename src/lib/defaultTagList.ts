// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
type TagMine = {
  name: string,
  svgName: string,
  id: number
}

function getDefaultTagList(): { [key: string]: Array<TagMine> } {
  return {

    'food': [
      {name: '餐饮', svgName: 'waiMai', id: 1},
      {name: '外卖', svgName: 'canYin', id: 2},
      {name: '买菜', svgName: 'maiCai', id: 3},
      {name: '零食', svgName: 'lingShi', id: 4}
    ],

    'shop': [
      {name: '购物', svgName: 'gouWu', id: 5},
      {name: '衣物', svgName: 'yiFu', id: 6},
      {name: '电器', svgName: 'dianQi', id: 7},
      {name: '日用品', svgName: 'riYongPin', id: 8}],

    'transportation': [
      {name: '交通', svgName: 'jiaoTong', id: 9},
      {name: '地铁', svgName: 'diTie', id: 10},
      {name: '飞机', svgName: 'feiJi', id: 11},
      {name: '高铁', svgName: 'gaoTie', id: 12},
      {name: '出租车', svgName: 'taxi', id: 13}],

    'house': [
      {name: '住宿', svgName: 'fangZi', id: 14},
      {name: '房租', svgName: 'fangZu', id: 15},
      {name: '水电', svgName: 'shuiDian', id: 16},
      {name: '话费', svgName: 'huaFei', id: 17}],
  }
}

export {getDefaultTagList,TagMine}
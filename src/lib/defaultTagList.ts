function getDefaultTagList(): { name: string, svgName: string, type: string, id: number }[] {
  return [
    {name: '餐饮', svgName: 'waiMai', type: 'food', id: 1},
    {name: '外卖', svgName: 'canYin', type: 'food', id: 2},
    {name: '买菜', svgName: 'maiCai', type: 'food', id: 3},
    {name: '零食', svgName: 'lingShi', type: 'food', id: 4},
    {name: '购物', svgName: 'gouWu', type: 'shop', id: 5},
    {name: '衣物', svgName: 'yiFu', type: 'shop', id: 6},
    {name: '电器', svgName: 'dianQi', type: 'shop', id: 7},
    {name: '日用品', svgName: 'riYongPin', type: 'shop', id: 8},
    {name: '交通', svgName: 'jiaoTong', type: 'transportation', id: 9},
    {name: '地铁', svgName: 'diTie', type: 'transportation', id: 10},
    {name: '飞机', svgName: 'feiJi', type: 'transportation', id: 11},
    {name: '高铁', svgName: 'gaoTie', type: 'transportation', id: 12},
    {name: '出租车', svgName: 'taxi', type: 'transportation', id: 13},
    {name: '住宿', svgName: 'fangZi', type: 'house', id: 14},
    {name: '房租', svgName: 'fangZu', type: 'house', id: 15},
    {name: '水电', svgName: 'shuiDian', type: 'house', id: 16},
    {name: '话费', svgName: 'huaFei', type: 'house', id: 17},
  ]
}

export {getDefaultTagList}
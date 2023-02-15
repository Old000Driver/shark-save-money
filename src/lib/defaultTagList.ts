// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
type TagMine = {
  name: string,
  svgName: string,
  id: number
}

const defaultIncomeTagList: Array<TagMine> =
    [
      {name: '餐饮', svgName: 'canYin', id: 1},
      {name: '购物', svgName: 'gouWu', id: 5},
      {name: '交通', svgName: 'jiaoTong', id: 9},
      {name: '住宿', svgName: 'fangZi', id: 14},
    ]

const tagList:{ [key: string]: Array<TagMine> } = {
  'food': [
    {name: '餐饮', svgName: 'canYin', id: 1},
    {name: '外卖', svgName: 'waiMai', id: 2},
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
  '收入': [
    {name: '工资', svgName: 'gongZi', id: 1},
    {name: '奖金', svgName: 'jiangJin', id: 2},
    {name: '其他', svgName: 'qiTa', id: 3},]
}

function getDefaultTagList(type: string): { [key: string]: Array<TagMine> } {
  if (type === 'z') {

    return {

      'food': [
        {name: '餐饮', svgName: 'canYin', id: 1},
        {name: '外卖', svgName: 'waiMai', id: 2},
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
  } else {
    return {
      '收入': [
        {name: '工资', svgName: 'gongZi', id: 1},
        {name: '奖金', svgName: 'jiangJin', id: 2},
        {name: '其他', svgName: 'qiTa', id: 3},]
    }
  }
}

export {getDefaultTagList, TagMine, defaultIncomeTagList, tagList}
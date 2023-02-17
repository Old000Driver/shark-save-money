import {tagList} from "@/lib/defaultTagList";

const fetchSvg = (tagName: string):string => {
  const list = tagList
  let svgName = ''
  for (const index in list) {
    const list2 = list[index]
    for (const index2 in list2) {
      if (list2[index2].name === tagName) {
        svgName = list2[index2].svgName
      }
    }
  }
  return svgName
}

export {fetchSvg}
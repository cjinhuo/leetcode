/**
 * ([{start: 0, end: 2}, {start: 1, end:6}, {start:3, end: 6}], 1) => 安排最多场次:2
 * @param {Array} list 传入项目的宣讲时间
 */
function bestArrange(list, start){
  // 首先将list排序
  list.sort((a ,b) => a.end - b.end)
  let count = 0
  let result = []
  for (let i = 0; i < list.length; i++) {
    if (start <= list[i].start){
      result.push(list[i])
      start = list[i].end
    }
  }
  return result
}
let arr = [
  {
    start:2,
    end:4
  },
  {
    start: 0,
    end:5
  },
  {
    start: 6,
    end: 10
  }
]
const result = bestArrange(arr, 0)
console.log(result)
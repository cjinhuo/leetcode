const originalStr = 'Node测杻'
const transformed = 'node测ce杻niuchou'
const boundary = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [4, 5],
  [4, 5],
  // 适配多音字和纯中文输入情况：
  // 输入：杻 命中 [5, 7]，后续的 7 - 15 下标则不需要再遍历
  // 输入 niu, 命中 [5,8] 三个，后续的 7 - 15 下标则不需要再遍历
  // 输入 chou 或 cho 或 ch 或 c, 命中 [5, 11] 四个其中之一，后续的 7 - 15 下标则不需要再遍历
  [5, 7], // 杻
  [5, 8], // n
  [5, 8], // i
  [5, 8] // u
  [5, 11], // c
  [5, 11], // h
  [5, 11] // o
  [5, 11] // u
]
// 对应每个字映射的结尾下标，也可以通过一次遍历获取，也可以在构建 boundary 的同时创建

const splitIndex = [0, 1, 2, 3, 4, 7]



const hitBoundary = [[0, 0], [1, 1], [4, 5], [5, 8], [5, 8]]
const hitBoundarySet = new Set(hitBoundary)
// [0, 0], [1, 1], [4, 5], [5, 8]
const hitIndexWithOriginalString = [0, 1, 4, 5]


const input = 'nocniu'
for (let j = 0; j < input.length; j++) {
  // 遍历剩余未命中的 Boundary

}


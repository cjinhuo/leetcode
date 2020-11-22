/**
 * 实现类似解构赋值的算法
 * 输入：a:[1, [2, 3, [4]], 5] b:'[a, [b, [c], e], d]'
 * 输出：{ a: 1, b: 2, c: 4, e: undefined, d: 5 }
 * @param {Array} a
 * @param {String} b
 */
function dismantleArray(a, b) {
  if (typeof b === 'string') {
    b = JSON.parse(b.replace(/\w+/g, str => `"${str}"`));
  }
  const recurse = (item1, item2, result = {}) => {
    // item1 当前位置
    let curIndex = 0;
    item2.forEach(item => {
      if (Array.isArray(item) && Array.isArray(item1[curIndex])) {
        recurse(item1[curIndex], item, result);
        curIndex++;
      } else if (Array.isArray(item) && !Array.isArray(item1[curIndex])) {
        for (let i = curIndex; i < item1.length; i++) {
          if (Array.isArray(item1[i])) {
            curIndex = i;
            recurse(item1[curIndex], item, result);
            curIndex++;
            break;
          }
        }
      } else if (!Array.isArray(item) && Array.isArray(item1[curIndex])) {
        result[item] = undefined;
      } else {
        result[item] = item1[curIndex];
        curIndex++;
      }
    });
    return result;
  };
  return recurse(a, b);
}
const res = dismantleArray([1, [2, 3, [4]], 5, [7, 8, [10]], [null, 'o']], '[a, [b,z, g, y, [c], e], d, f,[t], [k,p,[o,[u]]]]');
console.log(res);
// {
//   a: 1,
//   b: 2,
//   z: 3,
//   g: undefined,
//   y: undefined,
//   c: 4,
//   e: undefined,
//   d: 5,
//   f: undefined,
//   t: 7,
//   k: null,
//   p: 'o'
// }

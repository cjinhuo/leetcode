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
console.log(res); // res: { a: 1, b: 2, c: 4, e: undefined, d: 5 }

// 王枫

// const dismantleArray = (arr, str) => {
//   const _arr = JSON.parse(str.replace(/([a-z])/g, '"$1"'));
//   const flattenToData = (list, array, obj = {}) => {
//     let save = 0; // 补偿系数
//     list.forEach((item, key) => {
//       if (typeof item === 'string') {
//         obj[item] = typeof array[key + save] !== 'object' ? array[key + save] : undefined;
//         return;
//       }
//       if (typeof item === 'object' && typeof array[key] !== 'object') {
//         save += 1;
//       }
//       flattenToData(item, array[key + save], obj);
//     });
//     return obj;
//   };
//   return flattenToData(_arr, arr);
// };
// function dismantleArray(a, b) {
//   try {
//     b = JSON.parse(b.replace(/(\w)/g, '"$1"'));
//   } catch (e) {
//     console.log('输入字符串有误');
//   }

//   function parse(initArr, matchArr, initRet = {}) {
//     for (let i = 0, j = 0; i < matchArr.length; i++, j++) {
//       let key = matchArr[i];
//       if (Array.isArray(key) && Array.isArray(initArr[j])) {
//         parse(initArr[j], matchArr[i], initRet);
//       } else if (!Array.isArray(key) && Array.isArray(initArr[j])) {
//         if (!initRet[key]) {
//           initRet[key] = undefined;
//         }
//         j = j - 1;
//       } else if (Array.isArray(key) && !Array.isArray(initArr[j])) {
//         j = j + 1;
//         if (j < initArr.length) {
//           while (Array.isArray(initArr[j])) {
//             parse(initArr[j], matchArr[i], initRet);
//             j = j + 1;
//           }
//         } else {
//           parse([], matchArr[i], initRet);
//         }
//       } else {
//         if (!initRet[key]) {
//           initRet[key] = initArr[j];
//         }
//       }
//     }
//     return initRet;
//   }

//   return parse(a, b);
// }
// const res = dismantleArray([1, [2, 3, [4]], 5, [7, 8, [10]], [null, 'o']], '[a, [b,z, g, y, [c], e], d, f,[t], [k,p,[o,[u]]]]');
// console.log(res); // { a: 1, b: 2, c: 4, e: undefined, d: 5, f:undefined }

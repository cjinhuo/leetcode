// base
// function add(x) {
//   return function (y) {
//     return x + y;
//   };
// }
// console.log(add(1)(2));

// use valueOf
function add(x) {
  let sum = x
  function resultFn(y) {
    sum += y
    return resultFn
  }
  // 进行运算 + = 时会调用valueOf方法
  resultFn.valueOf = function () {
    return sum
  }
  return resultFn
}
// console.log(typeof (add(1)(2)(3) + 1)); // number 7
// console.log(typeof add(1)(2)(3)); // function
// console.log(typeof add(1)(2)(3).valueOf()); // number 7

// use arguments
// only three argus
// function add() {
//   let args = [].slice.apply(arguments)
//   function resultFn() {
//     args = args.concat([].slice.apply(arguments))
//     if (args.length >= 3) {
//       return args.slice(0, 3).reduce(function (acc, next) {
//         return acc + next
//       }, 0) //will only sum first 3 arguments
//     }
//     return resultFn
//   }
//   return resultFn()
// }

// console.log(add(2)(3)(4)(5))

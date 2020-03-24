// // 1 7 6 8 2 4 9 11 3 5 10 12
// console.log('1');
// // 微
// setTimeout(function () {
//   console.log('2');
//   process.nextTick(function () {
//     console.log('3');
//   })
//   new Promise(function (resolve) {
//     console.log('4');
//     resolve();
//   }).then(function () {
//     console.log('5')
//   })
// })
// // 宏
// process.nextTick(function () {
//   console.log('6');
// })
// // 宏 直接执行传入的函数
// new Promise(function (resolve) {
//   console.log('7');
//   resolve();
// }).then(function () {
//   console.log('8')
// })
// // 微
// setTimeout(function () {
//   console.log('9');
//   process.nextTick(function () {
//     console.log('10');
//   })
//   new Promise(function (resolve) {
//     console.log('11');
//     resolve();
//   }).then(function () {
//     console.log('12')
//   })
// })
// 7 8 2 5 1, 4, 3, 6
console.log('start')
setTimeout(() => {
  console.log(222)
})
setTimeout(() => {
  process.nextTick(function () {
    console.log('1');
  })
  new Promise(function (resolve) {
    console.log('2');
    resolve();
  }).then(function () {
    console.log('3')
  })
})

new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(() => {
  console.log(8)
})

setTimeout(() => {
  process.nextTick(function () {
    console.log('4');
  })
  new Promise(function (resolve) {
    console.log('5');
    resolve();
  }).then(function () {
    console.log('6')
  })
})
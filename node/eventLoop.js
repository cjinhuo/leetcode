// function test() {
//   setTimeout(() => {
//     console.log('timer1');
//     Promise.resolve().then(function () {
//       console.log('promise1');
//     });
//   }, 0);

//   setTimeout(() => {
//     console.log('timer2');
//     Promise.resolve().then(function () {
//       console.log('promise2');
//     });
//   }, 0);

//   Promise.resolve().then(() => {
//     console.log('promise3');
//   });
// }

// test();

// browser
// promise3
// timer1
// promise1
// timer2
// promise2

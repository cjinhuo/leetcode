// let bar;

// // this has an asynchronous signature, but calls callback synchronously
// function someAsyncApiCall(callback) {
//   process.nextTick(callback);
// }

// // the callback is called before `someAsyncApiCall` completes.
// someAsyncApiCall(() => {
//   // since someAsyncApiCall has completed, bar hasn't been assigned any value
//   console.log('bar', bar); // undefined
// });

// bar = 1;
// bar = 2;

process.nextTick(() => {
  console.log('nextTick');
});

setImmediate(() => {
  console.log('setImmediate');
});

const fs = require('fs');
//例如，如果运行以下不在 I/O 周期（即主模块）内的脚本，则执行两个计时器的顺序是非确定性的，因为它受进程性能的约束：

// setTimeout(() => {
//   console.log('timeout');
// }, 0);

// setImmediate(() => {
//   console.log('immediate');
// });

fs.readFile('./temp.js', () => {
  // 如果你把这两个函数放入一个 I/O 循环内调用，setImmediate 总是被优先调用
  // 宏任务
  setTimeout(() => {
    console.log('timeout');
  }, 0);

  setImmediate(() => {
    console.log('immediate');
    process.nextTick(() => {
      console.log('immediate nextTick');
    });
  });

  // 微任务
  Promise.resolve().then(() => {
    console.log('promise1');
    process.nextTick(() => {
      console.log('nextTick2');
    });
  });

  // 微任务
  process.nextTick(() => {
    console.log('nextTick1');
    Promise.resolve().then(() => {
      console.log('promise2');
    });
  });
});

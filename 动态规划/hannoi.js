// 分成三步
// 1. 将n-1 从左移到中
// 2. 将n 从左移到 右
// 3. 将n-1 从中移到右
function process(num, from, to, help) {
  if (num === 1) {
    console.log("Move 1 from " + from + " to " + to)
  } else {
    process(num - 1, from, help, to)
    console.log("Move " + num +  " from " + from + " to " + to)
    process(num - 1, help, to, from)
  }
}

process(2, '左', '右', '中')
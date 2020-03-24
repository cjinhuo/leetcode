let readline = require('readline')
let rl = readline.createInterface(process.stdin, process.stdout)
let inputCount = 0
rl.on('line', function (line) {
  inputCount++
  inputFunc(inputCount, 1, () => {
    console.log('current 1')
  })
  inputFunc(inputCount, 2, () => {
    console.log('current 2')
  })
  input = line.trim()
})
rl.on('close', function () {
  process.exit(0)
})

function inputFunc(currentTime, targetTime, callBack) {
  if (currentTime === targetTime) {
    callBack()
  }
}
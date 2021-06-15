const handles = {}
function subscribe(key, fn) {
  // 可以是数组
  handles[key] = handles[key] || []
  handles[key].push(fn)
}

function triggerHandlers(key) {
  const res = handles[key]
  res &&
    res.forEach(fn => {
      fn()
    })
}

subscribe('emitOne', () => {
  console.log('trigger emitOne event')
})

subscribe('emitOne', () => {
  console.log('another one callback')
})

subscribe('emitTwo', () => {
  console.log('trigger emitTwo event')
})

triggerHandlers('emitOne')

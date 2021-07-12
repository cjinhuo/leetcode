const handles = {}
function subscribe(key, fn) {
  // 可以是数组
  handles[key] = handles[key] || []
  handles[key].push(fn)
}

function offSub(key, fn) {
  const res = handles[key]
  if (res) {
    handles[key] = res.filter(cb => fn !== cb)
  }
}

function triggerHandlers(key) {
  const res = handles[key]
  res &&
    res.forEach(fn => {
      fn()
    })
}

const emitOneCb = () => {
  console.log('trigger emitOne event')
}

subscribe('emitOne', emitOneCb)

subscribe('emitOne', () => {
  console.log('another one callback')
})

subscribe('emitTwo', () => {
  console.log('trigger emitTwo event')
})

offSub('emitOne', emitOneCb)

triggerHandlers('emitOne')

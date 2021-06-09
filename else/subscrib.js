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
      if (typeof fn === 'function') {
        fn()
      }
    })
}

// 观察者模式 没有key对应
const list = []
function obSubscibe(fn) {
  list.push(fn)
}
function obPublish() {
  list.forEach(fn => {
    fn()
  })
}

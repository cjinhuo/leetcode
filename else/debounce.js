// 一段时间内被连续触发时，应该被刷新这个时间
// 最简单的版本
const debounce = (fn, delay = 300) => {
  let timer = null
  return (...args) => {
    clearInterval(timer)
    timer = setTimeout(() => {
      fn.apply(null, args)
    }, delay)
  }
}

// 加上isImmediate，也就是第一次触发
const advanceDebounce = (fn, delay = 300, isImmediate = true) => {
  let timer = null
  return (...args) => {
    if (isImmediate) {
      fn.apply(null, args)
      isImmediate = false
    }
    clearInterval(timer)
    timer = setTimeout(() => {
      fn.apply(null, args)
    }, delay)
  }
}

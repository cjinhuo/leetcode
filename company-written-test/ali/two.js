function QueryString() {}

QueryString.parse = function (str) {
  const items = str.split('&')
  const map = {}
  if (items.length === 0) return map
  items.forEach(item => {
    const [key, value] = item.split('=')
    if (map[key]) {
      map[key] = Array.isArray(map[key]) ? [...map[key], value] : [map[key], value]
    } else {
      map[key] = value
    }
  })
  return map
}

QueryString.stringify = function (obj) {
  const items = Object.entries(obj)
  const append = (first, second) => {
    if (first === '') return second
    return `${first}&${second}`
  }
  let result = ''
  items.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      result = append(result, value.map(val => `${key}=${val}`).join('&'))
    } else {
      result = append(result, `${key}=${value}`)
    }
  })
  return result
}

// console.log(QueryString.parse('foo=bar&abc=xyz&abc=123'))
console.log(QueryString.stringify({ foo: 'bar', abc: ['xyz', '123'] }))

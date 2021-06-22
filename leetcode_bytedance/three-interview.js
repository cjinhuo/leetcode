function transform(val) {
  const vals = Object.values(val)
  const result = []
  const map = {}
  vals.forEach(item => {
    const strs = item.department.split('-')
    strs.forEach((char, index) => {
      let cur = strs.slice(0, index + 1).join('-')
      if (index === 0 && !map[cur]) {
        const value = {
          name: char,
          path: char,
          children: [],
        }
        result.push(value)
        map[cur] = value
        return
      }
      if (map[cur]) {
        return
      }
      let pre = strs.slice(0, index).join('-')
      const value = {
        name: item.username,
        path: cur,
        children: [],
      }
      map[cur] = value
      map[pre].children.push(value)
    })
  })
  console.log(JSON.stringify(result))
}
transform({
  0: {
    username: '0',
    department: 'A-B-C',
  },
  1: {
    username: '1',
    department: 'A-B-D',
  },
  2: {
    username: '2',
    department: 'A-X-Y',
  },
})[
  {
    name: 'A',
    path: 'A',
    children: [
      {
        name: '0',
        path: 'A-B',
        children: [
          { name: '0', path: 'A-B-C', children: [] },
          { name: '1', path: 'A-B-D', children: [] },
        ],
      },
      { name: '2', path: 'A-X', children: [{ name: '2', path: 'A-X-Y', children: [] }] },
    ],
  }
]

// const extensions = [
//   { firstName: '1', lastName: 'xxx', ext: 'xxx', extType: 'FaxUser' },
//   { firstName: '2', lastName: 'xxx', ext: 'xxx', extType: 'Dept' },
//   { firstName: '3', lastName: 'xxx', ext: 'xxx', extType: 'VirtualUser' },
//   { firstName: '4', lastName: 'xxx', ext: 'xxx', extType: 'DigitalUser' },
//   { firstName: '5', lastName: 'xxx', ext: 'xxx', extType: 'DigitalUser' },
//   { firstName: '6', lastName: 'xxx', ext: 'xxx', extType: 'DigitalUser' },
//   { firstName: '7', lastName: 'xxx', ext: 'xxx', extType: 'AO' },
// ]
// function sortExtensionsByExtType(extensions) {
//   const bucket = {
//     DigitalUser: [],
//     VirtualUser: [],
//     FaxUser: [],
//     AO: [],
//     Dept: []
//   }
//   extensions.forEach(item => {
//     bucket[item.extType].push(item)
//   })
//   const result = []
//   Object.values(bucket).forEach(item => {
//     result.push(...item)
//   })
//   return result
// }

// console.log(sortExtensionsByExtType(extensions))


class Tool {
  static getSequence = function () {
    return function Sequence() {
      if (Sequence.instance) {
        return Sequence.instance
      }
      Sequence.instance = (function* () {
        let num = 0
        while (true) {
          yield ++num
        }
      })()
      return Sequence.instance
    }
  }
}
// let Sequence = Tool.getSequence()
// let seq1 = new Sequence()
// let seq2 = new Sequence()



function getUnUsedKeys(allKeys, usedKeys) {
  if (usedKeys.length === 0) return allKeys
  let allKeysSets = new Set(allKeys)
  usedKeys.forEach(num => {
    if (allKeysSets.has(num)) {
      allKeysSets.delete(num)
    }
  })
  return Array.from(allKeysSets)
}

console.log(getUnUsedKeys([1,2,3,4,5,7], [2,3,7]))


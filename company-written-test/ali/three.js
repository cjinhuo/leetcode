function compareVersion(ver1, ver2) {
  const ver1Arr = ver1.split('.')
  const ver2Arr = ver2.split('.')
  const length = ver1Arr.length > ver2Arr.length ? ver1Arr.length : ver2Arr.length
  let preIsSame = true
  for (let i = 0; i < length; i++) {
    if (ver2Arr[i] === undefined || ver1Arr[i] === undefined) {
      return 0
    }
    if (ver1Arr[i] < ver2Arr[i] && preIsSame) {
      return -1
    }
    if (ver1Arr[i] === ver2Arr[i]) {
      preIsSame = true
    }
    if (ver1Arr[i] > ver2Arr[i]) {
      preIsSame = false
    }
  }
  return 1
}
console.log(compareVersion('13.37', '1.2'))
console.log(compareVersion('1.1', '1.1.0'))
console.log(compareVersion('0.1', '1.1.1'))

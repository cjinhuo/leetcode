function insertSort(arr) {
  const length = arr.length
  let current, preIndex
  for (let i = 1; i < length; i++) {
    current = arr[i]
    preIndex = i - 1
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}

console.log(insertSort([10, 2, 3, 4, 5]))

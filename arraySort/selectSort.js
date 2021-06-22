function selectSort(arr) {
  const length = arr.length
  for (let i = 0; i < length; i++) {
    let minIndex = i,
      minNum = arr[i]
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < minNum) {
        minIndex = j
        minNum = arr[j]
      }
    }
    if (minIndex !== i) {
      const temp = arr[minIndex]
      arr[minIndex] = arr[i]
      arr[i] = temp
    }
  }
  return arr
}

console.log(selectSort([2, 1, 3, 54, -1, 4]))

function bubbleSort(arr) {
  const length = arr.length
  for (let i = 0; i < length; i++) {
    let isSwap = false
    for (let j = i + 1; j < length; j++) {
      if (arr[i] > arr[j]) {
        isSwap = true
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
    // 如果已经有序，直接退出
    if (!isSwap) {
      return arr
    }
  }
  return arr
}

console.log(bubbleSort([1, 2, 3, 4, 5]))

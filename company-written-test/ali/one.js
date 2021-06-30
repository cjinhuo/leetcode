function getMax(arr) {
  let max = 0
  const length = arr.length
  for (let i = length - 1; i >= 0; i--) {
    const nextIndex = i + 2
    if (nextIndex > length - 1) continue
    const last = nextIndex + 1
    if (last <= length - 1) {
      arr[i] = arr[i] + arr[last] > arr[i] + arr[nextIndex] ? arr[i] + arr[last] : arr[i] + arr[nextIndex]
    } else {
      arr[i] = arr[i] + arr[nextIndex]
    }
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  console.log(arr, max)
  return max
}

getMax([2, 0, 0, 5, 4, 6, 8])
// [2, 0, 0, 5, 4, 6, 8]
// [15, 15, 13, 13, 12, 6, 8]

function getMax(arr) {
  let max = 0
  const length = arr.length
  for (let i = length - 1; i >= 0; i--) {
    const nextIndex = i + 2
    if (nextIndex > length - 1) continue
    arr[i] = arr[i] + arr[nextIndex]
    console.log(arr[i])
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  return max
}

getMax([2, 0, 0, 4, 5])

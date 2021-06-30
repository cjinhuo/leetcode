function quickSort(arr) {
  const sort = (left, right) => {
    if (left >= right) return
    // 取最左边的数为枢纽
    let l = left,
      r = right
    const pivot = arr[l]
    while (l < r) {
      // 从右向左找小于pivot的数
      while (arr[r] >= pivot && l < r) {
        r--
      }
      if (l < r) arr[l++] = arr[r]
      // 从左向右找大于pivot的数
      while (arr[l] <= pivot && l < r) {
        l++
      }
      if (l < r) arr[r] = arr[l++]
    }
    arr[l] = pivot
    sort(left, l)
    sort(l + 1, right)
  }
  sort(0, arr.length - 1)
  return arr
}
console.log(quickSort([10, 3, 2, -1, 5, 4]))

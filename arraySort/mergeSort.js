function mergeSort(arr) {
  const merge = (arr, l, mid, r) => {
    let p1 = l,
      p2 = mid + 1
    const help = []
    while (p1 <= mid && p2 <= r) {
      arr[p1] < arr[p2] ? help.push(arr[p1++]) : help.push(arr[p2++])
    }
    // 清空左边数组
    while (p1 <= mid) {
      help.push(arr[p1++])
    }
    // 清空右边数组
    while (p2 <= r) {
      help.push(arr[p2++])
    }
    for (let i = 0; i < help.length; i++) {
      arr[l + i] = help[i]
    }
  }
  const sortProgress = (arr, l, r) => {
    if (l === r) return
    const mid = Math.floor((l + r) / 2)
    sortProgress(arr, l, mid)
    sortProgress(arr, mid + 1, r)
    merge(arr, l, mid, r)
  }
  sortProgress(arr, 0, arr.length - 1)
  return arr
}

console.log(mergeSort([10, 2, 3, 4, 5]))

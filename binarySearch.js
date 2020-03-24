function binarySearch(arr, num) {
  arr.sort((a, b) => a - b)
  let left = 0,
      right = arr.length - 1
  while(left <= right){
    mid = Math.floor((left + right) / 2)
    if (arr[mid] > num) {
      right = mid - 1
    } else if (arr[mid] < num) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return -1
}

let arr = [-1,1,2,3,4,5,6,10,232323]

console.log(binarySearch(arr, 232323))
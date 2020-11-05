/**
 * 时间复杂度小于O(n+m) 空间复杂度O(m)
 * @param {*} arr1
 * @param {*} arr2
 */
function mergeSortedArray(arr1, arr2) {
  let i = arr1.length - 1,
    j = arr2.length - 1,
    sum = i + j + 1;
  while (i >= 0 && j >= 0) {
    if (arr1[i] > arr2[j]) {
      arr1[sum--] = arr1[i--];
    } else {
      arr1[sum--] = arr2[j--];
    }
  }
  while (j >= 0) {
    arr1[sum--] = arr2[j--];
  }
  return arr1;
}

console.log(mergeSortedArray([1, 2, 3, 99], [-1, 10, 11, 100]));

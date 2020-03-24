let arr = [1,2,3]

arr.forEach(item => {
  if(item === 2) {
    arr.push(4)
  }
  console.log(item)
})
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2){
    arr.push(4)
  }
  console.log(arr[i])
}
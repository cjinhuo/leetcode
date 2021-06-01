let a = 1;
let b = 2;
// 只适用于数字之间的交换
a = a ^ b;
b = a ^ b;
a = a ^ b;
console.log(a, b);

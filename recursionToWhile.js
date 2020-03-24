// function sum(x, y) {
//   if (y > 0) {
//     return sum(x + 1, y - 1);
//   } else {
//     return x;
//   }
// }

// sum(1, 100000)

function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}
function trampoline(f) {
  console.log(f)
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
console.log(trampoline(sum(1, 100000)))
// // sum(1, 100000)




// function Fibonacci2(n, ac1 = 1, ac2 = 1) {
//   if (n <= 1) { return ac2 };

//   return Fibonacci2(n - 1, ac2, ac1 + ac2);
// }
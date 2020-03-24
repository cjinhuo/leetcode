const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1,2,3]

let fib = {
  [Symbol.iterator]() {
    let n1 = 1, n2 = 1;
    return {
      // 是
      // [Symbol.iterator]() { return this },
      next() {
        let current = n2
        n2 = n1
        n1 = n1 + current
        return {value: current, done: false}
      },
      return(v) {
        console.log('is break')
        return { value: v, done: true }
      }
    }
  }
}

for (const iterator of fib) {
  console.log(iterator)
  if (iterator > 3) break;
}




// // 定义构造函数
// function C() { }
// function D() { }

// var o = new C();


// o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype


// o instanceof D; // false，因为 D.prototype 不在 o 的原型链上

// o instanceof Object; // true，因为 Object.prototype.isPrototypeOf(o) 返回 true
// C.prototype instanceof Object // true，同上

// C.prototype = {};
// var o2 = new C();

// o2 instanceof C; // true

// o instanceof C; // false，C.prototype 指向了一个空对象,这个空对象不在 o 的原型链上.

// D.prototype = new C(); // 继承
// var o3 = new D();
// o3 instanceof D; // true
// o3 instanceof C; // true 因为 C.prototype 现在在 o3 的原型链上
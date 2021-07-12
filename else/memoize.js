const memoize = function (fn) {
  const cache = {};
  return function () {
    console.log('arguments', Object.prototype.toString.call(arguments));
    const key = JSON.stringify(arguments);
    var value = cache[key];
    if (!value) {
      console.log('新值，执行中...'); // 为了了解过程加入的log，正式场合应该去掉
      value = [fn.apply(this, arguments)]; // 放在一个数组中，方便应对undefined，null等异常情况
      cache[key] = value;
    } else {
      console.log('来自缓存'); // 为了了解过程加入的log，正式场合应该去掉
    }
    return value[0];
  };
};

// 斐波那契数组
const fibonacci = n => {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

const memoizeFibonacci = memoize(fibonacci);
console.log(memoizeFibonacci(40));
console.log(memoizeFibonacci(40));
console.log(memoizeFibonacci(40));

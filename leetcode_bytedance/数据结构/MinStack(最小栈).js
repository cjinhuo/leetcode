// 最小栈
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.stack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  const length = this.stack.length
  this.stack[length] = x
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const length = this.stack.length
  delete this.stack[length - 1]
  this.stack.length = length - 1
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  const length = this.stack.length
  return this.stack[length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return Math.min(...this.stack)
};
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()) 
minStack.pop();
minStack.top(); 
console.log(minStack.getMin())
// O(n)的时间复杂度
// O(n)的空间复杂度
// 用一个priority来表示优先级大小

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.obj = {}
  this.capacity = capacity
  this.maxPriority = 0
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (key in this.obj) {
    this.obj[key].priority = this.obj[key].priority === this.maxPriority ? this.maxPriority : this.maxPriority + 1
    this.maxPriority = this.obj[key].priority
    return this.obj[key].value
  }
  return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const insert = (insertKey) => {
    this.maxPriority++
    this.obj[insertKey] = {
      value,
      priority: this.maxPriority
    }
  }
  if (key in this.obj) {
    this.obj[key] = {
      value,
      priority: this.obj[key].priority === this.maxPriority ? this.maxPriority : this.maxPriority + 1
    }
    this.maxPriority++
    return
  }
  const entries = Object.entries(this.obj)
  if (entries.length === this.capacity) {
    const minObj = {
      key: null,
      priority: null
    }
    entries.forEach(([k, v]) => {
      if (minObj.priority === null) {
        minObj.key = k
        minObj.priority = v.priority
      } else if (minObj.priority > v.priority) {
        minObj.priority = v.priority
        minObj.key = k
      }
    })
    delete this.obj[minObj.key]
  }
  insert(key)
};


const cache = new LRUCache(2 /* 缓存容量 */);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
console.log(cache.get(2))       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
console.log(cache.get(1));       // 返回 -1 (未找到)
console.log(cache.get(3));       // 返回  3
console.log(cache.get(4));       // 返回  4
console.log(cache)
/**
 * Initialize your data structure here.
 */
var AllOne = function () {
  this.map = {}
};

/**
 * Inserts a new key <Key> with value 1. Or increments an existing key by 1. 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function (key) {
  if (!this.map[key]) {
    this.map[key] = 1
  } else {
    this.map[key]++
  }
};

/**
 * Decrements an existing key by 1. If Key's value is 1, remove it from the data structure. 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function (key) {
  if (this.map[key]) {
    if (this.map[key] > 1)
      this.map[key]--
    else
      delete this.map[key]
  }
};

/**
 * Returns one of the keys with maximal value.
 * @return {string}
 */
AllOne.prototype.getMaxKey = function () {
  var max = -1
  var key = ''
  for (let item in this.map) {
    if (this.map[item] > max) {
      max = this.map[item]
      key = item
    }
  }
  return key
};

/**
 * Returns one of the keys with Minimal value.
 * @return {string}
 */
AllOne.prototype.getMinKey = function () {
  var min = 99999999
  var key = ''
  for (let item in this.map) {
    if (this.map[item] < min) {
      min = this.map[item]
      key = item
    }
  }
  return key
};
let data = [1]
let _data = data
data = new Proxy(_data, {
  get(obj, key) {
    console.log(`get obj:${obj}, key: ${key}`)
    return obj[key]
    return Reflect.get(obj, key)
  },
  set(obj, key, newVal) {
    // 如果值插入成功返回true
    obj[key] = newVal
    // Reflect理解就是高级版的操作对象的方法，比如设置属性成功后有响应
    // const result = Reflect.set(obj, key, newVal);
    // if (result) {
    console.log(`set obj:${obj}, key: ${key},newVal:${newVal}`)
    return true
    // }
    // return false;
  },
})
data[1] = 2 // 直接在下标为1的数字上面改
// set obj:1,2, key: 1,newVal:2
// data.push(10); // push操作
// get obj:1,2, key: push => 取得Array.prototype.push方法
// get obj: 1, 2, key: length => 然后取得array的length属性
// set obj: 1, 2, 10, key: 2, newVal: 10 => 再设置data[length] = 10
// set obj: 1, 2, 10, key: length, newVal: 3 => 再执行length++

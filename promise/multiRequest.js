// 智云第三周 每周一练
/**
 * 模拟异步请求
 * @param {Number} delay 延迟秒数
 * @param {Any} result 返回数据
 */
function setTimeoutWithParam(delay, result) {
  return () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(result);
      }, delay);
    });
  };
}
/**
 * 最大并发量
 * 实现一个批量请求函数 multiRequest(urls, maxNum)
 * 要求最大并发数 maxNum
 * 每当有一个请求返回，就留下一个空位，可以增加新的请求
 * 所有请求完成后，结果按照 urls 里面的顺序依次打出
 * @param {Array} urls 异步请求
 * @param {Number} maxNum 并发的最大数量
 * @param {Function} singleFetchOverCallback 单个执行完执行的回调函数，异步返回的数据作为入参
 */
function multiRequest(urls, maxNum, singleFetchOverCallback) {
  const originUrls = urls;
  const curUrls = [...urls];
  const results = [];
  multiRequest.prototype.addUrl = function (url) {
    originUrls.push(url);
    curUrls.push(url);
    pushFetch();
  };
  function pushFetch() {
    while (maxNum > 0 && curUrls.length > 0) {
      maxNum--;
      curUrls
        .shift()()
        .then(res => {
          results.push(res);
          // 单个执行完成
          singleFetchOverCallback(res);
          if (results.length === originUrls.length) {
            // 全部执行完成
            multiRequest.resolve(results);
          }
          if (curUrls.length > 0) {
            maxNum++;
            pushFetch();
          }
        });
    }
  }
  return new Promise(resolve => {
    multiRequest.resolve = resolve;
    pushFetch();
  });
}
multiRequest(
  [
    setTimeoutWithParam(2000, 3),
    setTimeoutWithParam(1000, 1),
    setTimeoutWithParam(2000, 2),
    setTimeoutWithParam(4000, 4),
    setTimeoutWithParam(5000, 5),
    setTimeoutWithParam(6000, 6),
  ],
  5,
  res => {
    if (res === 5) {
      // 增加一个异步请求
      multiRequest.prototype.addUrl(setTimeoutWithParam(100, 7));
    }
    console.log('single', res);
  }
).then(res => {
  console.log('all over', res);
});

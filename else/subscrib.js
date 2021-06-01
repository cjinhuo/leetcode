const handles = {};
function subscribe(key, fn) {
  // 可以是数组
  handles[key] = handles[key] || [];
  handles[key].push(fn);
}

function triggerHandlers(key) {
  const res = handles[key];
  res &&
    res.forEach(fn => {
      if (typeof fn === 'function') {
        fn();
      }
    });
}

// 最基础版的节流
const throttle = (fn, delay = 300) => {
  let canRun = true;
  return (...args) => {
    if (!canRun) return;
    fn.apply(this, args);
    canRun = false;
    setTimeout(() => {
      canRun = true;
    }, delay);
  };
};

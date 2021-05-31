// implement class extends
function Father() {}
Father.prototype.test = function () {
  return 'father';
};
function Son() {
  Father.call(this);
}
Son.prototype = Object.create(Father.prototype, { constructor: { value: Son, writable: true, configurable: true } });
Son.__proto__ = Father;

class Person {
  @readonly
  name() {
    return `${this.first} ${this.last}`;
  }
}

function readonly(target, name, descriptor) {
  console.log(target, name, descriptor);
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

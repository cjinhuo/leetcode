
// function test(arr, str) {
//   var o = new Function('', `
//             const ${str} = ${JSON.stringify(arr)};
//             const arr=${JSON.stringify(str)}.match(/[a-z]+/ig);
//             const obj={};
//             for(let i of arr){
//                 obj[i]=eval(i);
//             }
//             console.log(obj);
//         `);
//   o(arr, str);
// }


// const [a, b, c] = [1, [2, 4],4]
// console.log(a,b,c)



function parent() {
  this.name = 'parent'
  console.log('parent被执行')
  this.logger = function() {
    console.log(this)
  }
}



function destructuringArray(ary, str) {
  var tmp = str.replace(/[\[\]\.]/g, "");//正则去除[] 去除... 
  console.log(tmp)
  console.log("var " + tmp + ";" + str + "=" + JSON.stringify(ary) + ";return {" + tmp + "};")
  return new Function("var " + tmp + ";" + str + "=" + JSON.stringify(ary) + ";return {" + tmp + "};")();
}
// test([1, [2, 4], 3], "[a,[b,d,e],c]");

console.log(destructuringArray([1, [2, [100], 4], 3], "[a,[b,[ab],d,e],c]"))

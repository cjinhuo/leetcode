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

function destructuringArray(ary, str) {
  var tmp = str.replace(/[\[\]\.]/g, '') //正则去除[] 去除...
  console.log('var ' + str + '=' + JSON.stringify(ary) + ';return {' + tmp + '};')
  eval('var ' + str + '=' + JSON.stringify(ary))
  console.log(ab)
  // return
}
// test([1, [2, 4], 3], "[a,[b,d,e],c]");
console.log(destructuringArray([1, [2, [100], 4], 3], '[a,[b,[ab],d,e],c]'))

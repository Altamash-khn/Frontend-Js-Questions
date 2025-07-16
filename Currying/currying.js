// function sum(a, b, c) {
//   return a + b + c;
// }

// function curry(callback) {
//   return function (a) {
//     return function (b) {
//       return function (c) {
//         return callback(a, b, c);
//       };
//     };
//   };
// }

// const curriedSum = curry(sum);
// console.log(curriedSum()()());


function curry(callback) {
  return function next(...a) {
    if(a.length === 0){
      return callback(0)
    }
    return function (...b) {
      if (b.length > 0) {
        return next(...a, ...b);
      } else {
        return callback(...a);
      }
    };
  };
}

const sum = (...numbers) => numbers.reduce((total, number) => total += number, 0);
const curriedSum = curry(sum);
console.log(curriedSum());

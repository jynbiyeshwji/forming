// const sum = function () {
// 	console.log('sum');
// }
// 1.参数问题
// 1.1 含有两个参数
const sum = (num1, num2) => {
	return num1 + num2
}

console.log(sum(2, 3));

//1.2 含有一个参数
// const power = (num) => {
//  return num * num
// }
// const power = num => {
//  return num * num
// }
const power = num => num * num
console.log(power(3));

// 2.函数中代码的行数问题
// 2.1 函数代码块中有多行函数
const test = () => {
	console.log('---');
	console.log('+++');
}
test()

// 2.2 函数代码块中只用一行代码
// const mul = (num1, num2) => {
// 	return num1 * num2
// }
const mul = (num1, num2) => num1 * num2
console.log(mul(2, 3));

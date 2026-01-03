async function result() {
	// let arr = ["*"]

	// while (arr.length < 5) {
	// 	console.log("Array: ", arr);
	// 	arr.push(arr[0]);
	// }

	const ast = "*"
	let modifiedAst = ""

	for (let index = 0; index < 5; index++) {
		modifiedAst = ast.repeat(index)
		setTimeout(() => {
		console.log(modifiedAst)
		}, 2000);
	}
}
await result()
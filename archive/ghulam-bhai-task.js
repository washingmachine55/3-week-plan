const threeLevelArray = [
	[
		[101, [201, 202, 203], [301]],
		[102, [204], [302, 303]],
		[103, [205, 206], [304]],
		[104, [207], [305, 306, 307]],
		[105, [208, 209], [308]]
	],
	[
		[106, [210], [309, 310]],
		[107, [211, 212, 213], [311]],
		[108, [214], [312]],
		[109, [215, 216], [313, 314]],
		[110, [217], [315]]
	],
	[
		[111, [218, 219], [316]],
		[112, [220], [317, 318]],
		[113, [221, 222, 223], [319]],
		[114, [224], [320]],
		[115, [225, 226], [321, 322]]
	],
	[
		[116, [227], [323]],
		[117, [228, 229], [324, 325]],
		[118, [230], [326]],
		[119, [231, 232, 233], [327]],
		[120, [234], [328, 329]]
	],
	[
		[121, [235, 236], [330]],
		[122, [237], [331, 332]],
		[123, [238, 239, 240], [333]],
		[124, [241], [334]],
		[125, [242, 243], [335, 336]]
	]
];

// function compareFn(a, b) {
// 	if (a < b) {
// 		return -1;
// 	} else if (a > b) {
// 		return 1;
// 	}
// 	return 0;
// }

function compareNumbers(a, b) {
	return a - b;
}

async function result() {
	const arrToWorkWith = structuredClone(threeLevelArray)
	const flatArr = arrToWorkWith.flat(Infinity)

	const modifiedArr = flatArr.sort(compareNumbers)

	console.log(flatArr);
	console.log('------------------------');
	console.log(modifiedArr);
}

result()
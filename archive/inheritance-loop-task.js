const data = [
	// Level 1 (root)
	{ id: 1, name: "Products", parentId: 0 },
	{ id: 2, name: "Services", parentId: 0 },
	// Level 2
	{ id: 3, name: "Electronics", parentId: 1 },
	{ id: 4, name: "Furniture", parentId: 1 },
	{ id: 5, name: "Consulting", parentId: 2 },
	// Level 3
	{ id: 6, name: "Computers", parentId: 3 },
	{ id: 7, name: "Mobile Phones", parentId: 3 },
	{ id: 8, name: "Chairs", parentId: 4 },
	{ id: 9, name: "IT Consulting", parentId: 5 },
	// Level 4 (deepest level)
	{ id: 10, name: "Laptops", parentId: 6 },
	{ id: 11, name: "Desktops", parentId: 6 },
	{ id: 12, name: "Android Phones", parentId: 7 },
	{ id: 13, name: "iPhones", parentId: 7 },
	// Some branches stop early (not 4 levels deep)
	{ id: 14, name: "Gaming Chairs", parentId: 8 }, // only 3 levels
	{ id: 15, name: "Business Strategy", parentId: 5 }, // only 2 levels
	{ id: 16, name: "Home Decor", parentId: 4 } // only 2 levels
];

function compareNumbers(a, b) {
	return a - b
}

async function result() {
	const clonedData = structuredClone(data);
	// console.log(clonedData[index].parentId == parentIndex++);

	const parentsArray = []
	
	let index = 0
	let parentIndex = clonedData[index].parentId
	let childIndex = clonedData[index].id


	for (let i = 0; i < clonedData.length; i++) {
	// console.log('Original: ', clonedData);
		for (let j = 0; clonedData[i].parentId < j; j++) {
			parentsArray.push(clonedData[i])
		}
	}

	console.log(parentsArray);
	

}













	// for (index; index < clonedData.length; index++) {
	// 	while (parentIndex < childIndex) {
	// 		for (index; index < clonedData.length; index++) {
	// 			// console.log("Children: ", clonedData[index]);
	// 			// for (parentIndex; parentIndex < childIndex; parentIndex++) {
	// 			// for (childIndex; childIndex < index; childIndex++) {
	// 			// }
	// 			// console.log("Data: ", clonedData[index]);

	// 			console.log("Child Data: ", clonedData[index]);
	// 			var changedVal = childIndex++
	// 			console.log(changedVal);
	// 		}
	// 	}

		// for (childIndex; childIndex == parentIndex; childIndex++) {
		// parentIndex - childIndex
		// for (parentIndex; parentIndex <= childIndex; parentIndex++) {
		// console.log("Parent Data: ", clonedData[index]);
		// parentIndex - childIndex
		// }
		// }

		// do {
		// 	console.log("Data: ", clonedData[index]);
		// 	parentIndex;
		// } while (parentIndex - childIndex);

		// if (parentIndex == childIndex) {
		// console.log("Children: ", clonedData[index]);
		// }


		// do {
		// 	index++;
		// } while (parentIndex < childIndex);

// for (index; index < secondLevel; index++) {
// 	const element = clonedData[index];
// 	console.log(element);


// }



// for (schmol in bikk) {
// 	index < 10;
// 	console.log(clonedData[index]);
// }

result()
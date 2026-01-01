// const promise1 = console.log('Adam: Lets get food after 3 seconds :D');

// const promise2 = new Promise((resolve,reject) => {
// 	[setTimeout(() => {
// 		console.log('=======INTERRUPTED=======');
// 		resolve()
// 	}, 2000)];
// });

// const promise3 = new Promise((resolve,reject) => {
// 	[setTimeout(() => {
// 		console.log('Adam: Sorry, I was helping my friend. It only took 6 seconds though.');
// 		// reject();
// 		resolve();
// 	}, 6000)];
// })

// Promise.all([
// 		promise1,promise2,promise3
// 	]).then(() => {
// 		console.log('Zara: Oh well, its good that you only took 6 seconds, otherwise...')
// 	}).catch(() => console.log('Zara: Never will I ever trust you again :('))

// -------------------------------------------------------------------------
// -----------------------------Standard Promises---------------------------
// -------------------------------------------------------------------------

import { setTimeout } from 'node:timers/promises'; // Use import

const accepted = async () => console.log('Zara: Oh well, its good that you only took 6 seconds, otherwise...');
const rejected = async () => console.log('Zara: Never will I ever trust you again :(')

const promise1 = async () => console.log('Adam: Lets get food after 2 seconds :D');

// const promise2 = async () => {
// 	return setTimeout(() => {
// 		console.log('=======INTERRUPTED=======');
// 	}, 2000);
// };
const promise2 = async () => {
	const timer = await setTimeout(
		2000, 
		() => console.log('=======INTERRUPTED======='),
	);
	timer();
};

// const promise3 = async (response = true) => {
// 	return setTimeout(() => {
// 		console.log('Adam: Sorry, I was helping my friend. It only took 4 seconds though.');
// 		if (response == false) {
// 			throw new Error(rejected());
// 		}
// 	}, 4000);
// };
const promise3 = async (response = true) => {
	const timer = await setTimeout(4000, () => {
		console.log('Adam: Sorry, I was helping my friend. It only took 4 seconds though.');
		if (response == false) {
			throw new Error(rejected());
		}
	});
	timer();
};

async function run() {
	try {
		Promise.all([
			promise1(),
			promise2(),
			promise3(),
		]).then(accepted())
	} catch (error) {
		return error;
	// console.log(error);
	}
}

run();
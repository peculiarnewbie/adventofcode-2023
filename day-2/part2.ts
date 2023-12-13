import * as fs from "fs";

const startTime = Date.now();

const main = () => {
	const input = fs.readFileSync("./input.txt", "utf8");

	let arr = input.split("\n");

	let answer = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i].length < 1) continue;
		answer += calculateLine(arr[i]);
	}

	return answer;
};

const calculateLine = (line: string): number => {
	const arr = line.split(": ");
	const game = arr[1];
	const id = arr[0].split(" ")[1];

	const cubes = [0, 0, 0];

	for (let i = 0; i < game.length; i++) {
		if (game[i] >= "0" && game[i] <= "9") {
			const sliced = game.slice(i, i + 9);
			//console.log("sliced:", sliced);
			let cube = sliced.split(",");
			if (sliced.length < 9) {
				cube = [sliced];
			} else if (cube.length < 2) {
				cube = sliced.split(";");
			}
			const splitCube = cube[0].split(" ");
			const value = parseInt(splitCube[0]);
			const color = splitCube[1];

			if (color.length == 3) {
				if (cubes[0] < value) cubes[0] = value;
				i += 3;
			} else if (color.length == 4) {
				if (cubes[1] < value) cubes[1] = value;
				i += 4;
			} else {
				if (cubes[2] < value) cubes[2] = value;
				i += 5;
			}

			//console.log("cube: ", cube[0]);
			//console.log(value, color);
		}
	}

	return cubes[0] * cubes[1] * cubes[2];
};

const answer = main();
const endTime = Date.now();

console.log("answer:", answer);

console.log("run time:", endTime - startTime, "ms");

// 99 green,
// 2 red, 3 red

import * as fs from "fs";

const startTime = Date.now();

const input = fs.readFileSync("./input.txt", "utf8");

let arr = input.split("\n");

const main = () => {
	let answer = 0;

	answer = traverseInput();

	return answer;
};

const traverseInput = (): number => {
	let answer = 0;
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			const x = arr[i][j];

			if (x == "*") {
				answer += checkSurrounding(i, j);
			}
		}
	}
	return answer;
};

const isNumber = (x: string): boolean => {
	if (x.length > 1) throw "just do 1 character pls";
	if (x >= "0" && x <= "9") {
		return true;
	}
	return false;
};

const isSymbol = (i: number, j: number): boolean => {
	let x: string;
	if (i >= 0 && j >= 0 && i <= 139 && j <= 139) {
		x = arr[i][j];
		if (!(x >= "0" && x <= "9") && x != ".") {
			return true;
		}
	}
	return false;
};

const checkSurrounding = (i: number, j: number): number => {
	const around = [
		{ x: i - 1, y: j - 1 },
		{ x: i - 1, y: j },
		{ x: i - 1, y: j + 1 },
		{ x: i, y: j - 1 },
		{ x: i, y: j + 1 },
		{ x: i + 1, y: j - 1 },
		{ x: i + 1, y: j },
		{ x: i + 1, y: j + 1 },
	];

	let addedCoords: { x: number; y: number }[] = [];
	let addedNumbers: number[] = [];

	around.forEach((coord) => {
		if (i >= 0 && j >= 0 && i <= 139 && j <= 139) {
			//console.log(coord, addedNumbers, addedCoords);
			if (isNumber(arr[coord.x][coord.y])) {
				let isCoordAdded = false;
				addedCoords.forEach((el) => {
					//console.log(el, coord);
					if (el.x == coord.x && el.y == coord.y && !isCoordAdded)
						isCoordAdded = true;
				});
				//console.log(isCoordAdded);
				if (!isCoordAdded) {
					const [fullNumber, coords] = getFullNumber(
						coord.x,
						coord.y
					);
					addedCoords = [...addedCoords, ...coords];
					//console.log(fullNumber, coords, addedCoords);
					addedNumbers.push(fullNumber);
				}
			}
		}
	});
	console.log(addedNumbers);
	if (addedNumbers.length == 2) return addedNumbers[0] * addedNumbers[1];

	return 0;
};

const getFullNumber = (
	i: number,
	j: number
): [number, { x: number; y: number }[]] => {
	let coords: { x: number; y: number }[] = [];
	let numString = arr[i][j];
	let x: string = "0";
	let pointer = 1;
	//traverse back
	while (true) {
		if (j - pointer >= 0) {
			x = arr[i][j - pointer];
			if (isNumber(x)) {
				numString = x + numString;
				coords.push({ x: i, y: j - pointer });
			} else break;
		} else break;
		pointer++;
	}
	x = "0";
	pointer = 1;
	//traverse forward
	while (true) {
		if (j + pointer <= 139) {
			x = arr[i][j + pointer];
			if (isNumber(x)) {
				numString = numString + x;
				coords.push({ x: i, y: j + pointer });
			} else break;
		} else break;
		pointer++;
	}
	return [parseInt(numString), coords];
};

const answer = main();
const endTime = Date.now();

console.log("answer:", answer);

console.log("run time:", endTime - startTime, "ms");

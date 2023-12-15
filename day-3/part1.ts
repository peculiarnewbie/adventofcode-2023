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

			if (isNumber(x)) {
				if (checkSurrounding(i, j)) {
					const [fullNumber, skip] = getFullNumber(i, j);
					console.log("neighboring symbol", fullNumber, i, j);
					j += skip - 1;
					answer += fullNumber;
				}
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

const checkSurrounding = (i: number, j: number): boolean => {
	if (
		isSymbol(i - 1, j - 1) ||
		isSymbol(i - 1, j) ||
		isSymbol(i - 1, j + 1) ||
		isSymbol(i, j - 1) ||
		isSymbol(i, j + 1) ||
		isSymbol(i + 1, j - 1) ||
		isSymbol(i + 1, j) ||
		isSymbol(i + 1, j + 1)
	) {
		return true;
	}
	return false;
};

const getFullNumber = (i: number, j: number): [number, number] => {
	let numString = arr[i][j];
	let x: string = "0";
	let pointer = 1;
	//traverse back
	while (true) {
		if (j - pointer >= 0) {
			x = arr[i][j - pointer];
			if (isNumber(x)) numString = x + numString;
			else break;
		} else break;
		pointer++;
	}
	x = "0";
	pointer = 1;
	//traverse forward
	while (true) {
		if (j + pointer <= 139) {
			x = arr[i][j + pointer];
			if (isNumber(x)) numString = numString + x;
			else break;
		} else break;
		pointer++;
	}
	return [parseInt(numString), pointer];
};

const answer = main();
const endTime = Date.now();

console.log("answer:", answer);

console.log("run time:", endTime - startTime, "ms");

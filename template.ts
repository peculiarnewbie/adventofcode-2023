import * as fs from "fs";

const startTime = Date.now();

const main = () => {
	const input = fs.readFileSync("./input.txt", "utf8");

	let answer;

	return answer;
};

const answer = main();
const endTime = Date.now();

console.log("answer:", answer);

console.log("run time:", endTime - startTime, "ms");

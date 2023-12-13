import { error } from "console";
import * as fs from "fs";

const isNumber = (char: string) => {
  if (char.length > 1) throw error;
  else {
    if (char[0] >= "0" && char[0] <= "9") {
      return true;
    } else return false;
  }
};

const calibrate = (line: string): number => {
  let val1 = "0";
  for (let i = 0; i < line.length; i++) {
    if (isNumber(line[i])) {
      if (val1 == "0") val1 = line[i] + line[i];
      else {
        val1 = val1[0] + line[i];
      }
    }
  }
  return parseInt(val1);
};

const input = fs.readFileSync("./input.txt", "utf8");

let arr = input.split("\n");

let answer: number = 0;
for (let i = 0; i < arr.length; i++) {
  answer += calibrate(arr[i]);
}

console.log(answer);

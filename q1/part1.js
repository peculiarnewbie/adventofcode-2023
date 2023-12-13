"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var fs = require("fs");
var startTime = Date.now();
var main = function () {
    var input = fs.readFileSync("./input.txt", "utf8");
    var arr = input.split("\n");
    var answer = 0;
    for (var i = 0; i < arr.length; i++) {
        answer += calibrate(arr[i]);
    }
    return answer;
};
var isNumber = function (char) {
    if (char.length > 1)
        throw console_1.error;
    else {
        if (char[0] >= "0" && char[0] <= "9") {
            return true;
        }
        else
            return false;
    }
};
var calibrate = function (line) {
    var val1 = "0";
    for (var i = 0; i < line.length; i++) {
        if (isNumber(line[i])) {
            if (val1 == "0")
                val1 = line[i] + line[i];
            else {
                val1 = val1[0] + line[i];
            }
        }
    }
    return parseInt(val1);
};
var answer = main();
var endTime = Date.now();
console.log("answer:", answer);
console.log("run time:", endTime - startTime, "ms");

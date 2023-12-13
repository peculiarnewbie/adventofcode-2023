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
var numberData = [
    { string: "NaN", value: 0, length: 10000 },
    { string: "one", value: 1, length: 3 },
    { string: "two", value: 2, length: 3 },
    { string: "three", value: 3, length: 5 },
    { string: "four", value: 4, length: 4 },
    { string: "five", value: 5, length: 4 },
    { string: "six", value: 6, length: 3 },
    { string: "seven", value: 7, length: 5 },
    { string: "eight", value: 8, length: 5 },
    { string: "nine", value: 9, length: 4 },
];
var isNumber = function (char) {
    if (char.length > 1)
        throw console_1.error;
    else {
        if (char[0] >= "1" && char[0] <= "9") {
            return true;
        }
        else
            return false;
    }
};
var calibrate = function (line) {
    var val = "0";
    for (var i = 0; i < line.length; i++) {
        if (isNumber(line[i])) {
            if (val == "0")
                val = line[i] + line[i];
            else {
                val = val[0] + line[i];
            }
        }
        else {
            if (line.length - i > 2) {
                var wordVal = isWord(line, i);
                if (wordVal == 0)
                    continue;
                else {
                    if (val == "0")
                        val = wordVal.toString() + wordVal.toString();
                    else {
                        val = val[0] + wordVal.toString();
                    }
                    i + numberData[wordVal].length;
                }
            }
        }
    }
    return parseInt(val);
};
var isWord = function (line, index) {
    var x = line[index];
    if (x != "o" && x != "t" && x != "f" && x != "s" && x != "e" && x != "n")
        return 0;
    else {
        if (x == "o") {
            if (line[index + 1] == "n") {
                if (line[index + 2] == "e") {
                    return 1;
                }
            }
            return 0;
        }
        else if (x == "t") {
            if (line[index + 1] == "w") {
                if (line[index + 2] == "o") {
                    return 2;
                }
            }
            else if (line[index + 1] == "h") {
                if (line[index + 2] == "r") {
                    if (line[index + 3] == "e") {
                        if (line[index + 4] == "e") {
                            return 3;
                        }
                    }
                }
            }
            return 0;
        }
        else if (x == "f") {
            if (line[index + 1] == "o") {
                if (line[index + 2] == "u") {
                    if (line[index + 3] == "r") {
                        return 4;
                    }
                }
            }
            else if (line[index + 1] == "i") {
                if (line[index + 2] == "v") {
                    if (line[index + 3] == "e") {
                        return 5;
                    }
                }
            }
            return 0;
        }
        else if (x == "s") {
            if (line[index + 1] == "i") {
                if (line[index + 2] == "x") {
                    return 6;
                }
            }
            else if (line[index + 1] == "e") {
                if (line[index + 2] == "v") {
                    if (line[index + 3] == "e") {
                        if (line[index + 4] == "n") {
                            return 7;
                        }
                    }
                }
            }
            return 0;
        }
        else if (x == "e") {
            if (line[index + 1] == "i") {
                if (line[index + 2] == "g") {
                    if (line[index + 3] == "h") {
                        if (line[index + 4] == "t") {
                            return 8;
                        }
                    }
                }
            }
        }
        else if (x == "n") {
            if (line[index + 1] == "i") {
                if (line[index + 2] == "n") {
                    if (line[index + 3] == "e") {
                        return 9;
                    }
                }
            }
        }
    }
    return 0;
};
var answer = main();
var endTime = Date.now();
console.log(answer);
console.log("run time:", endTime - startTime, "ms");
/*
one
two
three
four
five
six
seven
eight
nine
*/

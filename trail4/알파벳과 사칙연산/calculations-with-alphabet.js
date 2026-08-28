const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const expression = input[0].split('');

// Please Write your code here.

const expObj = {
    '+' : (a, b) => a + b,
    '-' : (a, b) => a - b,
    '*' : (a, b) => a * b
};

const operators = expression.filter((v, i) => i % 2 === 1);
const alps = expression.filter((v, i) => i % 2 === 0);
const alpsSet = [...new Set(alps)];

const N = alpsSet.length;

const combination = (arr, result) => {
    if (arr.length >= N) {
        result.push(arr);
        return;
    }

    for (let i = 1; i <= 4; i++) {
        combination([...arr, i], result);
    }
}

const combinations = [];

combination([], combinations);

const calculate = (numArr) => {
    let answer = 0;
    const alpMap = new Map();

    numArr.forEach((value, index) => {
        alpMap.set(alpsSet[index], value);
    });
    // console.log(alpMap);
    answer += alpMap.get(alps[0]);

    for (let i = 0; i < operators.length; i++) {
        const opFnc = expObj[operators[i]];
        const tmp = alpMap.get(alps[i + 1]);
        answer = opFnc(answer, tmp);
    }

    return answer;
}

let answer = -Infinity;

for (const arr of combinations) {
    answer = Math.max(answer, calculate(arr));
}

console.log(answer);
// console.log(calculate([1, 4, 4]));
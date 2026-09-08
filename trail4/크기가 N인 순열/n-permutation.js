const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);

// Please Write your code here.

const combination = (arr, v, result) => {
    if (arr.length === n) {
        result.push(arr);
        return;
    }

    for (let i = 1; i <= n; i++) {
        if ((v & 1 << i) !== 0) continue;

        combination([...arr, i], v | 1 << i, result);
    }
}

const answer = [];

combination([], 1 << 9, answer);

console.log(answer.map(v => v.join(' ')).join('\n'));
const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const n = Number(input[0]);
// Please Write your code here.

const combination = (arr, visited, result) => {
    if (arr.length === n) {
        result.push(arr);
        return;
    }

    for (let i = n; i > 0; i--) {
        if ((visited & 1 << i) !== 0) continue;
        combination([...arr, i], visited | 1 << i, result);
    }
}

const result = [];
combination([], 0, result);

console.log(result.map(v => v.join(' ')).join('\n'));
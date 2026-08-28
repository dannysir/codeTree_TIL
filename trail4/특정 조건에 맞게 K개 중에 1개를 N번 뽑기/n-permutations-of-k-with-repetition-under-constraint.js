const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [k, n] = input[0].split(' ').map(Number);

// Please Write your code here.
const combination = (prev, cnt, arr, result) => {
    if (arr.length >= n) {
        result.push(arr);
        return;
    }

    for (let i = 1; i <= k; i++) {
        if (prev === i) {
            if (cnt + 1 < 3) {
                combination(i, cnt + 1, [...arr, i], result);
            } else continue;
        } else combination(i, 1, [...arr, i], result);
    }
}

const combinationArray = [];

combination(-1, 0, [], combinationArray);

combinationArray.sort();

console.log(combinationArray.map(v => v.join(' ')).join('\n'));
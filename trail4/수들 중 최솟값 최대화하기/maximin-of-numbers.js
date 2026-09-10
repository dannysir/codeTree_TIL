const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
let answer = -Infinity;

const combination = (min, cnt, visited) => {
    if (cnt === n) {
        answer = Math.max(answer, min);
        return;
    }

    for (let i = 0; i < n; i++) {
        if ((visited & 1 << i) !== 0) continue;

        combination(Math.min(min, grid[cnt][i]), cnt + 1, visited | 1 << i);
    }
}

combination(Infinity, 0, 0);

console.log(answer);
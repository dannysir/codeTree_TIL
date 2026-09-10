const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const cost = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
let answer = Infinity;

const combination = (prev, cnt, sum, visited) => {
    if (cnt === n) {
        if (cost[prev][0] === 0) return;
        answer = Math.min(answer, sum + cost[prev][0]);
        return;
    }

    if (sum >= answer) return;

    for (let i = 1; i < n; i++) {
        if ((visited & (1 << i)) !== 0 || cost[prev][i] === 0) continue;

        combination(i, cnt + 1, sum + cost[prev][i], visited | 1 << i);
    }
}

combination(0, 1, 0, 1);

console.log(answer);
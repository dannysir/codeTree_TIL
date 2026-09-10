const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
const combination = (cnt, sum, visited, result) => {
    if (cnt === n) {
        result.push(sum);
        return;
    }

    for (let i = 0; i < n; i++) {
        if ((visited & 1 << i) !== 0) continue;

        combination(cnt + 1, sum + grid[cnt][i], visited | 1 << i, result);
    }
}

const calc = (arr) => {
    return arr.reduce((acc, cur, idx) => acc + grid[idx][cur], 0);
}

const solution = () => {
    const cArr = [];


    combination(0, 0, 0, cArr);
    
    console.log(Math.max(...cArr));
}

solution();
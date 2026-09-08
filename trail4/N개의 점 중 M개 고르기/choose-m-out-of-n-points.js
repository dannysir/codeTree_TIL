const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const points = input.slice(1, Number(n) + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
let answer = Infinity;

const calcDist = (a, b) => {
    return Math.abs(a[0] - b[0]) ** 2 + Math.abs(a[1] - b[1]) ** 2;
}

const combination = (index, arr, dist) => {
    if (arr.length === m) {
        answer = Math.min(answer, dist);
        return;
    }

    for (let i = index; i < n; i++) {
        let tmp = dist;
        const next = points[i];
        
        arr.forEach(value => {
            tmp = Math.max(tmp, calcDist(value, next));
        });

        combination(i + 1, [...arr, next], tmp);
    }
}

combination(0, [], 0);

console.log(answer);
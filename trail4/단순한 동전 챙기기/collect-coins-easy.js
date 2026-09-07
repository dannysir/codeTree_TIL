const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, n + 1);

// Please Write your code here.
const positions = new Map();
const board = grid.map(v => v.split(''));
let sP;
let eP;

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (board[i][j] === '.') continue;
        if (board[i][j] === 'S') {
            sP = [i, j];
            continue;
        }
        if (board[i][j] === 'E') {
            eP = [i, j];
            continue;
        }

        positions.set(+board[i][j], [i, j]);
    }
}

const combination = (index, arr, visited, keys, result) => {
    if (arr.length >= 3) {
        result.push(arr);
        return;
    }

    for (let i = index; i < keys.length; i++) {
        if (!visited[i]) {
            visited[i] = true;
            combination(i + 1, [...arr, keys[i]], visited, keys, result);
            visited[i] = false;
        }
    }
}

const calcDistance = (a, b) => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

const solution = () => {
    
    const cArr = [];
    const kArr = [...positions.keys()];
    kArr.sort();
    if (kArr.length < 3) {
        console.log(-1);
        return;
    }
    const visited = Array(kArr.length).fill(false);
    let max = Infinity;

    combination(0, [], visited, kArr, cArr);

    cArr.forEach(arr => {
        let sum = 0;
        let now = sP;
        arr.forEach(next => {
            const nP = positions.get(next);
            sum += calcDistance(now, nP);
            now = nP;
        });

        sum += calcDistance(now, eP);
        max = Math.min(max, sum);
    });

    console.log(max === Infinity ? -1 : max);
}

solution();
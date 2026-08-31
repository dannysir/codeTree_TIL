const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const num = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));
const moveDir = input.slice(1 + n, 1 + 2 * n).map(line => line.split(' ').map(Number));
const [r, c] = input[1 + 2 * n].split(' ').map(Number);

// Please Write your code here.
const dirs = [
    [-1, 0], 
    [-1, 1], 
    [0, 1],
    [1, 1], 
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1]
];
let answer = 0;

const dfs = (x, y, cnt) => {
    answer = Math.max(answer, cnt);

    for (let i = 1; i <= n; i++) {
        const dir = dirs[moveDir[x][y] - 1];
        const [nx, ny] = [x + dir[0] * i, y + dir[1] * i];
        
        if (nx < 0 || nx >= n || ny < 0 || ny >= n) break;

        if (num[nx][ny] > num[x][y]) {
            dfs(nx, ny, cnt + 1);
        }
    }
}

dfs(r - 1, c - 1, 0);

console.log(answer);
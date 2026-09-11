const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1).map(row => row.split(' ').map(Number));

// Please Write your code here.
const dirs = [[1,0], [0, 1]];
const visited = Array.from({length : n}, _ => Array(m).fill(false));

const dfs = (x, y) => {
    if (x === n - 1 && y === m - 1) {
        return true;
    }

    let answer = false;

    for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || nx >= n || ny < 0 || ny >= m || grid[nx][ny] === 0 || visited[nx][ny]) continue;

        visited[nx][ny] = true;
        
        if (dfs(nx, ny)) {
            answer = true;
            break;
        }
    }

    return answer;
}

const solution = () => {
    if (grid[0][0] === 0 || grid[n - 1][m - 1] === 0) {
        return 0;
    }

    visited[0][0] = true;

    const answer = dfs(0, 0);

    return answer ? 1 : 0;
}

console.log(solution());
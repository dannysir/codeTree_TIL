const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

const bfs = (now, visited) => {
    const queue = [now];
    let idx = 0;
    let cnt = 1;
    while (queue.length > idx) {
        const [x, y] = queue[idx++];

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= n || ny < 0 || ny >= n || visited[nx][ny] || grid[nx][ny] === 0) continue;

            visited[nx][ny] = true;
            cnt++;
            queue.push([nx, ny]);
        }
    }

    return cnt;
}

const solution = () => {
    const visited = Array.from({length : n}, _ => Array(n).fill(false));
    const resultArr = [];
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1 && !visited[i][j]) {
                visited[i][j] = true;
                resultArr.push(bfs([i, j], visited));
            }
        }
    }

    resultArr.sort((a, b) => a - b);
    console.log(`${resultArr.length}\n${resultArr.join('\n')}`);
}

solution();
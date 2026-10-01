const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, n + 1).map(row => row.split(" ").map(Number));

// Please write your code here.

const bfs = (x, y, target, visited) => {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const queue = [[x, y]];
    let size = 1;
    let idx = 0;

    while (queue.length > idx) {
        const [x, y] = queue[idx++];

        for (const [dx, dy] of dirs) {
            const [nx, ny] = [x + dx, y + dy];

            if (nx < 0 || nx >= n || ny < 0 || ny >= n || grid[nx][ny] !== target || visited[nx][ny]) continue;

            visited[nx][ny] = true;
            size++;
            queue.push([nx, ny]);
            
        }
    }

    return size;
}

const solution = () => {
    const visited = Array.from({length : n}, _ => Array(n).fill(false));
    const answer = [0, 0];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const value = grid[i][j];

            if (!visited[i][j]) {
                visited[i][j] = true;
                const size = bfs(i, j, value, visited);
                answer[1] = Math.max(answer[1], size);
                if (size < 4) continue;
                answer[0]++;
            }
        }
    }

    console.log(answer.join(' '));
}

solution();

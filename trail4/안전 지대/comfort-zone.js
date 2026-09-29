const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + Number(n)).map(line => line.split(' ').map(Number));

let max = -Infinity;

grid.forEach((arr, x) => {
    arr.forEach((value, y) => {
        max = Math.max(value, max);
    })
});

// Please Write your code here.
const bfs = (now, k, visited) => {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const queue = [[...now]];
    
    let idx = 0;

    while (queue.length > idx) {
        const [x, y] = queue[idx++];

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= n || ny < 0 || ny >= m || visited[nx][ny] || grid[nx][ny] - k <= 0) continue;

            visited[nx][ny] = true;
            queue.push([nx, ny]);
        }
    }
}

const rain = (k, grid) => {
    let cnt = 0;
    const visited = Array.from({length : n}, _ => Array(m).fill(false));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] - k > 0 && !visited[i][j]) {
                visited[i][j] = true;
                bfs([i , j], k, visited);
                cnt++;
            }
        }
    }
    // console.log(visited)
    return cnt;
}

const solution = () => {
    const result = [1, 0];
    
    for (let r = 1; r < max; r++) {
        const tmp = rain(r, grid);

        if (result[1] < tmp) {
            result[0] = r;
            result[1] = tmp;
        }
    }

    console.log(result.join(' '));
}

solution();
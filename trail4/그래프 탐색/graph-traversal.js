const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const edges = [];
for (let i = 1; i <= m; i++) {
    edges.push(input[i].split(' ').map(Number));
}

// Please Write your code here.
const connections = Array.from({length : n + 1}, _ => []);

edges.forEach(([from, to]) => {
    connections[from].push(to);
    connections[to].push(from);
});

const dfs = (now, visited) => {
    for (const next of connections[now]) {
        if (visited[next]) continue;

        visited[next] = true;
        dfs(next, visited);
    }
}

const solution = () => {
    const visited = Array(n + 1).fill(false);
    visited[1] = true;
    dfs(1, visited);
    console.log(visited.filter(v => v).length - 1);
}

solution();
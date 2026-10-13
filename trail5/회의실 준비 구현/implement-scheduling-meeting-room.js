const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = parseInt(input[0]);
const meetings = [];

for (let i = 1; i <= n; i++) {
    const [s, e] = input[i].split(' ').map(Number);
    meetings.push([ s, e ]);
}

// Please Write your code here.
meetings.sort((a, b) => {
    if (a[0] === b[0]) {
        return a[1] - b[1];
    } else return a[0] - b[0];
});

let end = meetings[0][1];
let cnt = 0;

for (let i = 1; i < meetings.length; i++) {
    const [s, e] = meetings[i];

    if (end <= s) {
        end = e;
    } else {
        cnt++;
        end = Math.min(end, e);
    }
}

console.log(n - cnt);
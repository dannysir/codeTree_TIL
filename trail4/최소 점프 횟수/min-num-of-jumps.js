const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const nums = input[1].split(' ').map(Number);

// Please write your code here.

const combination = (now, cnt) => {
    if (now >= n) return cnt;


    let min = Infinity;
    const tmp = nums[now];

    for (let i = tmp; i >= 1; i--) {
        if (now + i >= n - 1) {
            min = Math.min(min, combination(n, cnt + 1));
            continue;
        }
        min = Math.min(min, combination(now + i, cnt + 1));
    }

    return min;
}

const result = combination(0, 0);

console.log(result !== Infinity ? result : -1);
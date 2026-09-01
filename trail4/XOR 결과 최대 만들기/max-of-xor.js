const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const a = input[1].split(' ').map(Number);

// Please Write your code here.
let answer = 0;

const combination = (index, cnt, xor) => {
    if (cnt >= m) {
        answer = Math.max(xor, answer);
        return;
    }

    for (let i = index; i < n; i++) {
        combination(i + 1, cnt + 1, xor === 0 ? a[i] : xor ^ a[i]);
    }
}

combination(0, 0, 0);

console.log(answer);
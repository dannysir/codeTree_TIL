const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const A = input[1].split(' ').map(Number);

// Please Write your code here.
let answer = Infinity;
const total = A.reduce((acc, cur) => acc + cur, 0);

const combination = (index, sum, cnt) => {
    if (cnt === n) {
        answer = Math.min(answer, Math.abs((total - sum) - sum));
        return;
    }

    for (let i = index; i < A.length; i++) {
        combination(i + 1, sum + A[i], cnt + 1);
    }
}

combination(0, 0, 0);

console.log(answer);
const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m, k] = input[0].split(' ').map(Number);
const nums = input[1].split(' ').map(Number);

// Please Write your code here.
const position = Array(k + 1).fill(1);
let answer = -1;

const combination = (index, sum) => {
    answer = Math.max(answer, sum);

    if (index === n) {
        return;
    }

    for (let i = 1; i <= k; i++) {
        const move = nums[index];

        if (position[i] >= m) continue;

        position[i] += move;
        combination(index + 1, position[i] >= m ? sum + 1 : sum);
        position[i] -= move;
    }
}

combination(0, 0);

console.log(answer);
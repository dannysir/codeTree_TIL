const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);

// Please Write your code here.
const combination = (index, arr, result) => {
    if (arr.length === m) {
        result.push(arr);
        return;
    }
    
    for (let i = index; i <= n; i++) {
        combination(i + 1, [...arr, i], result);
    }
}

const cArr = [];
combination(1, [], cArr);

console.log(cArr.map(v => v.join(' ')).join('\n'));
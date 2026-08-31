const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const n = Number(input[0]);
// Please Write your code here.

const combination = (arr, result) => {
    if (arr.length >= n) {
        result.push(arr.join(''));
        return true;
    }

    for (let i = 4; i <= 6; i++) {
        if (check(arr, i) && combination([...arr, i], result)) return true;
    }

    return false;
}

const check = (arr, a) => {
    const m = arr.length; 
    const tArr = [...arr, a];

    for (let i = 1; i <= (m + 1) / 2; i++) {
        const aArr = tArr.slice(-i);
        const bArr = tArr.slice(-i * 2, -i);
        let flag = false;

        for (let j = 0; j < aArr.length; j++) {
            if (aArr[j] !== bArr[j]) {
                flag = true;
                break;
            }
        }

        if (!flag) return false;
    }

    return true;
}

const cArr = [];

combination([], cArr);

console.log(cArr[0]);
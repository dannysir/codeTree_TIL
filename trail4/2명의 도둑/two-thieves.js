const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m, c] = input[0].split(' ').map(Number);
const weights = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));

// Please Write your code here.

const cArr = [];

const combination = (arr, result) => {
    if (arr.length === 2) {
        result.push(arr);
        return;
    }

    let startX = 0;
    let startY = 0;
    if (arr.length > 0) {
        const [lx, ly] = arr[arr.length - 1];
        startX = lx;
        startY = ly + m;
    }

    for (let i = startX; i < n; i++) {
        for (let j = (i === startX ? startY : 0); j <= n - m; j++) {
            combination([...arr, [i, j]], result);
        }
    }
};

const solution = (arr) => {
    const result = [];
    
    for (const [x, y] of arr) {
        result.push(...count(x, y));
    }

    return result.reduce((acc, cur) => acc + cur ** 2, 0);
}

const innerCom = (arr, result) => {
    if (arr.length >= m) {
        result.push(arr);
        return;
    }

    innerCom([...arr, 0], result);
    innerCom([...arr, 1], result);
}

const count = (x, y) => {
    let cnt = 0;
    const result = weights[x].slice(y, y + m);

    if (result.reduce((acc, cur) => acc + cur, 0) > c) {
        const iCArr = [];
        innerCom([], iCArr);
        let max = 0;
        let innerResult;

        for (const arr of iCArr) {
            const tmp = result.reduce((acc, cur, i) => {
                if (arr[i]) {
                    return acc + cur;
                } else return acc;
            }, 0);    

            if (tmp > c) continue;

            if (max < tmp) {
                max = tmp;
                innerResult = result.filter((value, index) => {
                    if (arr[index]) {
                        return true;
                    } else return false;
                });
            }
        }
        return innerResult;
    }

    return result;
}

let answer = 0;

combination([], cArr);

for (const arr of cArr) {
    answer = Math.max(answer, solution(arr));
}

console.log(answer);
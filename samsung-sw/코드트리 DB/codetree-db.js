const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

class Node {
  left = null;
  right = null;
  start = null;
  end = null;
  name = null;
  sum = 0;
  cnt = 0;

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

}

class SegTree {
  root = null;
  nameMap = null;
  valueMap = null;

  constructor() {
    this.init();
  }

  init() {
    this.root = new Node(0, 1_000_000_000);
    this.nameMap = new Map();
    this.valueMap = new Map();
  }

  insert(name, value) {
    if (this.nameMap.has(name) || this.valueMap.has(value)) return 0;

    if (this.root === null) this.init();

    let cur = this.root;

    while (true) {
      cur.cnt++;
      cur.sum += value;

      if (cur.start === cur.end) {
        cur.name = name;
        this.nameMap.set(name, value);
        this.valueMap.set(value, cur);
        return 1;
      }

      const mid = Math.floor((cur.start + cur.end) / 2);

      if (value <= mid) {
        if (cur.left === null) {
          cur.left = new Node(cur.start, mid);
        }

        cur = cur.left;
      } else {
        if (cur.right === null) {
          cur.right = new Node(mid + 1, cur.end);
        }

        cur = cur.right;
      }
    }

    return 1;
  }

  delete(name) {
    if (!this.nameMap.has(name)) return 0;

    if (this.root === null) this.init();

    let cur = this.root;
    let value = this.nameMap.get(name);

    while(true) {
      cur.cnt--;
      cur.sum -= value;

      if (cur.start === cur.end) {
        this.nameMap.delete(name);
        this.valueMap.delete(value);
        return value;
      }

      const mid = Math.floor((cur.start + cur.end) / 2);

      if (value <= mid) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }
  }

  rank(k) {
    if (this.root.cnt < k) return 'None';

    let cur = this.root;

    while (true) {
      if (cur.start === cur.end) return cur.name;

      const leftCnt = cur.left?.cnt ?? 0;

      if (k <= leftCnt) {
        cur = cur.left;
      } else {
        k -= leftCnt;
        cur = cur.right;
      }
      
    }
  }

  sum(k) {
    return this.#calcSum(this.root, k);
  }

  #calcSum(node, k) {
    if (node === null) return 0
    if (node.start > k) return 0;

    if (node.end <= k) return node.sum;

    return this.#calcSum(node.left, k) + this.#calcSum(node.right, k);
  }
}

const solution = () => {
    const N = +input.shift();
    const segTree = new SegTree();
    const result = [];

    for (let i = 0; i < N; i++) {
        const order = input[i].trim().split(/\s+/);

        switch (order[0]) {
            case 'init':
                segTree.init();
                break;

            case 'insert':
                result.push(segTree.insert(order[1], +order[2]));
                break;

            case 'delete':
                result.push(segTree.delete(order[1]));
                break;

            case 'rank':
                result.push(segTree.rank(+order[1]));
                break;

            case 'sum':
                result.push(segTree.sum(+order[1]));
                break;
        }
    }

    console.log(result.join('\n'));
};

solution();

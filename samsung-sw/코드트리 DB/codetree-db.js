const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

class Node {
  left = null;
  right = null;
  name = null;
  cnt = 0;
  value = 0;

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

class SegTree {
  static instance;

  constructor() {
    if (SegTree.instance) {
      return SegTree.instance;
    }

    this.init();
    SegTree.instance = this;
  }

  init() {
    this.root = new Node(1, 1_000_000_000);
    this.nameMap = new Map();
    this.nodeMap = new Map();
  }

  insert(name, value) {
    if (this.nameMap.has(name) || this.nodeMap.has(value)) {
      return 0;
    }

    let node = this.root;

    while (true) {
      node.cnt++;
      node.value += value;

      if (node.start === node.end) {
        node.name = name;
        this.nameMap.set(name, value);
        this.nodeMap.set(value, node);
        return 1;
      }

      const mid = Math.floor((node.start + node.end) / 2);

      if (value <= mid) {
        if (node.left === null) {
          node.left = new Node(node.start, mid);
        }

        node = node.left;
      } else {
        if (node.right === null) {
          node.right = new Node(mid + 1, node.end);
        }

        node = node.right;
      }
    }
  }

  sum(k) {
    return this.#sum(this.root, k);
  }

  #sum(node, k) {
    if (node === null) return 0;

    if (node.start > k) return 0;

    if (node.end <= k) return node.value;

    return this.#sum(node.left, k) + this.#sum(node.right, k);
  }

  rank(k) {
    if (k < 1 || k > this.root.cnt) {
      return "None";
    }

    let node = this.root;

    while (node.start !== node.end) {
      const leftCnt = node.left?.cnt ?? 0;

      if (k <= leftCnt) {
        // k번째 데이터가 왼쪽 구간에 있음
        node = node.left;
      } else {
        // 왼쪽 데이터를 제외하고 오른쪽에서 순위 탐색
        k -= leftCnt;
        node = node.right;
      }
    }

    return node.name;
  }

  delete(name) {
    if (!this.nameMap.has(name)) {
      return 0;
    }

    const value = this.nameMap.get(name);
    let node = this.root;

    while (true) {
      // 삭제 경로의 모든 노드에서 개수와 합 차감
      node.cnt--;
      node.value -= value;

      if (node.start === node.end) {
        node.name = null;
        this.nameMap.delete(name);
        this.nodeMap.delete(value);
        return value;
      }

      const mid = Math.floor((node.start + node.end) / 2);

      if (value <= mid) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
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

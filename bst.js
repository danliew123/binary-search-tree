const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
  setLeft(someFunc) {
    this.left = someFunc;
  }
  setRight(someFunc) {
    this.right = someFunc;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array, 0, array.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    let mid = Math.floor((end + start) / 2);
    let midNode = new Node(array[mid]);

    midNode.setLeft(this.buildTree(array, start, mid - 1));
    midNode.setRight(this.buildTree(array, mid + 1, end));

    return midNode;
  }

  insert(key, node = this.root) {
    if (node === null) {
      return new Node(key);
    }
    if (node.data === key) {
      console.log("same node found!");
      return node;
    }
    if (node.data > key) {
      node.left = this.insert(key, node.left);
    } else {
      node.right = this.insert(key, node.right);
    }
    return node;
  }

  getSuccessor(current = this.root) {
    current = current.right;
    while (current !== null && current.left !== null) {
      current = current.left;
    }
    return current;
  }

  delete(key, node = this.root) {
    if (node === null) {
      return node;
    }
    if (node.data > key) {
      node.left = this.delete(key, node.left);
    } else if (node.data < key) {
      node.right = this.delete(key, node.right);
    } else {
      if (node.left === null) {
        let temp = node.right;
        return temp;
      }
      if (node.right === null) {
        let temp = node.left;
        return temp;
      }
      let succ = this.getSuccessor(node);
      node.data = succ.data;
      node.right = this.delete(succ.data, node.right);
    }
    return node;
  }

  find(key, node = this.root) {
    if (node === null) {
      console.log("This node does not exist");
      return;
    }
    if (node.data === key) {
      console.log(node);
      return node;
    }
    if (node.data > key) {
      let t = this.find(key, node.left);
      return t;
    } else {
      let t = this.find(key, node.right);
      return t;
    }
  }

  levelOrder(callback, node = this.root, queue = []) {
    if (!callback) return;
    if (node === null) {
      return node;
    }
    queue.push(node);
    while (queue.length !== 0) {
      let current = queue[0];
      callback(current.data);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
      queue.shift();
    }
  }

  preOrder(callback, node = this.root) {
    if (!callback) return;
    if (node === null) {
      return node;
    }
    callback(node.data);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  inOrder(callback, node = this.root) {
    if (!callback) return;
    if (node === null) {
      return node;
    }
    this.inOrder(callback, node.left);
    callback(node.data);
    this.inOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback) return;
    if (node === null) {
      return node;
    }
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node.data);
  }

  height(node = this.root) {
    if (typeof node === "number") {
      node = this.find(node);
    }

    if (node === null) {
      return -1;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node = this.root) {
    if (typeof node === "number") {
      node = this.find(node);
    }

    if (!node) {
      return null;
    }

    let rootNode = this.root;
    let counter = 0;
    while (rootNode) {
      if (rootNode === node) {
        return counter;
      } else if (rootNode.data > node.data) {
        rootNode = rootNode.left;
      } else {
        rootNode = rootNode.right;
      }
      counter += 1;
    }
    return;
  }

  isBalanced() {
    let leftHeight = this.height(this.root.left);
    let rightHeight = this.height(this.root.right);
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    } else return true;
  }

  reBalance() {
    let arr = [];
    function adder(value) {
      arr.push(value);
    }
    this.inOrder(adder);
    this.array = arr;
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }
}

function numbersArray() {
  let length = 14 + Math.floor(Math.random() * 10);
  let arr = [];
  for (let i = 0; i < length; i++) {
    let num = Math.floor(Math.random() * 100);
    arr.push(num);
  }
  arr = arr.sort((a, b) => a - b);
  arr = arr.filter((value, index) => arr.indexOf(value) === index);

  return arr;
}

function createTree() {
  let arr = numbersArray();
  let tree = new Tree(arr);
  console.log(tree.isBalanced());
  prettyPrint(tree.root);
  return tree;
}

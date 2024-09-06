class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export default class BST {
    constructor() {
        this.root = null;
    }

    buildTree(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this._balanceTreeBuilder(sortedArray, 0, sortedArray.length - 1);
    }

    insert(value) {
        return this._insertHelper(this.root, value);
    }

    deleteItem(value) {
        return this._deleteItemHelper(this.root, value);
    }

    find(value) {
        return this._findHelper(this.root, value);
    }

    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Parameter is not a callback function!');
        }

        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();

            callback(node, result);

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }

        return result;
    }

    inOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Parameter is not a callback function!');
        }

        const result = [];

        return this._depthFirstOrderHelper('inOrder', this.root, result, callback);
    }

    preOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Parameter is not a callback function!');
        }

        const result = [];

        return this._depthFirstOrderHelper('preOrder', this.root, result, callback);
    }

    postOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Parameter is not a callback function!');
        }

        const result = [];

        return this._depthFirstOrderHelper('postOrder', this.root, result, callback);
    }

    height(node) {
        if (node === null) {
            return 0;
        }

        return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }

    depth(node) {
        let temp = this.root;
        let count = 0;

        while (temp) {
            if (node.data === temp.data) {
                return count;
            } else if (node.data < temp.data) {
                temp = temp.left;
            } else {
                temp = temp.right;
            }

            count++;
        }

        return null;
    }

    isBalanced() {
        if (this.root === null) {
            return null;
        }

        const diff = Math.abs(this.height(this.root.left) - this.height(this.root.right));

        if (diff === 0 || diff === 1) {
            return true;
        }

        return false;
    }

    rebalance() {
        const array = this.inOrder((node, result) => result.push(node.data));
        this.buildTree(array);
    }

    _balanceTreeBuilder(array, start, end) {
        if (start > end) {
            return null;
        }

        const mid = parseInt((start + end) / 2);

        const node = new Node(array[mid]);

        node.left = this._balanceTreeBuilder(array, start, mid - 1);
        node.right = this._balanceTreeBuilder(array, mid + 1, end);

        return node;
    }

    _insertHelper(node, value) {
        if (node === null) {
            return new Node(value);
        }

        if (value < node.data) {
            node.left = this._insertHelper(node.left, value);
        } else {
            node.right = this._insertHelper(node.right, value);
        }

        return node;
    }

    _deleteItemHelper(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.data) {
            node.left = this._deleteItemHelper(node.left, value);
        } else if (value > node.data) {
            node.right = this._deleteItemHelper(node.right, value);
        } else {
            if (!node.left && !node.right) {
                return null;
            } else if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            } else {
                let temp = node.right;
                while (temp.left) {
                    temp = temp.left;
                }
                node.data = temp.data;
                node.right = this._deleteItemHelper(node.right, node.data);
            }
        }

        return node;
    }

    _findHelper(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.data) {
            return this._findHelper(node.left, value);
        } else if (value > node.data) {
            return this._findHelper(node.right, value);
        } else {
            return node;
        }
    }

    _depthFirstOrderHelper(order, node, result, callback) {
        if (node === null) {
            return;
        }

        if (order === 'inOrder') {
            if (node.left) {
                this._depthFirstOrderHelper(order, node.left, result, callback);
            }

            callback(node, result);

            if (node.right) {
                this._depthFirstOrderHelper(order, node.right, result, callback);
            }
        } else if (order === 'preOrder') {
            callback(node, result);

            if (node.left) {
                this._depthFirstOrderHelper(order, node.left, result, callback);
            }

            if (node.right) {
                this._depthFirstOrderHelper(order, node.right, result, callback);
            }
        } else if (order === 'postOrder') {
            if (node.left) {
                this._depthFirstOrderHelper(order, node.left, result, callback);
            }

            if (node.right) {
                this._depthFirstOrderHelper(order, node.right, result, callback);
            }

            callback(node, result);
        } else {
            throw new Error('Invalid order');
        }

        return result;
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }

        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

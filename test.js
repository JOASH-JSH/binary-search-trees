import BST from './binary_search_trees.js';

function getRandomNumbers(minRange, maxRange, total) {
    const array = [];

    for (let i = 0; i < total; i++) {
        const num = Math.floor(Math.random() * (maxRange - minRange + 1));
        array.push(num + minRange) ;
    }

    return array;
}

(function test() {
    const array = getRandomNumbers(0, 100, 15); 

    const tree = new BST();

    tree.buildTree(array);

    tree.prettyPrint();
    
    console.log('isBalanced:', tree.isBalanced());
    console.log('levelOrder:', tree.levelOrder((node, result) => (result.push(node.data))));
    console.log('preOrder:', tree.preOrder((node, result) => (result.push(node.data))));
    console.log('postOrder:', tree.postOrder((node, result) => (result.push(node.data))));
    console.log('inOrder:', tree.inOrder((node, result) => (result.push(node.data))));
    console.log('\n');
    
    const moreRandomNumber = getRandomNumbers(101, 200, 5);
    moreRandomNumber.forEach((num) => (tree.insert(num)));
    
    tree.prettyPrint();

    console.log('isBalanced:', tree.isBalanced());
    
    console.log('reBalanced');
    tree.rebalance();
    tree.prettyPrint();

    console.log('isBalanced:', tree.isBalanced());
    console.log('levelOrder:', tree.levelOrder((node, result) => (result.push(node.data))));
    console.log('preOrder:', tree.preOrder((node, result) => (result.push(node.data))));
    console.log('postOrder:', tree.postOrder((node, result) => (result.push(node.data))));
    console.log('inOrder:', tree.inOrder((node, result) => (result.push(node.data))));
    console.log('\n');
})();
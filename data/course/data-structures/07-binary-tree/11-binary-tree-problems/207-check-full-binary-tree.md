---
title: 'Check Full Binary Tree'
type: 'problem'
topic: 'Binary Tree Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
A **full binary tree** is defined as a binary tree in which all nodes have either zero or two child nodes. Conversely, there is no node in a full binary tree, which has one child node.

---
##### Method 1: Recursive
1. If a binary tree node is NULL then it is a full binary tree.
2. If a binary tree node does have empty left and right sub-trees, then it is a full binary tree by definition.
3. If a binary tree node has left and right sub-trees, then it is a part of a full binary tree by definition. In this case recursively check if the left and right sub-trees are also binary trees themselves.
4. In all other combinations of right and left sub-trees, the binary tree is not a full binary tree.

##### Method 2: Iterative
Perform iterative level order traversal of the tree using queue. For each node encountered, follow the steps given below:
1. If (node->left == NULL && node->right == NULL), it is a leaf node. Discard it and start processing the next node from the queue.
2. If (node->left == NULL || node->right == NULL), then it means that only child of node is present. Return false as the binary tree is not a full binary tree.
3. Else, push the left and right child’s of the node on to the queue.


> Time Complexity: O(n)



---

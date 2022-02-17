---
title: 'Check Complete Binary Tree'
type: 'problem'
topic: 'Binary Tree Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
A **complete binary tree** is a binary tree in which every level, except possibly the last, is completely filled, and all nodes are as far left as possible.

---
##### Method 1:
1. If a binary tree node is NULL then it is a full binary tree.
2. If a binary tree node does have empty left and right sub-trees, then it is a full binary tree by definition.
3. If a binary tree node has left and right sub-trees, then it is a part of a full binary tree by definition. In this case recursively check if the left and right sub-trees are also binary trees themselves.
4. In all other combinations of right and left sub-trees, the binary tree is not a full binary tree.

> Time Complexity: O(n)



---

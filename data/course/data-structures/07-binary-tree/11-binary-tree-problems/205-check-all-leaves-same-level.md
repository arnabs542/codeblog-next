---
title: 'Check if all Leaves are at Same Level'
type: 'problem'
topic: 'Binary Tree Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
Given the binary Tree and the two nodes say ‘a’ and ‘b’, determine whether the two nodes are cousins of each other or not.
Two nodes are cousins of each other if they are at same level and have different parents.

---
##### Method 1: Recursive
The idea is to first find level of the leftmost leaf and store it in a variable leafLevel. Then compare level of all other leaves with leafLevel, if same, return true, else return false. We traverse the given Binary Tree in Preorder fashion. An argument leaflevel is passed to all calls. The value of leafLevel is initialized as 0 to indicate that the first leaf is not yet seen yet. The value is updated when we find first leaf. Level of subsequent leaves (in preorder) is compared with leafLevel.

##### Method 1: Iterative
The idea is to iteratively traverse the tree, and when you encounter the first leaf node, store it’s level in result variable, now whenever you encounter any leaf node, compare it’s level with previously stored result, it they are same then proceed for rest of the tree, else return false.


---

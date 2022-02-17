---
title: 'Check Perfect Binary Tree'
type: 'problem'
topic: 'Binary Tree Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
A Binary tree is **Perfect Binary Tree** in which all internal nodes have two children and all leaves are at same level.

---
##### Method 1: Using Height
1. Find depth of any node (in below tree we find depth of leftmost node). Let this depth be d.
2. Now recursively traverse the tree and check for following two conditions.
    - Every internal node should have both children non-empty
    - All leaves are at depth ‘d’

> Time Complexity: O(n)



---

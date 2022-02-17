---
title: 'Check if binary tree contains duplicate subtrees of size 2 or more'
type: 'problem'
topic: 'Binary Tree Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
Given a Binary Tree, check whether the Binary tree contains a duplicate sub-tree of size 2 or more.
Note : Two same leaf nodes are not considered as subtree size of a leaf node is one.

---
##### Method 1: Simple
A simple solution is that, we pick every node of tree and try to find is any sub-tree of given tree is present in tree which is identical with that sub-tree.

##### Method 2: Efficient
- An Efficient solution based on tree serialization and hashing.
- The idea is to serialize subtrees as strings and store the strings in hash table.
- Once we find a serialized tree (which is not a leaf) already existing in hash-table, we return true.

> Time Complexity: O(n)



---

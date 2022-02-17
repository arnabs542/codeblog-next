---
title: 'Check Duplicate Values'
type: 'problem'
topic: 'Binary Tree Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
Check if a Binary Tree (not BST) has duplicate values

---
##### Method 1: Using HashSet
- A simple solution is to store inorder traversal of given binary tree in an array. Then check if array has duplicates or not. We can avoid the use of array and solve the problem in O(n) time. The idea is to use hashing. We traverse the given tree, for every node, we check if it already exists in hash table. If exists, we return true (found duplicate). If it does not exist, we insert into hash table.

> Time Complexity: O(n)



---

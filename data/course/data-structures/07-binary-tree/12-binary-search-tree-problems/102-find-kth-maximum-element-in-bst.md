---
title: 'Find Kth Maximum Element in BST'
type: 'problem'
topic: 'Binary Search Tree Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
Find kth Maximum Value in a Binary Search Tree

---
##### Method 1: Sorting the tree in order
To find the kth max value, we first perform an In-Order Traversal on the tree to get a sorted array in ascending order. Once, we have the sorted array, we can easily find the kth max. value by accessing the index [length - k].

> Time Complexity: O(h)

##### Method 1: Recursive Approach

> Time Complexity: O(h) or O(n) if it is left skewed


---
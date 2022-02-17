---
title: 'Check Height Balanced Binary Tree'
type: 'problem'
topic: 'Binary Tree Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
In a **Red-Black Tree**, the maximum height of a node is at most twice the minimum height.
Given a Binary Search Tree, we need to check for following property.
_For every node, length of the longest leaf to node path has not more than twice the nodes on shortest path from node to leaf._

---
##### Method 1:
1. For every node, we need to get the maximum and minimum heights and compare them.
2. The idea is to traverse the tree and for every node check if it’s balanced.
3. We need to write a recursive function that returns three things, a boolean value to indicate the tree is balanced or not, minimum height and maximum height.
4. To return multiple values, we can either use a structure or pass variables by reference.
5. We have passed maxh and minh by reference so that the values can be used in parent calls.

> Time Complexity: O(n)


---

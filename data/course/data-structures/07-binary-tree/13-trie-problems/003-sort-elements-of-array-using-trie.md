---
title: 'Sort Elements of Array using Trie'
type: 'problem'
topic: 'Trie Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
Sort Elements of Array using Trie

---
##### Method 1: 
This exercise is very similar to Challenge 2, except the fact that you have to create the trie yourself.

Since the children array for each node stores alphabets in alphabetical order, the tree itself is ordered from top to bottom. All we need to do is make a pre-order traversal (think of a as the left most child and z as the right most child) and store the words in a list just like we did in the previous challenge.

> Time Complexity: O(n)



---
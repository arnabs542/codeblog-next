---
title: 'Total Number of Words in a Trie'
type: 'problem'
topic: 'Trie Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
Total Number of Words in a Trie

---
##### Method 1:
It’s a pretty straightforward algorithm. Starting from the root, we visit each branch recursively. Whenever a node is found with its isEndWord set to true, the result variable is incremented by 1.

> Time Complexity: O(n)



---
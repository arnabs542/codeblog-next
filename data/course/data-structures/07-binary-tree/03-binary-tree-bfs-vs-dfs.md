---
title: 'Binary Tree BFS vs DFS'
type: 'topic'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- js
- array
---
#### What are BFS and DFS for Binary Tree?
A Tree is typically traversed in two ways:
1. **Breadth First Traversal**
    - Level Order Traversal
2. **Depth First Traversals**
    - Inorder Traversal (Left-Root-Right)
    - Preorder Traversal (Root-Left-Right)
    - Postorder Traversal (Left-Right-Root)

##### Time Complexity
- All four traversals require O(n) time as they visit every node exactly once.

##### Space Complexity
- Extra Space required for **Breadth First Traversal** is `O(w)` where w is maximum width of Binary Tree. In Breadth First Traversal, queue one by one stores nodes of different level.
- Extra Space required for **Depth First Traversals** is `O(h)` where h is maximum height of Binary Tree. In Depth First Traversals, stack (or function call stack) stores all ancestors of a node.
- **Note**
  - Maximum Width of a Binary Tree at depth (or height) h can be 2h where h starts from 0. So the maximum number of nodes can be at the last level. And worst case occurs when Binary Tree is a perfect Binary Tree with numbers of nodes like 1, 3, 7, 15, …etc. In worst case, value of 2h is Ceil(n/2).
  - Height for a Balanced Binary Tree is O(Log n). Worst case occurs for skewed tree and worst case height becomes O(n).

> Extra space required for Level order traversal is likely to be more when tree is more balanced and extra space for Depth First Traversal is likely to be more when tree is less balanced.

##### How to Pick One?
1. Extra Space can be one factor (Explained above)
2. Depth First Traversals are typically recursive and recursive code requires function call overheads.
3. The most important points is, BFS starts visiting nodes from root while DFS starts visiting nodes from leaves. So if our problem is to search something that is more likely to closer to root, we would prefer BFS. And if the target node is close to a leaf, we would prefer DFS.


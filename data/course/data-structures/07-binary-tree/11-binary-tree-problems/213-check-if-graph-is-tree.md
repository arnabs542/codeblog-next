---
title: 'Check if graph is tree'
type: 'problem'
topic: 'Binary Tree Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
Write a function that returns true if a given undirected graph is tree and false otherwise. For example, the following graph is a tree.
An undirected graph is tree if it has following properties.
1. There is no cycle.
2. The graph is connected.

---
##### Method 1:
**How to detect cycle in an undirected graph?**
- We can either use BFS or DFS. For every visited vertex ‘v’, if there is an adjacent ‘u’ such that u is already visited and u is not parent of v, then there is a cycle in graph. If we don’t find such an adjacent for any vertex, we say that there is no cycle

**How to check for connectivity?**
- Since the graph is undirected, we can start BFS or DFS from any vertex and check if all vertices are reachable or not. If all vertices are reachable, then graph is connected, otherwise not.

> Time Complexity: O(n)



---

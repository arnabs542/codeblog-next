---
title: 'Detect Cycle in Undirected Graph'
type: 'problem'
topic: 'Graph Problems'
section: '08 Graph'
course: 'Graph'
tags:
- binary tree
- tree
---
#### Problem
Given a undirected graph, check whether the graph contains a cycle or not. 

##### Method 1: 
- we can use DFS to detect cycle in an undirected graph in O(V+E) time. We do a DFS traversal of the given graph.
- For every visited vertex ‘v’, if there is an adjacent ‘u’ such that u is already visited and u is not parent of v, then there is a cycle in graph.
- The assumption of this approach is that there are no parallel edges between any two vertices.

> Time Complexity: O(V + E), Space Complexity: O(V)


---
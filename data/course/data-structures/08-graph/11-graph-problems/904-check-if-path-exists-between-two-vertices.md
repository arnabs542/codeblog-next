---
title: 'Check if Path Exists Between Two Vertices'
type: 'problem'
topic: 'Graph Problems'
section: '08 Graph'
course: 'Graph'
tags:
- binary tree
- tree
---
#### Problem
Given a graph and two vertices, can you write a code to check if a path exists between the two given vertices?

##### Method 1: 
This problem can be solved by both DFS and BFS. All we need is a simple traversal from source to see if we can reach destination. If the destination value is found, we return True.

> Time Complexity: O(V + E)


---
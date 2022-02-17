---
title: 'Detect Cycle in Graph'
type: 'problem'
topic: 'Graph Problems'
section: '08 Graph'
course: 'Graph'
tags:
- binary tree
- tree
---
#### Problem
Implement the detectCycle() method to take a graph as input and detect a cycle in it. A cycle is formed when a few vertices are connected in such a way that they make a loop.

##### Method 1: 
- Two boolean arrays, `visited` and `stackFlag`. `visited` keeps a record of all the nodes that have been traversed regardless of the recursive call. `stackFlag` keeps track of the nodes that have been traversed in the current recursion.
- Then we apply a variation of `DFS` on each node of the graph in a recursive manner. On each call of the method `cyclic` if we encounter any node which is already in the stack, then we return true. Because this means that we have found a path from that node back to itself!


> Time Complexity: O(V + E), Space Complexity: O(V)


---
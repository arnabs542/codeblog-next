---
title: 'Find Mother Vertex in Graph'
type: 'problem'
topic: 'Graph Problems'
section: '08 Graph'
course: 'Graph'
tags:
- binary tree
- tree
---
#### Problem
A mother vertex in a graph `G = (v,e)` is a vertex v, such that all other vertices in G can be reached by a path from v. Implement a method to take a graph as an input and find out which vertex is the mother vertex in the graph. Remember, _there’s no mother vertex in a disconnected graph_.

##### Method 1: 
This solution is based on **Kosaraju’s Strongly Connected Component Algorithm**. Initially, we run the DFS on the whole graph in a loop. The DFS ensures that all the nodes in the graph are visited. If the graph is disconnected, the visited array will still have some vertices which haven’t been set to true.

The theory is that the last vertex visited in the recursive DFS will be the mother vertex. This is because, at the last vertex, all slots in visited would be true (DFS only stops when all nodes are visited). Hence, we keep track of this last vertex using lastV.

Then, we reset the visited array and run the DFS only on lastV. If it visits all nodes, it is a mother vertex. Otherwise, a mother vertex does not exist. The only limitation in this algorithm is that it can detect one mother vertex, even if others exist.


> Time Complexity: O(V + E), Space Complexity: O(V)


---
---
title: 'Find Shortest Path between Two Vertices'
type: 'problem'
topic: 'Graph Problems'
section: '08 Graph'
course: 'Graph'
tags:
- binary tree
- tree
---
#### Problem
Given an Undirected graph, find the shortest path between two vertices.

##### Method 1: Using Cycle Detection
Once again, Breadth First Search comes to the rescue. The visited list must be familiar to you by now. The crux of this algorithm, however, lies in the distance list. For each node, the indexed value in the distance shows the node’s distance from the source in terms of the number of edges.

The rest is a simple BFS traversal, where the distance is incremented by 1 each time.

We are guaranteed to find the shortest distance to destination, once it has already been visited through the longer path and consequently marked because it won’t be visited the same way again.

> Time Complexity: O(V + E)



---
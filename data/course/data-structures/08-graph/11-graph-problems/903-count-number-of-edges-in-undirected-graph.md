---
title: 'Count Number of Edges in Undirected Graph'
type: 'problem'
topic: 'Graph Problems'
section: '08 Graph'
course: 'Graph'
tags:
- binary tree
- tree
---
#### Problem
Given a graph, can you write a code to find the number of edges in a graph?

##### Method 1: 
We simply traverse through the complete adjacency list and count the size of each linked list. In an undirected graph, the number of edges is always even because the edges are bidirectional. Hence, to get the number of unique edges, we halve the total sum.

> Time Complexity: O(V + E)


---
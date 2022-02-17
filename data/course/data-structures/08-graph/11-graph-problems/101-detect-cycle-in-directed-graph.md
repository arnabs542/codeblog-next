---
title: 'Detect Cycle in Directed Graph'
type: 'problem'
topic: 'Graph Problems'
section: '08 Graph'
course: 'Graph'
tags:
- binary tree
- tree
---
#### Problem
Given a directed graph, check whether the graph contains a cycle or not. 

##### Method 1: 
Depth First Traversal can be used to detect a cycle in a Graph. DFS for a connected graph produces a tree.
There is a cycle in a graph only if there is a back edge present in the graph.
A back edge is an edge that is from a node to itself (self-loop) or one of its ancestor in the tree produced by DFS.

> Time Complexity: O(V + E), Space Complexity: O(V)

##### Method 2:
The idea is to do DFS of a given graph and while doing traversal, assign one of the below three colours to every vertex.
- **WHITE** : Vertex is not processed yet. Initially, all vertices are WHITE.
- **GRAY**: Vertex is being processed (DFS for this vertex has started, but not finished which means that all descendants (in DFS tree) of this vertex are not processed yet (or this vertex is in the function call stack)
- **BLACK** : Vertex and all its descendants are processed. While doing DFS, if an edge is encountered from current vertex to a GRAY vertex, then this edge is back edge and hence there is a cycle.

> Time Complexity: O(V + E), Space Complexity: O(V)




---
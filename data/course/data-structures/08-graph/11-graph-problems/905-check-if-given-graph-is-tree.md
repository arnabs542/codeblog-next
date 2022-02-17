---
title: 'Check if given Graph is Tree'
type: 'problem'
topic: 'Graph Problems'
section: '08 Graph'
course: 'Graph'
tags:
- binary tree
- tree
---
#### Problem
Given a directed graph, can you write a code to check if it is a tree or not?

##### Method 1: Using Cycle Detection
To check whether a directed graph is a tree or not, we’ll check the following:
- Each node (except root) has exactly one parent
- There is no cycle in the graph.
- The graph is connected.

We check the first condition in `checkOneParent` method by traversing the adjacency list of the graph. If the first condition is not satisfied, we return false and don’t check further.

For a directed graph, We can use DFS to detect the next two conditions.

To check for cycles, we use the same `detectCycle`. If we come across any vertex that has already been visited then there is a cycle. If we do not find such an adjacent for any vertex, we say that there is no cycle.

Then we check for connectivity in the `checkConnected` method and traverse all the vertices on the graph to check if they have been visited from the source. If we find any vertex that is not visited, we conclude that vertex is not reachable from the source. Therefore, the graph is not connected and hence, is not a tree.

> Time Complexity: O(V + E)

##### Method 2: Using BFS Traversal
We have used BFS traversal in this solution but, note that it can also be performed using DFS traversal. We have used the root node, i.e, 0 vertice, as the source node for the traversal. We maintain a count of the visited nodes in the variable numberOfVisited. During traversal, if an already visited vertex is encountered, we return false as it means that the graph fails the tree conditions. In fact, this condition also encompasses the check cyclic condition and check one parent condition from the solution given above. Hence, it removes redundancy. Finally, when the BFS loop ends, we check the numberOfVisited variable to see if all vertices were visited. This condition takes care of the graph is connected check that we performed previously. If the condition fails, false is returned. Otherwise, the function isTree returns true.

> Time Complexity: O(V + E)



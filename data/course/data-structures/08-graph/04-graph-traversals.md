---
title: 'Graph Traversals'
type: 'topic'
section: 'Graph'
course: 'Data Structures'
tags:
- js
- array
---
## Types of Graph Traversals
There are two basic techniques used for graph traversal:
1. Depth First Search (DFS)
2. Breadth First Search (BFS)

**Any traversal needs a starting point, but a graph does not have a linear structure like lists or stacks. So how do we give the graph traversal a better sense of direction?**

Take any vertex as the starting point. This is the lowest level in your search. The next level consists of all the vertices adjacent to your vertex. Therefore, a level higher would consist of the vertices adjacent to these nodes.

---
## DFS
- Starting from any node, we keep moving to an adjacent node until we reach the farthest level. Then we move back to the starting point and pick another adjacent node. Once again, we probe till the farthest level and move back. This process continues until all nodes are visited.
- It is similar to _preorder_ traversal of tree. Like _preorder_, it also uses stack internally.
- The only difference is, unlike trees, graphs may contain cycles, a node may be visited twice. To avoid processing a node more than once, use a boolean visited array.

##### Algorithm
- Initially all vertices are marked unvisited(false).
- We start at a vertex `u` in graph. It considers all edges from `u` to other vertices.
- It the edge leads to an already visited vertex, then backtrack to current vertex `u`.
- It the edge leads to an unvisited vertex, then go to that vertex and start processing from that vertex. So, new vertex becomes current vertex.
- Follow this until we reach dead-end. At this point, start backtracking.
- The process terminates when backtracking leads back to the start vertex.
- Final generated tree is called **DFS tree**.

#### Code


##### Applications of DFS
1. Topological sorting
2. Detecting cycle in a graph
3. Finding articulation points (cut vertices) of a graph
4. Finding strongly connected components
5. Solving problems such as mazes

---
## BFS
- In BFS, all the nodes at a certain level are traversed before moving on to the next level.
- It is similar to _level-order_ traversal of tree. Like _level-order_, it also uses queues internally.

##### Algorithm
- Initially all vertices are marked unvisited(false).
- Vertices that are processed are removed from the queue and marked visited.
- We use a queue to represent the visited set as it will keep the vertices in order of when they were first visited.

#### Code

##### Applications of BFS
1. Shortest Path and Minimum Spanning Tree for unweighted graph
2. Finding all nodes within one connected components
3. Crawlers in Search Engines
4. Social Networking Websites
5. GPS Navigation systems
6. In Garbage Collection
7. Ford–Fulkerson algorithm 

---
#### Comparing DFS and BFS
1. DFS has much lower memory requirements than BFS, as it's not required to store all child nodes at each level.

#### Time Complexity

|Traversal Algorithm|Adjacency List|Adjacency Matrix|
|-|-|-|
|**BFS** |O(V + E) |O(V<sup>2</sup>) |
|**DFS** |O(V + E) |O(V<sup>2</sup>) |

---
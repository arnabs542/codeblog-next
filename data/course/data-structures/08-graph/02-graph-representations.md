---
title: 'Graph Representations'
type: 'topic'
section: 'Graph'
course: 'Data Structures'
tags:
- js
- array
---
## Graph representaions
1. Adjacency Matrix
2. Adjacency List
3. Adjacency Set

---
## Adjacency Matrix
- We use a two-dimensional boolean matrix of size V x V. The row and column headings represent the vertices.
- The value adj[u][v] is set if there is an edge from vertex u to vertex v and 0 otherwise.
- Adjacency Matrix representation is good if the graphs are dense.

|   | A  | B  | C  | D  |
|---|---|---|---|---|
| A  |0   |1   |0   |1   |
| B  |1   |0   |1   |0   |
| C  |0   |0   |0   |1   |
| D  |1   |0   |0   |0   |

#### Pros
1. Representation is easier to implement and follow.
2. Removing an edge takes O(1) time.
3. Queries like whether there is an edge from vertex ‘u’ to vertex ‘v’ are efficient and can be done O(1).

#### Cons
1. Consumes more space O(V^2). Even if the graph is sparse(contains less number of edges), it consumes the same space.
2. Adding a vertex is O(V^2) time.

#### Operations

|   |   |   |
|---|---|---|
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |

---
## Adjacency List
- This can be implemented using an array Linked Lists.
- Size of the array is equal to the number of vertices.
- Each index in this array represents a specific vertex in the graph.
- For each vertex `v`, we use a linked list and list nodes represents the connections between `v` and other vertices to which `v` has an edge.
- Same graph can be represented in many different ways in an adjacency list.

#### Pros
1. Saves space O(|V|+|E|)
2. Adding a vertex is easier.

#### Cons
1. Queries like whether there is an edge from vertex u to vertex v are not efficient and can be done O(V).


---
## Adjacency Set
- It is similar to Adjacency List, but instead of Linked lists, **Disjoint Sets [Union-Find]** are used.
- A set is different from a List in two ways: it stores elements in a sorted way, and duplicate elements are not allowed.
- This approach cannot be used for graphs containing parallel edges.
- Since sets are internally implemented as binary search trees, an edge between two vertices can be searched in O(logV) time, where V is the number of vertices in the graph.

#### Pros:
1. Queries like whether there is an edge from vertex u to vertex v can be done in O(1).
2. Adding an edge takes O(1).

#### Cons:
1. Graphs containing parallel edge(s) cannot be implemented through this method.
2. Edges are not stored in any order.

---
## Comparison
- If your model frequently manipulates vertices, the adjacency list is a better choice.
- If you are dealing primarily with edges, the adjacency matrix is the more efficient approach.

#### Operations

|Operation   |Adjacency List   |Adjacency Matrix   |
|---|---|---|
|Add Vertex   |O(1)   |O(V<sup>2</sup>)   |
|Remove Vertex   |O(V+E)   |O(V<sup>2</sup>)   |
|Add Edge   |O(1)   |O(1)   |
|Remove Edge   |O(E)   |O(1)   |

---
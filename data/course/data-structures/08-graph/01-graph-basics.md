---
title: 'Graph Basics'
type: 'topic'
section: 'Graph'
course: 'Data Structures'
tags:
- js
- array
---
## Graph
- A graph is a set of vertices (nodes) that are connected to each other via edges in the form of a network.
- It is represented as a pair`(V, E)` where `V` is a set of nodes, called **vertices** and `E` is a collection of pairs of vertices, called **edges**.

#### Vertex
- The structures for storing data in a graph, represented in the form of Nodes (1,3,7…), are also called Vertices

#### Edge
- A pair(x,y) is called an edge, which indicates that vertex x is connected to vertex y.
- An edge may contain weight/cost, showing how much cost is required to traverse from vertex x to y.
- Types of edges:
  1. **Directed edge**: ordered pair of vertices(u,v), where u is origin and v is destination
  2. **Undirected edge**: unordered pair of vertices(u,v)

---
## Types of Graphs
**Directed graph**
- In an undirected graph, the edges are bi-directional by default.
- With the **pair (0,1)**, it means there exists an edge between vertex 0 and 1 without any specific direction. You can go from vertex 0 to 1, or vice versa.

**Directed graph**
- In a directed graph, the edges are unidirectional.
- With the **pair (0,1)**, it means there exists an edge from vertex 0 towards vertex 1, and the only way to traverse is to go from 0 to 1.

---
## Graph Terminologies
#### Degree of Vertex
- Total Number of edges connected to a vertex.
- There are two types of degrees:
  1. **In-Degree of Vertex:** Total Number of incoming edges connected to a vertex.
  2. **Out-Degree of Vertex:** Total Number of outgoing edges connected to a vertex.

#### Parallel Edges
- Two edges are `parallel` if they connect same pair of vertices.

#### Self Loop
- an edge that connects a vertex to itself, e.g., **pair (x,x)**.

#### Bipartite Graph
- A `bipartite graph` is a graph, in which the vertices can be divided into two disjoint sets U and V such that no vertex of U is adjacent to any other vertex in U and no vertex of V is adjacent to any other vertex in V.
- All the cycle graphs, i.e graphs that consist of a single cycle, or some number of vertices (at least 3) connected in a closed chain, are bipartite.
- **Can a Cycle Graph be Bi-Partite with Even Vertices?**
  - Yes
- Types of bipartite graphs:
  1. **Complete Bipartite Graphs:** A complete Bipartite graph connects each vertex from set V1 to each vertex from set V2.
  2. **Star Graphs:** A star graph is a complete bipartite graph if a single vertex belongs to one set, and all the remaining vertices belong to the other set.
  3. **Acyclic Graphs:** A graph with no cycles is called an acyclic graph.

---
- A graph with no cycles is called a `tree`. A tree is a acyclic connected graph.
- A `subgraph` is a subset of a graph edges(with associated vertices) that forms a graph.
- A `path` in a graph is a sequence of adjacent vertices.
- A `cycle` is a path with first and last vertices same.
- A graph is `connected` if there is a path from every vertex to every other vertex.
- A `directed acyclic graph (DAG)` is a directed graph with no cycles.
- A `forest` is a disjoint set of trees.
- A `spanning tree` of a connected graph is a subgraph that contains all of that graphs vertices and is a single tree.
- In `weighted graphs`, integers (weights) are assigned to each edge to represent distance or cost.
- A graph with all edges present is called `complete graph`.
- `sparse graph`
- `dense garph`
- Directed weighted graphs are called `network`.
- Number of edges E can range from `0 to V(V - 1)/2` in undirected graph, where V is number of vertices.

---
## Applications of Graphs
- GPS navigation system
- shortest path finding
- peer to peer networks
- crawlers in the search engine
- garbage collection (java)
- social networking websites

---
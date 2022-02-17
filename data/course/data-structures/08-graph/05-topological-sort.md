---
title: 'Topological Sort'
type: 'topic'
section: 'Graph'
course: 'Data Structures'
tags:
- js
- array
---
#### Topological Sort
- Topological Sort is an ordering of vertices in a **directed acyclic graph [DAG]**, in which each node comes before all nodes to which it has outgoing edges.
- Every DAG may have one or more topological orderings.
- Topological sort is not possible if graph has a cycle.
- All pairs of consecutive vertices in the sorted order are connected by edges then these edges form a directed Hamiltonian path.
- If a Hamiltonian path exists, the topological sort order is unique.
- If a topological sort does not form a Hamiltonian path, DAG can have 2 or more topological orderings.

##### Applications of Topological Sort
1. Representing course prerequisites
2. Detecting deadlocks
3. Pipeline of computing jobs
4. Checking for symbolic link loop
5. Evaluating formulae in spreadsheet

---
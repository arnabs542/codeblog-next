---
title: 'Greedy Algorithm'
type: 'topic'
section: 'Greedy Algorithm'
course: 'Algorithms'
tags:
- java
---
#### Greedy Algorithm
- Greedy is an algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit.
- Greedy algorithms are used for optimization problems.
- An optimization problem can be solved using Greedy if the problem has the following property:
  - _**At every step, we can make a choice that looks best at the moment, and we get the optimal solution of the complete problem.**_

- If a Greedy Algorithm can solve a problem, then it generally becomes the best method to solve that problem as the Greedy algorithms are in general more efficient than other techniques like Dynamic Programming.
- But Greedy algorithms cannot always be applied. For example, Fractional **Knapsack problem** can be solved using Greedy, but **0-1 Knapsack** cannot be solved using Greedy.

**Note:**
- The greedy algorithms are sometimes also used to get an approximation for Hard optimization problems. For example, Traveling Salesman Problem is a NP-Hard problem. A Greedy choice for this problem is to pick the nearest unvisited city from the current city at every step. This solutions don’t always produce the best optimal solution but can be used to get an approximately optimal solution.

##### Standard Greedy algorithms
1. Kruskal’s Minimum Spanning Tree (MST)
2. Prim’s Minimum Spanning Tree
3. Dijkstra’s Shortest Path
4. Huffman Coding

---
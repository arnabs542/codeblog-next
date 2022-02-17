---
title: Minimum Height Trees
type: topic
section: Topological Sort
course: Grokking the Coding Interview
tags:
---
#### Problem
We are given an undirected graph that has characteristics of a k-ary tree. In such a graph, we can choose any node as the root to make a k-ary tree. The root (or the tree) with the minimum height will be called Minimum Height Tree (MHT). There can be multiple MHTs for a graph. In this problem, we need to find all those roots which give us MHTs. Write a method to find all MHTs of the given graph and return a list of their roots.
```yml
Input: vertices: 5, Edges: [[0, 1], [1, 2], [1, 3], [2, 4]]
Output:[1, 2]
Explanation: Choosing '1' or '2' as roots give us MHTs. In the below diagram, we can see that the 
height of the trees with roots '1' or '2' is three which is minimum.
```

#### Method: Topological Sort
From the above-mentioned examples, we can clearly see that any leaf node (i.e., node with only one edge) can never give us an MHT because its adjacent non-leaf nodes will always give an MHT with a smaller height. All the adjacent non-leaf nodes will consider the leaf node as a subtree. Let’s understand this with another example. Suppose we have a tree with root ‘M’ and height ‘5’. Now, if we take another node, say ‘P’, and make the ‘M’ tree as its subtree, then the height of the overall tree with root ‘P’ will be ‘6’ (=5+1). Now, this whole tree can be considered a graph, where ‘P’ is a leaf as it has only one edge (connection with ‘M’). This clearly shows that the leaf node (‘P’) gives us a tree of height ‘6’ whereas its adjacent non-leaf node (‘M’) gives us a tree with smaller height ‘5’ - since ‘P’ will be a child of ‘M’.

This gives us a strategy to find MHTs. Since leaves can’t give us MHT, we can remove them from the graph and remove their edges too. Once we remove the leaves, we will have new leaves. Since these new leaves can’t give us MHT, we will repeat the process and remove them from the graph too. We will prune the leaves until we are left with one or two nodes which will be our answer and the roots for MHTs.

We can implement the above process using the topological sort. Any node with only one edge (i.e., a leaf) can be our source and, in a stepwise fashion, we can remove all sources from the graph to find new sources. We will repeat this process until we are left with one or two nodes in the graph, which will be our answer.
```java
import java.util.*;

class MinimumHeightTrees {
  public static List<Integer> findTrees(int nodes, int[][] edges) {
    List<Integer> minHeightTrees = new ArrayList<>();
    if (nodes <= 0)
      return minHeightTrees;

    // with only one node, since its in-degree will be 0, therefore, we need to handle it separately
    if (nodes == 1) {
      minHeightTrees.add(0);
      return minHeightTrees;
    }

    // a. Initialize the graph
    HashMap<Integer, Integer> inDegree = new HashMap<>(); // count of incoming edges for every vertex
    HashMap<Integer, List<Integer>> graph = new HashMap<>(); // adjacency list graph
    for (int i = 0; i < nodes; i++) {
      inDegree.put(i, 0);
      graph.put(i, new ArrayList<Integer>());
    }

    // b. Build the graph
    for (int i = 0; i < edges.length; i++) {
      int n1 = edges[i][0], n2 = edges[i][1];
      // since this is an undirected graph, therefore, add a link for both the nodes
      graph.get(n1).add(n2);
      graph.get(n2).add(n1);
      // increment the in-degrees of both the nodes
      inDegree.put(n1, inDegree.get(n1) + 1);
      inDegree.put(n2, inDegree.get(n2) + 1);
    }

    // c. Find all leaves i.e., all nodes with only 1 in-degree
    Queue<Integer> leaves = new LinkedList<>();
    for (Map.Entry<Integer, Integer> entry : inDegree.entrySet()) {
      if (entry.getValue() == 1)
        leaves.add(entry.getKey());
    }

    // d. Remove leaves level by level and subtract each leave's children's in-degrees.
    // Repeat this until we are left with 1 or 2 nodes, which will be our answer.
    // Any node that has already been a leaf cannot be the root of a minimum height tree, because 
    // its adjacent non-leaf node will always be a better candidate.
    int totalNodes = nodes;
    while (totalNodes > 2) {
      int leavesSize = leaves.size();
      totalNodes -= leavesSize;
      for (int i = 0; i < leavesSize; i++) {
        int vertex = leaves.poll();
        List<Integer> children = graph.get(vertex);
        for (int child : children) {
          inDegree.put(child, inDegree.get(child) - 1);
          if (inDegree.get(child) == 1) // if the child has become a leaf
            leaves.add(child);
        }
      }
    }

    minHeightTrees.addAll(leaves);
    return minHeightTrees;
  }

  public static void main(String[] args) {
    List<Integer> result = MinimumHeightTrees.findTrees(5,
        new int[][] { new int[] { 0, 1 }, new int[] { 1, 2 }, new int[] { 1, 3 }, new int[] { 2, 4 } });
    System.out.println("Roots of MHTs: " + result);

    result = MinimumHeightTrees.findTrees(4,
        new int[][] { new int[] { 0, 1 }, new int[] { 0, 2 }, new int[] { 2, 3 } });
    System.out.println("Roots of MHTs: " + result);

    result = MinimumHeightTrees.findTrees(4,
        new int[][] { new int[] { 0, 1 }, new int[] { 1, 2 }, new int[] { 1, 3 } });
    System.out.println("Roots of MHTs: " + result);
  }
}
```
**Time complexity:** `O(V + E)`

**Space complexity:** `O(V + E)`


---
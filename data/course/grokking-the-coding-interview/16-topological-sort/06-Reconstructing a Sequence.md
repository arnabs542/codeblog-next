---
title: Reconstructing a Sequence
type: topic
section: Topological Sort
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a sequence `originalSeq` and an array of sequences, write a method to find if `originalSeq` can be uniquely reconstructed from the array of sequences.

Unique reconstruction means that we need to find if `originalSeq` is the only sequence such that all sequences in the array are subsequences of it.
```yml
Input: originalSeq: [1, 2, 3, 4], seqs: [[1, 2], [2, 3], [2, 4]]
Output: false
Explanation: The sequences [1, 2], [2, 3], and [2, 4] cannot uniquely reconstruct 
[1, 2, 3, 4]. There are two possible sequences we can construct from the given sequences:
1) [1, 2, 3, 4]
2) [1, 2, 4, 3]
```

#### Method: Topological Sort
Since each sequence in the given array defines the ordering of some numbers, we need to combine all these ordering rules to find two things:
1. Is it possible to construct the `originalSeq` from all these rules?
2. Are these ordering rules not sufficient enough to define the unique ordering of all the numbers in the `originalSeq`? In other words, can these rules result in more than one sequence?

Take Example-1:
```java
originalSeq: [1, 2, 3, 4], seqs:[[1, 2], [2, 3], [3, 4]]
```
The first sequence tells us that ‘1’ comes before ‘2’; the second sequence tells us that ‘2’ comes before ‘3’; the third sequence tells us that ‘3’ comes before ‘4’. Combining all these sequences will result in a unique sequence: [1, 2, 3, 4].

The above explanation tells us that we are actually asked to find the topological ordering of all the numbers and also to verify that there is only one topological ordering of the numbers possible from the given array of the sequences.

This makes the current problem similar to Tasks Scheduling Order with two differences:
1. We need to build the graph of the numbers by comparing each pair of numbers in the given array of sequences.
2. We must perform the topological sort for the graph to determine two things:
    - Can the topological ordering construct the `originalSeq`?
    - That there is only one topological ordering of the numbers possible. This can be confirmed if we do not have more than one source at any time while finding the topological ordering of numbers.

```java
import java.util.*;

class SequenceReconstruction {
  public static boolean canConstruct(int[] originalSeq, int[][] sequences) {
    List<Integer> sortedOrder = new ArrayList<>();
    if (originalSeq.length <= 0)
      return false;

    // a. Initialize the graph
    HashMap<Integer, Integer> inDegree = new HashMap<>(); // count of incoming edges for every vertex
    HashMap<Integer, List<Integer>> graph = new HashMap<>(); // adjacency list graph
    for (int[] seq : sequences) {
      for (int i = 0; i < seq.length; i++) {
        inDegree.putIfAbsent(seq[i], 0);
        graph.putIfAbsent(seq[i], new ArrayList<Integer>());
      }
    }

    // b. Build the graph
    for (int[] seq : sequences) {
      for (int i = 1; i < seq.length; i++) {
        int parent = seq[i - 1], child = seq[i];
        graph.get(parent).add(child);
        inDegree.put(child, inDegree.get(child) + 1);
      }
    }

    // if we don't have ordering rules for all the numbers we'll not able to uniquely construct the sequence
    if (inDegree.size() != originalSeq.length)
      return false;

    // c. Find all sources i.e., all vertices with 0 in-degrees
    Queue<Integer> sources = new LinkedList<>();
    for (Map.Entry<Integer, Integer> entry : inDegree.entrySet()) {
      if (entry.getValue() == 0)
        sources.add(entry.getKey());
    }

    // d. For each source, add it to the sortedOrder and subtract one from all of its children's in-degrees
    // if a child's in-degree becomes zero, add it to the sources queue
    while (!sources.isEmpty()) {
      if (sources.size() > 1)
        return false; // more than one sources mean, there is more than one way to reconstruct the sequence
      if (originalSeq[sortedOrder.size()] != sources.peek())
        return false; // the next source (or number) is different from the original sequence
      int vertex = sources.poll();
      sortedOrder.add(vertex);
      List<Integer> children = graph.get(vertex); // get the node's children to decrement their in-degrees
      for (int child : children) {
        inDegree.put(child, inDegree.get(child) - 1);
        if (inDegree.get(child) == 0)
          sources.add(child);
      }
    }

    // if sortedOrder's size is not equal to original sequence's size, there is no unique way to construct  
    return sortedOrder.size() == originalSeq.length;
  }

  public static void main(String[] args) {
    boolean result = SequenceReconstruction.canConstruct(new int[] { 1, 2, 3, 4 },
        new int[][] { new int[] { 1, 2 }, new int[] { 2, 3 }, new int[] { 3, 4 } });
    System.out.println("Can we uniquely construct the sequence: " + result);

    result = SequenceReconstruction.canConstruct(new int[] { 1, 2, 3, 4 },
        new int[][] { new int[] { 1, 2 }, new int[] { 2, 3 }, new int[] { 2, 4 } });
    System.out.println("Can we uniquely construct the sequence: " + result);

    result = SequenceReconstruction.canConstruct(new int[] { 3, 1, 4, 2, 5 },
        new int[][] { new int[] { 3, 1, 5 }, new int[] { 1, 4, 2, 5 } });
    System.out.println("Can we uniquely construct the sequence: " + result);
  }
}
```
**Time complexity:** `O(V + N)`, ‘N’ is the count of numbers in all sequences.

**Space complexity:** `O(V + N)`


---
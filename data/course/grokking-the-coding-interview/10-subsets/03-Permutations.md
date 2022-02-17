---
title: Permutations
type: topic
section: Subsets
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a set of distinct numbers, find all of its permutations.
```yml
Input: [1,3,5]
Output: [1,3,5], [1,5,3], [3,1,5], [3,5,1], [5,1,3], [5,3,1]
```

#### Method: Subsets
This problem follows the Subsets pattern and we can follow a similar **Breadth First Search (BFS)** approach. However, unlike Subsets, every permutation must contain all the numbers.

Let’s take the example mentioned above to generate all the permutations. Following a BFS approach, we will consider one number at a time:
1. If the given set is empty then we have only an empty permutation set: []
1. Let’s add the first element (1), the permutations will be: [1]
1. Let’s add the second element (3), the permutations will be: [3,1], [1,3]
1. Let’s add the third element (5), the permutations will be: [5,3,1], [3,5,1], [3,1,5], [5,1,3], [1,5,3], [1,3,5]

```java
import java.util.*;

class Permutations {

  public static List<List<Integer>> findPermutations(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    Queue<List<Integer>> permutations = new LinkedList<>();
    permutations.add(new ArrayList<>());
    for (int currentNumber : nums) {
      // we will take all existing permutations and add the current number to create new permutations
      int n = permutations.size();
      for (int i = 0; i < n; i++) {
        List<Integer> oldPermutation = permutations.poll();
        // create a new permutation by adding the current number at every position
        for (int j = 0; j <= oldPermutation.size(); j++) {
          List<Integer> newPermutation = new ArrayList<Integer>(oldPermutation);
          newPermutation.add(j, currentNumber);
          if (newPermutation.size() == nums.length)
            result.add(newPermutation);
          else
            permutations.add(newPermutation);
        }
      }
    }
    return result;
  }

  public static void main(String[] args) {
    List<List<Integer>> result = Permutations.findPermutations(new int[] { 1, 3, 5 });
    System.out.print("Here are all the permutations: " + result);
  }
}
```
**Time complexity:** `O(N*N!)`

#### Method: Recursrion
```java
import java.util.*;

class PermutationsRecursive {

  public static List<List<Integer>> generatePermutations(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    generatePermutationsRecursive(nums, 0, new ArrayList<Integer>(), result);
    return result;
  }

  private static void generatePermutationsRecursive(int[] nums, int index, List<Integer> currentPermutation,
      List<List<Integer>> result) {
    if (index == nums.length) {
      result.add(currentPermutation);
    } else {
      // create a new permutation by adding the current number at every position
      for (int i = 0; i <= currentPermutation.size(); i++) {
        List<Integer> newPermutation = new ArrayList<Integer>(currentPermutation);
        newPermutation.add(i, nums[index]);
        generatePermutationsRecursive(nums, index + 1, newPermutation, result);
      }
    }
  }

  public static void main(String[] args) {
    List<List<Integer>> result = PermutationsRecursive.generatePermutations(new int[] { 1, 3, 5 });
    System.out.print("Here are all the permutations: " + result);
  }
}
```



---
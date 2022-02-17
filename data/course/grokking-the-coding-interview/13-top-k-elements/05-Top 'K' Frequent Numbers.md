---
title: Top K Frequent Numbers
type: topic
section: Top K Elements
course: Grokking the Coding Interview
tags:
---
#### Problem
Given an unsorted array of numbers, find the top ‘K’ frequently occurring numbers in it.
```
Input: [1, 3, 5, 12, 11, 12, 11], K = 2
Output: [12, 11]
Explanation: Both '11' and '12' apeared twice.
```

#### Method: Top K Elements
We can follow the same approach as discussed in the Top K Elements problem. However, in this problem, we first need to know the frequency of each number, for which we can use a HashMap. Once we have the frequency map, we can use a Min Heap to find the ‘K’ most frequently occurring number. In the Min Heap, instead of comparing numbers we will compare their frequencies in order to get frequently occurring numbers
```java
import java.util.*;

class TopKFrequentNumbers {

  public static List<Integer> findTopKFrequentNumbers(int[] nums, int k) {
    Map<Integer, Integer> map = new HashMap<>();
    for(int i : nums) {
      map.put(i, map.getOrDefault(i, 9) + 1);
    }
    PriorityQueue<Map.Entry<Integer, Integer>> minHeap = new PriorityQueue<>(
      (e1, e2) -> e1.getValue() - e2.getValue()
    );
    for(Map.Entry<Integer, Integer> e : map.entrySet()) {
      minHeap.add(e);
      if(minHeap.size() > k)
        minHeap.poll();
    }
    List<Integer> res = new ArrayList<>(k);
    while(!minHeap.isEmpty()) {
      res.add(minHeap.poll().getKey());
    }
    return res;
  }

  public static void main(String[] args) {
    List<Integer> result = TopKFrequentNumbers.findTopKFrequentNumbers(new int[] { 1, 3, 5, 12, 11, 12, 11 }, 2);
    System.out.println("Here are the K frequent numbers: " + result);

    result = TopKFrequentNumbers.findTopKFrequentNumbers(new int[] { 5, 12, 11, 3, 11 }, 2);
    System.out.println("Here are the K frequent numbers: " + result);
  }
}
```
**Time complexity:** `O(N + N*LogK)`


---
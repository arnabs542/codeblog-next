---
title: Top K Numbers
type: topic
section: Top K Elements
course: Grokking the Coding Interview
tags:
---
#### Problem
Given an unsorted array of numbers, find the ‘K’ largest numbers in it.
```
Input: [3, 1, 5, 12, 2, 11], K = 3
Output: [5, 12, 11]
```

#### Method: Top K Elements
The best data structure that comes to mind to keep track of top ‘K’ elements is Heap.
If we iterate through the array one element at a time and keep ‘K’ largest numbers in a heap such that each time we find a larger number than the smallest number in the heap, we do two things:
1. Take out the smallest number from the heap, and
2. Insert the larger number into the heap.

```java
import java.util.*;
class KLargestNumbers {
  public static List<Integer> findKLargestNumbers(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>((n1, n2) -> n1 - n2);
    for(int i=0; i<k; i++) {
      minHeap.add(nums[i]);
    }
    for(int i=k; i<nums.length; i++) {
      if(nums[i] > minHeap.peek()) {
        minHeap.poll();
        minHeap.add(nums[i]);
      }
    }
    return new ArrayList<>(minHeap);
  }

  public static void main(String[] args) {
    List<Integer> result = KLargestNumbers.findKLargestNumbers(new int[] { 3, 1, 5, 12, 2, 11 }, 3);
    System.out.println("Here are the top K numbers: " + result);

    result = KLargestNumbers.findKLargestNumbers(new int[] { 5, 12, 11, -1, 12 }, 3);
    System.out.println("Here are the top K numbers: " + result);
  }
}
```
**Time complexity:** `O(NLogK)`


---
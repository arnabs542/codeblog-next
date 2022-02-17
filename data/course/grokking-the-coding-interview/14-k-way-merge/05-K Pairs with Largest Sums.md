---
title: K Pairs with Largest Sums
type: topic
section: K-way merge
course: Grokking the Coding Interview
tags:
---
#### Problem
Given two sorted arrays in descending order, find ‘K’ pairs with the largest sum where each pair consists of numbers from both the arrays.

```
Input: L1=[9, 8, 2], L2=[6, 3, 1], K=3
Output: [9, 3], [9, 6], [8, 6] 
Explanation: These 3 pairs have the largest sum. No other pair has a sum larger than any of these.
```

#### Method: K-way merge
We can go through all the numbers of the two input arrays to create pairs and initially insert them all in the heap until we have ‘K’ pairs in Min Heap. After that, if a pair is bigger than the top (smallest) pair in the heap, we can remove the smallest pair and insert this pair in the heap.

We can optimize our algorithms in two ways:
1. Instead of iterating over all the numbers of both arrays, we can iterate only the first ‘K’ numbers from both arrays. Since the arrays are sorted in descending order, the pairs with the maximum sum will be constituted by the first ‘K’ numbers from both the arrays.
2. As soon as we encounter a pair with a sum that is smaller than the smallest (top) element of the heap, we don’t need to process the next elements of the array. Since the arrays are sorted in descending order, we won’t be able to find a pair with a higher sum moving forward.

```java
import java.util.*;

class LargestPairs {

  public static List<int[]> findKLargestPairs(int[] nums1, int[] nums2, int k) {
    PriorityQueue<int[]> minHeap = new PriorityQueue<>(
      (a1, a2) -> (a1[0] + a1[1]) - (a2[0] + a2[1])
    );
    for(int i=0; i<nums1.length; i++) {
      for(int j=0; j<nums2.length; j++) {
        if(minHeap.size() < k)
          minHeap.add(new int[] {nums1[i], nums2[j]});
        else {
          // if the sum of the two numbers from the two arrays is smaller than the smallest (top) element of
          // the heap, we can 'break' here. Since the arrays are sorted in the descending order, we'll not be
          // able to find a pair with a higher sum moving forward.
          if (nums1[i] + nums2[j] > minHeap.peek()[0] + minHeap.peek()[1]) {
            minHeap.poll();
            minHeap.add(new int[] {nums1[i], nums2[j]});
          } else
            break;
        }
      }
    }
    return new ArrayList<>(minHeap);
  }

  public static void main(String[] args) {
    int[] l1 = new int[] { 9, 8, 2 };
    int[] l2 = new int[] { 6, 3, 1 };
    List<int[]> result = LargestPairs.findKLargestPairs(l1, l2, 3);
    System.out.print("Pairs with largest sum are: ");
    for (int[] pair : result)
      System.out.print("[" + pair[0] + ", " + pair[1] + "] ");
  }
}
```
**Time complexity:** `O(N*M*LogK)`


---
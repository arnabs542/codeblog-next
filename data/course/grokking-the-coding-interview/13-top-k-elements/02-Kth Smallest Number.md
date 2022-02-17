---
title: Kth Smallest Number
type: topic
section: Top K Elements
course: Grokking the Coding Interview
tags:
---
#### Problem
Given an unsorted array of numbers, find Kth smallest number in it.

Please note that it is the Kth smallest number in the sorted order, not the Kth distinct element.
```
Input: [1, 5, 12, 2, 11, 5], K = 3
Output: 5
Explanation: The 3rd smallest number is '5', as the first two smaller numbers are [1, 2].
```

#### Method: Top K Elements
This problem follows the Top ‘K’ Numbers pattern but has two differences:
- Here we need to find the Kth `smallest` number, whereas in Top ‘K’ Numbers we were dealing with ‘K’ `largest` numbers.
- In this problem, we need to find only one number (Kth smallest) compared to finding all ‘K’ largest numbers.

```java
import java.util.*;

class KthSmallestNumber {

  public static int findKthSmallestNumber(int[] nums, int k) {
    PriorityQueue<Integer> maxHeap = new PriorityQueue<>((n1, n2) -> n2 - n1);
    for(int i=0; i<k; i++) {
      maxHeap.add(nums[i]);
    }
    for(int i=k; i<nums.length; i++) {
      if(nums[i] < maxHeap.peek()) {
        maxHeap.poll();
        maxHeap.add(nums[i]);
      }
    }
    return maxHeap.peek();
  }

  public static void main(String[] args) {
    int result = KthSmallestNumber.findKthSmallestNumber(new int[] { 1, 5, 12, 2, 11, 5 }, 3);
    System.out.println("Kth smallest number is: " + result);

    // since there are two 5s in the input array, our 3rd and 4th smallest numbers should be a '5'
    result = KthSmallestNumber.findKthSmallestNumber(new int[] { 1, 5, 12, 2, 11, 5 }, 4);
    System.out.println("Kth smallest number is: " + result);

    result = KthSmallestNumber.findKthSmallestNumber(new int[] { 5, 12, 11, -1, 12 }, 3);
    System.out.println("Kth smallest number is: " + result);
  }
}
```
**Time complexity:** `O(NLogK)`


---
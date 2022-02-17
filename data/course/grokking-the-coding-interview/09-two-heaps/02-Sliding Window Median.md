---
title: Sliding Window Median
type: topic
section: Two Heaps
course: Grokking the Coding Interview
tags:
---
#### Problem
Given an array of numbers and a number ‘k’, find the median of all the ‘k’ sized sub-arrays (or windows) of the array.

#### Method: Two Heaps
This problem follows the Two Heaps pattern and share similarities with Find the Median of a Number Stream. We can follow a similar approach of maintaining a max-heap and a min-heap for the list of numbers to find their median.

The only difference is that we need to keep track of a sliding window of ‘k’ numbers. This means, in each iteration, when we insert a new number in the heaps, we need to remove one number from the heaps which is going out of the sliding window. After the removal, we need to rebalance the heaps in the same way that we did while inserting.
```java
import java.util.*;

class SlidingWindowMedian {
  private PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
  private PriorityQueue<Integer> minHeap = new PriorityQueue<>();
  
  public double[] findSlidingWindowMedian(int[] nums, int k) {
    double[] result = new double[nums.length - k + 1];
    int n = nums.length;
    for(int i=0; i<n; i++) {
      if (maxHeap.size() == 0 || maxHeap.peek() >= nums[i]) {
        maxHeap.add(nums[i]);
      } else {
        minHeap.add(nums[i]);
      }
      rebalanceHeaps();
      // if we have at least 'k' elements in the sliding window
      if(i - k + 1 >= 0) {
        if (maxHeap.size() == minHeap.size()) { // k is even
          result[i - k + 1] = maxHeap.peek() / 2.0 + minHeap.peek() / 2.0;
        } else { // k is odd
          result[i - k + 1] = maxHeap.peek();
        }
        // remove the element going out of the sliding window
        int elementToBeRemoved = nums[i - k + 1];
        if (elementToBeRemoved <= maxHeap.peek()) {
          maxHeap.remove(elementToBeRemoved);
        } else {
          minHeap.remove(elementToBeRemoved);
        }
        rebalanceHeaps();
      }
    }
    return result;
  }
  private void rebalanceHeaps() {
    if (maxHeap.size() > minHeap.size() + 1)
      minHeap.add(maxHeap.poll());
    else if (maxHeap.size() < minHeap.size())
      maxHeap.add(minHeap.poll());
  }

  public static void main(String[] args) {
    SlidingWindowMedian slidingWindowMedian = new SlidingWindowMedian();
    double[] result = slidingWindowMedian.findSlidingWindowMedian(new int[] { 1, 2, -1, 3, 5 }, 2);
    System.out.print("Sliding window medians are: ");
    for (double num : result)
      System.out.print(num + " ");
    System.out.println();

    slidingWindowMedian = new SlidingWindowMedian();
    result = slidingWindowMedian.findSlidingWindowMedian(new int[] { 1, 2, -1, 3, 5 }, 3);
    System.out.print("Sliding window medians are: ");
    for (double num : result)
      System.out.print(num + " ");
  }
}
```
**Time complexity:** `O(N*K)`


---
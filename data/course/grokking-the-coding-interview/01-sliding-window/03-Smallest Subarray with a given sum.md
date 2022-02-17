---
title: 'Smallest Subarray with a given sum'
type: topic
section: Sliding Window
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given an array of positive numbers and a positive number ‘S’, find the length of the smallest contiguous subarray whose sum is greater than or equal to ‘S’. Return 0, if no such subarray exists.
```
Input: [2, 1, 5, 2, 3, 2], S=7 
Output: 2
Explanation: The smallest subarray with a sum great than or equal to '7' is [5, 2].
```

#### Method: Sliding Window
```java
class MinSizeSubArraySum {
  public static int findMinSubArray(int S, int[] arr) {
    int n = arr.length;
    int minLen = Integer.MAX_VALUE;
    int l = 0;
    int sum = 0;
    for(int i=0; i<n; i++) {
      sum += arr[i];
      while(sum >= S) {
        minLen = Math.min(minLen, (i-l+1));
        sum -= arr[l];
        l++;
      }
    }
    return minLen;
  }
  public static void main(String[] args) {
    int result = MinSizeSubArraySum.findMinSubArray(7, new int[] { 2, 1, 5, 2, 3, 2 });
    System.out.println("Smallest subarray length: " + result);
    result = MinSizeSubArraySum.findMinSubArray(7, new int[] { 2, 1, 5, 2, 8 });
    System.out.println("Smallest subarray length: " + result);
    result = MinSizeSubArraySum.findMinSubArray(8, new int[] { 3, 4, 1, 1, 6 });
    System.out.println("Smallest subarray length: " + result);
  }
}
```
**Time complexity:** `O(N)`


---
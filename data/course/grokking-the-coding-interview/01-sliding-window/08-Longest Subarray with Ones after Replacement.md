---
title: 'Longest Subarray with Ones after Replacement'
type: topic
section: Sliding Window
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given an array containing 0s and 1s, if you are allowed to **replace no more than ‘k’ 0s with 1s**, find the length of the **longest contiguous subarray having all 1s**.
```
Input: Array = [0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], k = 2
Output: 6
Explanation: Replace the '0' at index 5 and 8 to have the longest contiguous subarray of 1s having length 6.
```

#### Method: Sliding Window
```java
class ReplacingOnes {
  public static int findLength(int[] arr, int k) {
    int n = arr.length;
    int maxLen = 0;
    int onesCount = 0;
    int l = 0;
    for(int r=0; r<n; r++) {
      if(arr[r] == 1)
        onesCount++;
      if(r-l+1-onesCount > k) {
        if(arr[l] == 1)
          onesCount--;
        l++;
      }
      maxLen = Math.max(maxLen, r-l+1);
    }
    return maxLen;
  }
  public static void main(String[] args) {
    System.out.println(ReplacingOnes.findLength(new int[] { 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1 }, 2));
    System.out.println(ReplacingOnes.findLength(new int[] { 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1 }, 3));
  }
}
```
**Time complexity:** `O(N)`


---
---
title: 'Subarrays with Product Less than a Target'
type: topic
section: Two Pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given an array with positive numbers and a target number, find all of its contiguous subarrays whose product is less than the target number.

```
Input: [2, 5, 3, 10], target=30 
Output: [2], [5], [2, 5], [3], [5, 3], [10]
Explanation: There are six contiguous subarrays whose product is less than the target.
```

#### Method: Two Pointers
```java
import java.util.*;

class SubarrayProductLessThanK {

  public static List<List<Integer>> findSubarrays(int[] arr, int target) {
    List<List<Integer>> res = new ArrayList<>();
    int n = arr.length;
    int l = 0, prod = 1;
    for(int r=0; r<n; r++) {
      prod *= arr[r];
      while (prod >= target && l < n)
        prod /= arr[l++];
      // since the product of all numbers from left to right is less than the target therefore,
      // all subarrays from left to right will have a product less than the target too; to avoid
      // duplicates, we will start with a subarray containing only arr[right] and then extend it
      List<Integer> temp = new LinkedList<>();
      for(int i=r; i>=l; i--) {
        temp.add(0, arr[i]);
        res.add(new ArrayList<>(temp));
      }
    }
    return res;
  }
  public static void main(String[] args) {
    System.out.println(SubarrayProductLessThanK.findSubarrays(new int[] { 2, 5, 3, 10 }, 30));
    System.out.println(SubarrayProductLessThanK.findSubarrays(new int[] { 8, 2, 6, 5 }, 50));
  }
}
```
**Time complexity:** `O(N^3)` in worst case (need to confirm)


---
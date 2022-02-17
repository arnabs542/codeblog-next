---
title: 'Triplet Sum Close to Target'
type: topic
section: Two Pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given an array of unsorted numbers and a target number, find a **triplet in the array whose sum is as close to the target number as possible, return the sum of the triplet.** If there are more than one such triplet, return the sum of the triplet with the smallest sum.
```
Input: [-2, 0, 1, 2], target=2
Output: 1
Explanation: The triplet [-2, 1, 2] has the closest sum to the target.
```

#### Method: Two Pointers
```java
import java.util.*;

class TripletSumCloseToTarget {

  public static int searchTriplet(int[] arr, int target) {
    int n = arr.length;
    Arrays.sort(arr);
    int minDiff = Integer.MAX_VALUE;
    for(int i=0; i<n-1; i++) {
      int l = i+1, r = n-1;
      while(l < r) {
        int sum = arr[i] + arr[l] + arr[r];
        if(sum == target)
          return sum;
        int tempDiff = target - sum;
        if(Math.abs(tempDiff) < Math.abs(minDiff) 
          || (Math.abs(tempDiff) < Math.abs(minDiff) && tempDiff > minDiff))
          minDiff = tempDiff;
        if(sum < target)
          l++;
        else
          r--;
      }
    }
    return target - minDiff;
  }
  public static void main(String[] args) {
    System.out.println(TripletSumCloseToTarget.searchTriplet(new int[] { -2, 0, 1, 2 }, 2));
    System.out.println(TripletSumCloseToTarget.searchTriplet(new int[] { -3, -1, 1, 2 }, 1));
    System.out.println(TripletSumCloseToTarget.searchTriplet(new int[] { 1, 0, 1, 1 }, 100));
  }
}
```
**Time complexity:** `O(N)`


---
---
title: 'Pair with Target Sum'
type: topic
section: Two Pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given an array of sorted numbers and a target sum, find a **pair in the array whose sum is equal to the given target.**
```
Input: [1, 2, 3, 4, 6], target=6
Output: [1, 3]
Explanation: The numbers at index 1 and 3 add up to 6: 2+4=6
```

#### Method: Brute-force
Using 2 loops and check all pairs. O(n^2)

#### Method: Binary Search
Since the given array is sorted, a could be to iterate through the array, taking one number at a time and searching for the second number through Binary Search. The time complexity of this algorithm will be `O(N*logN)`. Can we do better than this?

#### Method: Two Pointers
```java
class PairWithTargetSum {

  public static int[] search(int[] arr, int targetSum) {
    int l = 0, r = arr.length - 1;
    int[] res = new int[2];
    while(l < r) {
      if(arr[l] + arr[r] > targetSum)
        r--;
      else if(arr[l] + arr[r] < targetSum)
        l++;
      else if (arr[l] + arr[r] == targetSum) {
        res[0] = l;
        res[1] = r;
        break;
      }
    }
    return res;
  }
  public static void main(String[] args) {
    int[] result = PairWithTargetSum.search(new int[] { 1, 2, 3, 4, 6 }, 6);
    System.out.println("Pair with target sum: [" + result[0] + ", " + result[1] + "]");
    result = PairWithTargetSum.search(new int[] { 2, 5, 9, 11 }, 11);
    System.out.println("Pair with target sum: [" + result[0] + ", " + result[1] + "]");
  }
}
```
**Time complexity:** `O(N)`


---
---
title: Minimum Window Sort
type: topic
section: Two Pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given an array, find the length of the smallest subarray in it which when sorted will sort the whole array.
```yml
Input: [1, 3, 2, 0, -1, 7, 10]
Output: 5
Explanation: We need to sort only the subarray [1, 3, 2, 0, -1] to make the whole array sorted
```

#### Method: Two Pointers
As we know, once an array is sorted (in ascending order), the smallest number is at the beginning and the largest number is at the end of the array. So if we start from the beginning of the array to find the first element which is out of sorting order i.e., which is smaller than its previous element, and similarly from the end of array to find the first element which is bigger than its previous element, will sorting the subarray between these two numbers result in the whole array being sorted?
1. From the beginning and end of the array, find the first elements that are out of the sorting order. The two elements will be our candidate subarray.
1. Find the maximum and minimum of this subarray.
1. Extend the subarray from beginning to include any number which is bigger than the minimum of the subarray.
1. Similarly, extend the subarray from the end to include any number which is smaller than the maximum of the subarray.

```java
class ShortestWindowSort {

  public static int sort(int[] arr) {
    int n = arr.length;
    int l = 0, r = n - 1;
    while(l < n - 1 && arr[l] <= arr[l+1])
      l++;
    if (l == n - 1) // already sorted
      return 0;
    while(r > 0 && arr[r] >= arr[r-1])
      r--;
    // find the maximum and minimum of the subarray
    int subarrayMax = Integer.MIN_VALUE, subarrayMin = Integer.MAX_VALUE;
    for (int k = l; k <= r; k++) {
      subarrayMax = Math.max(subarrayMax, arr[k]);
      subarrayMin = Math.min(subarrayMin, arr[k]);
    }
    // extend the subarray to include any number which is bigger than the minimum of the subarray 
    while (l > 0 && arr[l - 1] > subarrayMin)
      l--;
    // extend the subarray to include any number which is smaller than the maximum of the subarray
    while (r < arr.length - 1 && arr[r + 1] < subarrayMax)
      r++;
    return r - l + 1;
  }
  public static void main(String[] args) {
    System.out.println(ShortestWindowSort.sort(new int[] { 1, 2, 5, 3, 7, 10, 9, 12 }));
    System.out.println(ShortestWindowSort.sort(new int[] { 1, 3, 2, 0, -1, 7, 10 }));
    System.out.println(ShortestWindowSort.sort(new int[] { 1, 2, 3 }));
    System.out.println(ShortestWindowSort.sort(new int[] { 3, 2, 1 }));
  }
}
```
**Time complexity:** `O(N)`


---
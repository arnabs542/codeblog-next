---
title: 'Find subarray with given sum'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
Given an unsorted array of nonnegative integers, find a continuous subarray which adds to a given number.

---
##### Method 1: Using 2 loops (Simple Approach)
```
1. Traverse the array from start to end.
2. From every index start another loop from i to the end of array to get all subarray starting from i, keep a varibale sum to calculate the sum.
3. For every index in inner loop update sum = sum + array[j]
4. If the sum is equal to the given sum then print the subarray.
```
> Time Complexity: O(n*n), Space Complexity: O(1)
---
##### Method 2: Sliding Window
The idea is if all the elements of the array are positive. If a subarray has sum greater than the given sum then there is no possibility that adding elements to the current subarray the sum will be x (given sum).
```
1. Create three variables, l=0, r-0, sum = 0. Traverse the array from start to end.
2. Update the variable sum by adding current element, sum = sum + array[i]
3. If the sum is greater than the given sum, update the variable sum as sum = sum – array[l], and update l as , l++.
4. If the sum is equal to given sum, print the subarray and break the loop.
```
> Time Complexity: O(n), Space Complexity: O(1)
---

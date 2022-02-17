---
title: 'Find all pairs with given sum'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- js
- array
---
#### Problem
Write a program that, given an array arr[] of n numbers and another number x, finds all pairs in arr whose sum is exactly x.

---
##### Method 1: Using Sorting and 2 pointers
```
1. Sort the array
2. Assign 2 pointers 2 first and last index of the array, l and r
3. if x > arr[l] + arr[r], shift left pointer, l++
4. if x < arr[l] + arr[r], shift right pointer, r--
5. if x = arr[l] + arr[r], pring l and r
5. continue this till you find given sum or l becomes greater than r
```
> Time Complexity: O(n Logn) / Space Complexity: O(1)

---
##### Method 2: Using Hashing
```
1. Initialize an empty hashmap.
2. if sum - arr[i] is present in hashmap, then print arr[i] and (sum - arr[i])
3. else insert arr[i] in hashmap
```
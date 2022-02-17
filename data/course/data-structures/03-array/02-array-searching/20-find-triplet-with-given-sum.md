---
title: 'Find triplet with given sum'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
Given an array and a value, find if there is a triplet in array whose sum is equal to the given value. If there is such a triplet present in array, then print the triplet and return true. Else return false.

---
##### Method 1: Using 3 loops (Naive Approach)
```
1. generate all possible triplets and compare the sum of every triplet with the given value.
```
> Time Complexity: O(n * n * n), Space Complexity: O(1)
---
##### Method 2: Using Hashing and 2 loops
```
1. traverse the array from i = 0 to n-1
2. curr_sum = sum - arr[i]
3. loop through array from j = i+1 to n-1 and find a pair with sum equals to curr_sum using hash table.
```
> Time Complexity: O(n*n), Space Complexity: O(n)
---
##### Method 3: Using Sorting
```
1. Sort the input array.
2. Fix the first element as A[i] where i is from 0 to n–2. 
3. After fixing the first element, find the other two elements using 2 variables l and r.
```
> Time Complexity: O(n*n), Space Complexity: O(1)
---
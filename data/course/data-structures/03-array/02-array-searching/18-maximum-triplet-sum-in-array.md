---
title: 'Maximum triplet sum in array'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
Given an array, the task is to find maximum triplet sum in the array.

---
##### Method 1: Using 3 loops (Naive Approach)
```
1. simply run three loop and one by one add three element and compare with previous sum if the sum of three element is greater then store in previous sum .
```
> Time Complexity: O(n * n * n), Space Complexity: O(1)
---
##### Method 2: Using Sorting
```
1. we first need to sort the whole array and after that when we add last three element of the array then we find maximum sum of triplates.
```
> Time Complexity: O(n Logn), Space Complexity: O(1)
---
##### Method 3: Using 3 variables (one scan)
```
1. Scan the array and compute Maximum, second maximum and third maximum element present in the array and return the sum of its and it would be maximum sum .
```
> Time Complexity: O(n), Space Complexity: O(1)
---

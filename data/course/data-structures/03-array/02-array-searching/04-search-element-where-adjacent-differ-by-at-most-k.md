---
title: 'Search element where adjacent differ by at most K'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
difficulty: Medium
tags:
- js
- array
---
#### Problem
A **Step Array** is an array of integer where each element has a difference of at most k with its neighbor.
Given a key x, we need to find the index value of x if multiple element exist return the first occurrence of the key.

---
##### Method 1: Linear traverse the array
```
1. Linear traverse the array and compare every element with given given element x.
2. If matches, return index. Else,return -1.
```
> Time Complexity: O(n) / Space Complexity: O(1)
---
##### Method 2: Optimized Solution
```
1. Start comparing from first element, and find difference between current element arr[i] and x.
2. From the given property of array, we know that x must be at-least ‘diff/k’ away
3. So instead of searching one by one, we jump ‘diff/k’
```

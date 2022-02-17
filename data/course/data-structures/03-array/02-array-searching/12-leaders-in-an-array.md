---
title: 'Leaders in an array'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
Write a program to print all the LEADERS in the array. An element is leader if it is greater than all the elements to its right side.

---
##### Method 1: Using 2 Loops
```
1. Use two loops. The outer loop runs from 0 to size – 1 and one by one picks all elements from left to right.
2. The inner loop compares the picked element to all the elements to its right side.
3. If the picked element is greater than all the elements to its right side, then the picked element is the leader.
```
> Time Complexity: O(n*n), Space Complexity: O(1)
---
##### Method 2: Scan from right
```
1. Scan all the elements from right to left in an array and keep track of maximum till now.
2. When maximum changes its value, print it.
```
> Time Complexity: O(n), Space Complexity: O(1)
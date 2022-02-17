---
title: 'Find a Fixed Point (Value equal to index) in array'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
Given an array of n distinct integers sorted in ascending order, write a function that returns a Fixed Point in the array, if there is any Fixed Point present in array, else returns -1. 

_Fixed Point in an array is an index i such that arr[i] is equal to i. Note that integers in array can be negative._

---
##### Method 1: Linear Search
```
1. Linearly search for an index i such that arr[i] == i. Return the first such index found.
```
> Time Complexity: O(n), Space Complexity: O(1)
---
##### Method 1: Binary Search
```
1. First check whether middle element is Fixed Point or not. If it is, then return it; 
2. otherwise check whether index of middle element is greater than value at the index. 
3. If index is greater, then Fixed Point(s) lies on the right side of the middle point (obviously only if there is a Fixed Point). 
4. Else the Fixed Point(s) lies on left side.
```
> Time Complexity: O(Log n), Space Complexity: O(1)
---
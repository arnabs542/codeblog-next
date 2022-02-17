---
title: 'Find common elements in three sorted arrays'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- js
- array
---
#### Problem
Given three arrays sorted in non-decreasing order, print all common elements in these arrays.

---
##### Method 1: Simple Solution
```
1. Find intersection of arr1[] and arr2[] and store in temp[].
2. Find intersection of temp[] and arr3[]

```
> Time Complexity: O(n1 + n2 + n3) / Space Complexity: O(n)
---
##### Method 2: Single Loop
```
1. Iterate through 3 arrays and let x, y, z be current elements in 3 arrays.
2. if x = y = z, print the element.
3. else find min(x, y, z), and increment index of that array
```
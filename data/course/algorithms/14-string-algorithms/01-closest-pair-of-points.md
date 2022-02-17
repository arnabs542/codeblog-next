---
title: 'Closest Pair of Points'
type: 'topic'
section: 'String Algorithms'
course: 'Algorithms'
tags:
- java
---
##### Problem
We are given an array of n points in the plane, and the problem is to find out the closest pair of points in the array.

---
##### Method 1:
- We sort all points according to x coordinates.
- Divide all points in two halves.
- Recursively find the smallest distances in both subarrays.


> Time Complexity = O(nLogn)

---
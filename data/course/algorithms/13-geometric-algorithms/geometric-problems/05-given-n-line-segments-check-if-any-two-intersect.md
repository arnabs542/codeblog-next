---
title: 'Given n line segments check if any two intersect'
type: 'problem'
topic: 'Geometric Problems'
section: 'Geometric Algorithms'
course: 'Algorithms'
tags:
- java
---
##### Problem 
we are given n line segments and we need to find out if any two line segments intersect or not.

---
##### Method 1: Naive Algorithm
A naive solution to solve this problem is to check every pair of lines and check if the pair intersects or not. We can check two line segments in O(1) time. Therefore, this approach takes O(n2).

> Time complexity = O(n^2) 

##### Method 2: Sweep Line Algorithm
We can solve this problem in O(nLogn) time using Sweep Line Algorithm. The algorithm first sorts the end points along the x axis from left to right, then it passes a vertical line through all points from left to right and checks for intersections.

> Time complexity = O(nLogn)

---
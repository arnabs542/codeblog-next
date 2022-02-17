---
title: 'Convex Hull'
type: 'problem'
topic: 'Geometric Problems'
section: 'Geometric Algorithms'
course: 'Algorithms'
tags:
- java
---
##### Problem 
Given a set of points in the plane. the convex hull of the set is the smallest convex polygon that contains all the points of it.

---
##### Method 1: Jarvis’s Algorithm or Wrapping
The idea of Jarvis’s Algorithm is simple, we start from the leftmost point (or point with minimum x coordinate value) and we keep wrapping points in counterclockwise direction. The big question is, given a point p as current point, how to find the next point in output? The idea is to use orientation() here. Next point is selected as the point that beats all other points at counterclockwise orientation, i.e., next point is q if for any other point r, we have “orientation(p, q, r) = counterclockwise”. Following is the detailed algorithm.

> Time complexity = O(mn) 

##### Method 2: Graham Scan


> Time complexity = O(nLogn)

---
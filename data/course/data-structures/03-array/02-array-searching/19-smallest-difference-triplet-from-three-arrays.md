---
title: 'Smallest Difference Triplet from Three arrays'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
Three arrays of same size are given. Find a triplet such that maximum – minimum in that triplet is minimum of all the triplets. A triplet should be selected in a way such that it should have one number from each of the three given arrays.
If there are 2 or more smallest difference triplets, then the one with the smallest sum of its elements should be displayed.
---
##### Method 1: Using 3 loops (Naive Approach)
```
1. Consider each an every triplet and find the required smallest difference triplet out of them.
```
> Time Complexity: O(n * n * n), Space Complexity: O(1)
---
##### Method 2: Using Sorting
```
1. Sort the 3 arrays in non-decreasing order.
2. Start three pointers from left most elements of three arrays.
3. Now find min and max and calculate max-min from these three elements.
4. Now increment pointer of minimum element’s array.
5. Repeat steps 2, 3, 4, for the new set of pointers until any one pointer reaches to its end.
```
> Time Complexity: O(n Logn), Space Complexity: O(1)
---
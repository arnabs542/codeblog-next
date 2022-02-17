---
title: 'Equilibrium index of an array'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
Equilibrium index of an array is an index such that the sum of elements at lower indexes is equal to the sum of elements at higher indexes.

---
##### Method 2: Optimized Solution
```
1. get the total sum of the array
2. Iterate through the array and keep updating the left sum which is initialized as zero.
3. In the loop, we can get the right sum by subtracting the elements one by one.
```
> Time Complexity: O(n), Space Complexity: O(1)
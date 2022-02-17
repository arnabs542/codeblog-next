---
title: 'Maximum Subarray Sum Excluding Certain Elements'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
Given an array of A of n integers and an array B of m integers find the Maximum Contiguous Subarray Sum of array A such that any element of array B is not present in that subarray

---
##### Method 1: Kadane’s Algorithm
```
1. We need to modify the classical Kadane’s Algorithm.
2. Whenever we consider an element in the Kadane’s algorithm we either extend current subarray or we start a new subarray.

curr_max = max(a[i], curr_max+a[i]);
if (curr_max < 0)
   curr_max = 0

3. for any element, we will check in array B, if the element is present in B then we set curr_max = 0 which means that at that index all subarrays we considered upto that point would end and not be extended further as no further contiguous arrays can be formed.
```
> Time Complexity: O(n*m) / Space Complexity: O(1)
---
##### Method 2: Optimized Solution
```
1. The main idea behind this approach is exactly the same as that of method 1.
2. This approach just makes the searching of an element of array A, in array B, faster by using Binary Search
3. Note: We need to sort the Array B to apply Binary Search on it.
```
> Time Complexity: O(nlog(m) + mlog(m)) or O((n + m)log(m))
---
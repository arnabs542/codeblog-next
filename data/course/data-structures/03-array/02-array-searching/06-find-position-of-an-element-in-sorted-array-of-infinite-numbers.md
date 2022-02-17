---
title: 'Find position of an element in sorted array of infinite numbers'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
difficulty: Hard
tags:
- array
- amazon
---
#### Problem
Suppose you have a sorted array of infinite numbers, how would you search an element in the array?

---
##### Method 1: Using Sorting and 2 pointers
```
1. If the array is infinite, that means we don’t have proper bounds to apply binary search. So in order to find position of key, first we find bounds and then apply binary search algorithm.
2. Let low be pointing to 1st element and high pointing to 2nd element of array, Now compare key with high index element,
3. if key > arr[high], then move low index to high index and double the high index.
4. if key < arr[high], then apply binary search on high and low indices found.
```
> Time Complexity: O(Log p) / Space Complexity: O(1), where p is position of element.
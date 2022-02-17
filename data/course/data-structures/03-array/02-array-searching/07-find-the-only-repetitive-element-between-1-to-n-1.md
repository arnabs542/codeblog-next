---
title: 'Find the only repetitive element between 1 to n-1'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
We are given an array arr[] of size n. Numbers are from 1 to (n-1) in random order. The array has only one repetitive element. We need to find the repetitive element.

---
##### Method 1: Using 2 loops
```
1. The outer loop traverses through all elements and the inner loop check if the element picked by outer loop appears anywhere else.
```
> Time Complexity: O(n*n) / Space Complexity: O(1)
---
##### Method 2: Using Hashmap
```
1. Use a hash table to store elements visited. If a seen element appears again, we return it.
```
> Time Complexity: O(n) / Space Complexity: O(n)
---
##### Method 3: Using Sum Formula
```
1. We know sum of first n-1 natural numbers is (n – 1)*n/2
2. missing number = (n – 1)*n/2 - (sum of array elements)
```
> Time Complexity: O(n) / Space Complexity: O(1)
---
##### Method 4: Using XOR
```
1. The idea is based on the fact that x ^ x = 0 and x ^ y = y ^ x.
2. Compute XOR of elements from 1 to n-1
3. Compute XOR of array elements.
4. XOR of above two would be our result.
```
> Time Complexity: O(n) / Space Complexity: O(1)
---
##### Method 5: Using Indexing
```
1. Iterate through the array. For every index visit a[index],
2. If it is positive, change the sign of element at a[index] index
3. Else print the element.
```
> Time Complexity: O(n) / Space Complexity: O(1)

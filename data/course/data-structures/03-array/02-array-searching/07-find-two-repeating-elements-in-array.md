---
title: 'Find two repeating elements in array'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
You are given an array of n+2 elements. All elements of the array are in range 1 to n. And all elements occur once except two numbers which occur twice. Find the two repeating numbers.

---
##### Method 1: Using 2 loops
```
1. The outer loop traverses through all elements and the inner loop check if the element picked by outer loop appears anywhere else.
```
> Time Complexity: O(n*n) / Space Complexity: O(1)
---
##### Method 2: Use Count array
```
1. While traversing, keep track of count of all elements in the array using a temp array count[] of size n.
2. when you see an element whose count is already set, print it as duplicate.
```
> Time Complexity: O(n) / Space Complexity: O(n)
---
##### Method 3: Make two equations (Not efficient)
```
1. X + Y = S – n(n+1)/2
2. XY = P/n!
3. solve the equations
```
> Time Complexity: O(n) / Space Complexity: O(1)
---
##### Method 4: Using XOR
```
1. Let the repeating numbers be X and Y, if we xor all the elements in the array and all integers from 1 to n, then the result is X xor Y.
2. ... todo
```
> Time Complexity: O(n) / Space Complexity: O(1)
---
##### Method 5: Use array elements as index
```
1. Do following for every index i of A[].
2. check for sign of A[abs(A[i])]
  if positive
    make it negative by   A[abs(A[i])]=-A[abs(A[i])];
  if negative
    this   element (ith element of list) is a repetition
```
> Time Complexity: O(n) / Space Complexity: O(1)

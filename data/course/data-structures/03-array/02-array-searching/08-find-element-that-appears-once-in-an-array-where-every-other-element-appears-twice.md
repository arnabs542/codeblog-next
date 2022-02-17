---
title: 'Find element that appears once in an array where every other element appears twice'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
Given an array of integers. All numbers occur twice except one number which occurs once. Find the number in O(n) time & constant extra space.

---
##### Method 1: Using Hashmap
```
1. Traverse all elements and put them in a hash table. 
2. Element is used as key and count of occurrences is used as value in hash table.
3. Traverse the array again and print the element with count 1 in hash table.
```
> Time Complexity: O(n) / Space Complexity: O(n)
---
##### Method 2: Using Sum
```
1. Required no = 2*(sum_of_array_without_duplicates) - (sum_of_array)
2. We can use hashset to remove duplicates.
```
> Time Complexity: O(n) / Space Complexity: O(n)
---
##### Method 3: Using XOR (Best solution)
```
1. XOR of a number with itself is 0.
2. XOR of a number with 0 is number itself.
3. XOR of all array elements gives us the number with single occurrence.
```
> Time Complexity: O(n) / Space Complexity: O(1)

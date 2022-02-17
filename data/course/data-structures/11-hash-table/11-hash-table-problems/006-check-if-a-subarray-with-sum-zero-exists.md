---
title: 'Check if a subarray with sum zero exists'
type: 'problem'
topic: 'Hash Table Problems'
section: 'Hash Table'
course: 'Data Structures'
problemlist: true
tags:
- js
- array
---
#### Problem:
Check if a subarray with sum zero exists

#### Method 1:
We basically have to check for 3 conditions:
- If 0 exists in the array
- If the sum becomes zero in the iteration
- If the sum reverts back to a value which was already a key in the hash table. If a subarray has sum 0, then sum will repeat.


Any of these three conditions confirms the existence of a subarray that sums up to be zero.

> Time Complexity: O(n)


---


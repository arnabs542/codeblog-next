---
title: 'Find k Smallest Elements in Array'
type: 'problem'
topic: 'Heap Problems'
section: 'Heap'
course: 'Data Structures'
problemlist: true
tags:
- js
- array
---
#### Problem:
Implement the findKSmallest() function to take an array as input and find the “k” smallest elements in the array using Min Heap. 

#### Method 1:
We create a heap from the given input array. Then, we removeMin() from the heap kk times and save the result to the output array. We return output at the end.

> Time Compexity: O(klogn)




---

